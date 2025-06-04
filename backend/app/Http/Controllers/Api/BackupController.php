<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Artisan;
use ZipArchive;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class BackupController extends Controller
{
    /**
     * Generar un nuevo backup (BD + archivos, o solo BD si prefieres).
     */
    public function create()
    {
        try {
            // Llama al comando oficial de Spatie
            // Para incluir DB + archivos: quita "--only-db"
            Artisan::call('backup:run', [
                '--only-db' => true
            ]);

            return response()->json([
                'message' => 'Backup generado exitosamente',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al generar backup',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Listar todos los archivos de backup existentes.
     */
    public function index()
    {
        $files = Storage::disk('local')->files('laravel-backups');

        // Filtrar solo .zip
        $zips = array_filter($files, function($file) {
            return str_ends_with($file, '.zip');
        });

        // Ordenar de más nuevo a más antiguo
        usort($zips, function($a, $b) {
            return Storage::disk('local')->lastModified($b)
                <=> Storage::disk('local')->lastModified($a);
        });

        return response()->json([
            'backups' => array_values($zips),
        ]);
    }

    /**
     * Descargar un backup específico.
     */
    public function download($filename)
    {
        $path = storage_path("app/laravel-backups/{$filename}");

        if (!file_exists($path)) {
            return response()->json(['message' => 'Backup no encontrado'], 404);
        }

        return response()->download($path, $filename);
    }

    /**
     * Restaurar base de datos desde un backup .zip (busca el .sql y lo importa).
     */
    public function restore(Request $request)
    {
        $request->validate([
            'filename' => 'required|string'
        ]);

        $filename = $request->filename;
        $backupPath = storage_path("app/laravel-backups/{$filename}");

        if (!file_exists($backupPath)) {
            return response()->json(['message' => 'Backup no encontrado'], 404);
        }

        try {
            // 1) Directorio temporal para extraer
            $tempExtractDir = storage_path("app/laravel-backups/temp_restore");

            // Eliminar si existía de runs anteriores
            if (file_exists($tempExtractDir)) {
                \File::deleteDirectory($tempExtractDir);
            }
            mkdir($tempExtractDir, 0755, true);

            // 2) Extraer zip
            $zip = new ZipArchive;
            if ($zip->open($backupPath) === true) {
                $zip->extractTo($tempExtractDir);
                $zip->close();
            } else {
                return response()->json(['message' => 'Error al extraer el backup'], 500);
            }

            // 3) Buscar un archivo .sql dentro de la extracción
            $allFiles = \File::allFiles($tempExtractDir);
            $dumpFile = null;
            foreach ($allFiles as $f) {
                if (str_ends_with($f->getFilename(), '.sql')) {
                    $dumpFile = $f->getRealPath();
                    break;
                }
            }
            if (!$dumpFile) {
                return response()->json(['message' => 'No se encontró volcado SQL en el backup'], 500);
            }

            // 4) Obtener credenciales MySQL de config/database.php
            $dbHost = config('database.connections.mysql.host');
            $dbPort = config('database.connections.mysql.port');
            $dbName = config('database.connections.mysql.database');
            $dbUser = config('database.connections.mysql.username');
            $dbPass = config('database.connections.mysql.password');

            // 5) Ejecutar importación con el comando `mysql`
            $command = [
                'mysql',
                "-u{$dbUser}",
                "-p{$dbPass}",
                "-h{$dbHost}",
                "-P{$dbPort}",
                $dbName,
                "-e",
                "source {$dumpFile}"
            ];

            $process = new Process($command);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            // 6) Borrar carpeta temporal
            \File::deleteDirectory($tempExtractDir);

            return response()->json(['message' => 'Restauración completada exitosamente.']);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Error durante la restauración',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
