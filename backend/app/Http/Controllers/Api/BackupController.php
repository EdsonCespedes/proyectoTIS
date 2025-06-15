<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Http\Controllers\Controller;

class BackupController extends Controller
{
    protected $disk;
    protected $backupPath;

    public function __construct()
    {
        $this->disk = config('backup.backup.destination.disks.0', 'local');
        $this->backupPath = config('backup.backup.name', 'laravel-backup');
    }

    /** Listar todos los archivos de backup */
    public function index()
    {
        try {
            // Obtener archivos de backup del disco configurado
            $files = Storage::disk($this->disk)->allFiles($this->backupPath);
            
            // Filtrar solo archivos .zip
            $backups = collect($files)
                ->filter(fn($file) => str_ends_with($file, '.zip'))
                ->map(function($file) {
                    return [
                        'filename' => basename($file),
                        'path' => $file,
                        'size' => Storage::disk($this->disk)->size($file),
                        'url' => route('api.backups.download', ['filename' => basename($file)]),
                        'last_modified' => Storage::disk($this->disk)->lastModified($file),
                        'formatted_size' => $this->formatBytes(Storage::disk($this->disk)->size($file)),
                        'formatted_date' => date('Y-m-d H:i:s', Storage::disk($this->disk)->lastModified($file)),
                    ];
                })
                ->sortByDesc('last_modified')
                ->values();

            return response()->json([
                'success' => true,
                'data' => $backups,
                'total' => $backups->count(),
            ]);

        } catch (\Exception $e) {
            Log::error('Error listing backups: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error al listar backups',
                'error' => app()->environment('local') ? $e->getMessage() : 'Error interno del servidor',
            ], 500);
        }
    }

    /** Crear un nuevo backup */
    public function store()
    {
        try {
            // /**Log::debug('Databases to backup: ', config('backup.backup.source.databases'));*/
            //dd(config('backup.backup.source.databases'));
            // Verificar conexión a la base de datos
            DB::connection()->getPdo();
            
            // Configurar variables de entorno temporalmente para el proceso
            $this->setBackupEnvironment();

            // Ejecutar backup usando Artisan con configuración específica
            $exitCode = Artisan::call('backup:run', [
                '--only-db' => true,
                '--disable-notifications' => true,
            ]);

            $output = Artisan::output();
            
            // Log del resultado
            Log::info('Backup command executed', [
                'exit_code' => $exitCode,
                'output' => $output
            ]);

            // Verificar si el backup fue exitoso
            if ($exitCode === 0 && (
                str_contains($output, 'Backup completed') || 
                str_contains($output, 'successfully') ||
                !str_contains($output, 'failed')
            )) {
                return response()->json([
                    'success' => true,
                    'message' => 'Backup creado exitosamente',
                    'details' => $this->extractBackupDetails($output),
                ]);
            }

            // Si Artisan falló, intentar método alternativo
            if ($this->shouldTryAlternativeMethod()) {
                return $this->createBackupAlternative();
            }

            return response()->json([
                'success' => false,
                'message' => 'Error al crear el backup',
                'output' => app()->environment('local') ? $output : 'Error en el proceso de backup',
            ], 500);

        } catch (\Exception $e) {
            Log::error('Backup creation failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al crear backup',
                'error' => app()->environment('local') ? $e->getMessage() : 'Error interno del servidor',
            ], 500);
        }
    }

    /** Configurar variables de entorno para el backup */
    private function setBackupEnvironment()
    {
        // Configurar timeout para procesos largos
        set_time_limit(300); // 5 minutos
        ini_set('memory_limit', '512M');

        // En algunos servidores, usar localhost en lugar de 127.0.0.1 resuelve problemas de socket
        if (config('database.connections.mysql.host') === '127.0.0.1') {
            config(['database.connections.mysql.host' => 'localhost']);
        }

        // Configurar opciones específicas para mysqldump si no están definidas
        if (!config('database.connections.mysql.dump')) {
            config([
                'database.connections.mysql.dump' => [
                    'dump_binary_path' => env('DB_DUMP_BINARY_PATH'),
                    'use_single_transaction' => true,
                    'timeout' => 60 * 5, // 5 minutos
                    'exclude_tables' => env('DB_BACKUP_EXCLUDE_TABLES', ''),
                    'add_extra_option' => '--force --single-transaction --routines --triggers --no-tablespaces',
                ]
            ]);
        }
    }

    /** Verificar si debemos intentar método alternativo */
    private function shouldTryAlternativeMethod()
    {
        return env('DB_BACKUP_ALTERNATIVE_METHOD', false) || 
               (PHP_OS_FAMILY === 'Windows' && env('DB_DUMP_BINARY_PATH'));
    }

    /** Método alternativo para crear backup */
    private function createBackupAlternative()
    {
        try {
            $dbConfig = config('database.connections.' . config('database.default'));
            $binaryPath = env('DB_DUMP_BINARY_PATH');
            
            if (!$binaryPath) {
                throw new \Exception('DB_DUMP_BINARY_PATH no está configurado para método alternativo');
            }

            // Crear directorio de backup
            $backupDir = storage_path('app/' . $this->backupPath);
            if (!file_exists($backupDir)) {
                mkdir($backupDir, 0755, true);
            }

            // Generar nombres de archivo
            $timestamp = date('Y-m-d_H-i-s');
            $appName = str_slug(config('app.name', 'laravel-backup'));
            $sqlFilename = "{$appName}_{$timestamp}.sql";
            $zipFilename = "{$appName}_{$timestamp}.zip";
            
            $sqlPath = $backupDir . '/' . $sqlFilename;
            $zipPath = $backupDir . '/' . $zipFilename;

            // Construir comando mysqldump
            $command = $this->buildMysqldumpCommand($binaryPath, $dbConfig, $sqlPath);
            
            // Ejecutar comando
            exec($command, $output, $exitCode);

            if ($exitCode !== 0 || !file_exists($sqlPath)) {
                throw new \Exception('Error ejecutando mysqldump: ' . implode("\n", $output));
            }

            // Crear archivo ZIP
            if (!$this->createZipFromSql($sqlPath, $zipPath, $sqlFilename)) {
                throw new \Exception('Error creando archivo ZIP');
            }

            // Limpiar archivo SQL temporal
            if (file_exists($sqlPath)) {
                unlink($sqlPath);
            }

            return response()->json([
                'success' => true,
                'message' => 'Backup creado exitosamente (método alternativo)',
                'filename' => $zipFilename,
            ]);

        } catch (\Exception $e) {
            Log::error('Alternative backup method failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Falló el método alternativo de backup',
                'error' => app()->environment('local') ? $e->getMessage() : 'Error en backup alternativo',
            ], 500);
        }
    }

    /** Construir comando mysqldump multiplataforma */
    private function buildMysqldumpCommand($binaryPath, $dbConfig, $sqlPath)
    {
        $mysqldump = PHP_OS_FAMILY === 'Windows' 
            ? '"' . rtrim($binaryPath, '\\') . '\\mysqldump.exe"'
            : rtrim($binaryPath, '/') . '/mysqldump';

        $host = $dbConfig['host'] ?? 'localhost';
        $port = $dbConfig['port'] ?? 3306;
        $username = $dbConfig['username'];
        $password = $dbConfig['password'];
        $database = $dbConfig['database'];

        // Opciones comunes de mysqldump
        $options = [
            '--single-transaction',
            '--routines',
            '--triggers',
            '--no-tablespaces',
            '--force'
        ];

        // Construir comando base
        $command = sprintf(
            '%s --host=%s --port=%s --user=%s %s %s %s',
            $mysqldump,
            escapeshellarg($host),
            escapeshellarg($port),
            escapeshellarg($username),
            $password ? '--password=' . escapeshellarg($password) : '',
            implode(' ', $options),
            escapeshellarg($database)
        );

        // Agregar redirección de salida
        if (PHP_OS_FAMILY === 'Windows') {
            $command .= ' > "' . $sqlPath . '" 2>&1';
        } else {
            $command .= ' > ' . escapeshellarg($sqlPath) . ' 2>&1';
        }

        return $command;
    }

    /** Crear archivo ZIP desde SQL */
    private function createZipFromSql($sqlPath, $zipPath, $sqlFilename)
    {
        $zip = new \ZipArchive();
        
        if ($zip->open($zipPath, \ZipArchive::CREATE) === TRUE) {
            $zip->addFile($sqlPath, $sqlFilename);
            
            // Agregar información adicional
            $manifest = [
                'created_at' => date('Y-m-d H:i:s'),
                'laravel_version' => app()->version(),
                'environment' => app()->environment(),
                'database' => config('database.connections.' . config('database.default')),
            ];
            
            // Remover información sensible del manifest
            unset($manifest['database']['password']);
            
            $zip->addFromString('backup-manifest.json', json_encode($manifest, JSON_PRETTY_PRINT));
            $zip->close();
            
            return true;
        }
        
        return false;
    }

    /** Extraer detalles del output del backup */
    private function extractBackupDetails($output)
    {
        $details = [];
        
        if (preg_match('/Backup size: (.+)/', $output, $matches)) {
            $details['size'] = $matches[1];
        }
        
        if (preg_match('/Backup stored at: (.+)/', $output, $matches)) {
            $details['path'] = $matches[1];
        }
        
        return $details;
    }

    /** Descargar un backup */
    public function download($filename)
    {
        try {
            // Buscar el archivo en el directorio de backups
            $files = Storage::disk($this->disk)->allFiles($this->backupPath);
            $targetFile = collect($files)->first(function($file) use ($filename) {
                return basename($file) === $filename;
            });

            if (!$targetFile) {
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo de backup no encontrado'
                ], 404);
            }

            return Storage::disk($this->disk)->download($targetFile, $filename);

        } catch (\Exception $e) {
            Log::error('Error downloading backup: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error al descargar el backup',
                'error' => app()->environment('local') ? $e->getMessage() : 'Error de descarga',
            ], 500);
        }
    }

    /** Subir un backup manualmente */
    public function upload(Request $request)
    {
        try {
            $request->validate([
                'file' => [
                    'required',
                    'file',
                    'mimes:zip',
                    'max:' . (env('BACKUP_MAX_UPLOAD_SIZE', 102400)) // Default 100MB en KB
                ],
            ]);

            $file = $request->file('file');
            $timestamp = date('Y-m-d_H-i-s');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $filename = "uploaded_{$originalName}_{$timestamp}.zip";

            // Guardar archivo
            $path = $file->storeAs($this->backupPath, $filename, $this->disk);

            Log::info('Backup uploaded successfully', [
                'filename' => $filename,
                'path' => $path,
                'size' => $file->getSize()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Backup subido correctamente',
                'data' => [
                    'filename' => $filename,
                    'path' => $path,
                    'size' => $this->formatBytes($file->getSize()),
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error uploading backup: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error al subir el backup',
                'error' => app()->environment('local') ? $e->getMessage() : 'Error de carga',
            ], 500);
        }
    }

    /** Restaurar desde un backup */
    public function restore($filename)
    {
        try {
            // Validar que no estemos en producción sin confirmación
            if (app()->environment('production') && !request()->has('confirm_production')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Restauración en producción requiere confirmación explícita',
                    'required_parameter' => 'confirm_production=true'
                ], 422);
            }

            // Buscar archivo de backup
            $files = Storage::disk($this->disk)->allFiles($this->backupPath);
            $targetFile = collect($files)->first(function($file) use ($filename) {
                return basename($file) === $filename;
            });

            if (!$targetFile) {
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo de backup no encontrado'
                ], 404);
            }

            $backupPath = Storage::disk($this->disk)->path($targetFile);

            // Crear directorio temporal único
            $tempDir = storage_path('app/temp_restore_' . uniqid());
            if (!file_exists($tempDir)) {
                mkdir($tempDir, 0755, true);
            }

            try {
                // Extraer ZIP
                $zip = new \ZipArchive;
                if ($zip->open($backupPath) !== true) {
                    throw new \Exception('No se puede abrir el archivo ZIP');
                }

                $zip->extractTo($tempDir);
                $zip->close();

                // Buscar archivo SQL
                $sqlFiles = glob($tempDir . '/*.sql');
                if (empty($sqlFiles)) {
                    throw new \Exception('No se encontró archivo SQL en el backup');
                }

                $sqlPath = $sqlFiles[0];

                // Ejecutar restauración
                $this->executeDatabaseRestore($sqlPath);

                // Limpiar directorio temporal
                $this->cleanupDirectory($tempDir);

                Log::info('Database restored successfully', ['backup' => $filename]);

                return response()->json([
                    'success' => true,
                    'message' => 'Base de datos restaurada exitosamente',
                    'restored_from' => $filename,
                    'restored_at' => now()->toDateTimeString(),
                ]);

            } catch (\Exception $e) {
                // Limpiar directorio temporal en caso de error
                if (file_exists($tempDir)) {
                    $this->cleanupDirectory($tempDir);
                }
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error('Database restore failed: ' . $e->getMessage(), [
                'backup' => $filename,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al restaurar la base de datos',
                'error' => app()->environment('local') ? $e->getMessage() : 'Error de restauración',
            ], 500);
        }
    }

    /** Ejecutar restauración de base de datos */
    private function executeDatabaseRestore($sqlPath)
    {
        $dbConfig = config('database.connections.' . config('database.default'));
        $binaryPath = env('DB_DUMP_BINARY_PATH');

        if ($binaryPath) {
            // Usar binario específico si está configurado
            $mysql = PHP_OS_FAMILY === 'Windows' 
                ? '"' . rtrim($binaryPath, '\\') . '\\mysql.exe"'
                : rtrim($binaryPath, '/') . '/mysql';
        } else {
            // Usar binario del sistema
            $mysql = 'mysql';
        }

        $command = sprintf(
            '%s --host=%s --port=%s --user=%s %s %s',
            $mysql,
            escapeshellarg($dbConfig['host'] ?? 'localhost'),
            escapeshellarg($dbConfig['port'] ?? 3306),
            escapeshellarg($dbConfig['username']),
            $dbConfig['password'] ? '--password=' . escapeshellarg($dbConfig['password']) : '',
            escapeshellarg($dbConfig['database'])
        );

        // Agregar redirección de entrada
        if (PHP_OS_FAMILY === 'Windows') {
            $command .= ' < "' . $sqlPath . '" 2>&1';
        } else {
            $command .= ' < ' . escapeshellarg($sqlPath) . ' 2>&1';
        }

        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            throw new \Exception('Error en la restauración: ' . implode("\n", $output));
        }
    }

    /** Eliminar un backup */
    public function destroy($filename)
    {
        try {
            // Buscar archivo
            $files = Storage::disk($this->disk)->allFiles($this->backupPath);
            $targetFile = collect($files)->first(function($file) use ($filename) {
                return basename($file) === $filename;
            });

            if (!$targetFile) {
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo de backup no encontrado'
                ], 404);
            }

            Storage::disk($this->disk)->delete($targetFile);

            Log::info('Backup deleted successfully', ['filename' => $filename]);

            return response()->json([
                'success' => true,
                'message' => 'Backup eliminado correctamente',
                'deleted_file' => $filename,
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting backup: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el backup',
                'error' => app()->environment('local') ? $e->getMessage() : 'Error de eliminación',
            ], 500);
        }
    }

    /** Limpiar directorio recursivamente */
    private function cleanupDirectory($dir)
    {
        if (file_exists($dir)) {
            \Illuminate\Support\Facades\File::deleteDirectory($dir);
        }
    }

    /** Formatear bytes a formato legible */
    private function formatBytes($size, $precision = 2)
    {
        if ($size <= 0) return '0 B';
        
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $i = 0;
        
        while ($size > 1024 && $i < count($units) - 1) {
            $size /= 1024;
            $i++;
        }
        
        return round($size, $precision) . ' ' . $units[$i];
    }
}