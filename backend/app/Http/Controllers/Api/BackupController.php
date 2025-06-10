<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Http\Controllers\Controller;

class BackupController extends Controller
{
    protected $disk = 'backups'; // o el disco que definas en config/filesystems.php
    protected $backupPath = 'laravel-backups';

    /** Listar todos los archivos de backup */
    public function index()
    {
        $files = Storage::disk($this->disk)->files($this->backupPath);

        // Filtrar solo .zip
        $backups = collect($files)
            ->filter(fn($file) => str_ends_with($file, '.zip'))
            ->map(fn($file) => [
                'filename' => basename($file),
                'size' => Storage::disk($this->disk)->size($file),
                'url'  => url("api/backups/".basename($file)),
                'last_modified' => Storage::disk($this->disk)->lastModified($file),
            ]);

        return response()->json($backups);
    }

    /** Crear un nuevo backup */
    public function store()
    {
        // Ejecuta el comando de backup de spatie
        Artisan::call('backup:run', [
            '--only-db' => true,   // si solo quieres base de datos
            // elimina flag si quieres todo (archivos + DB)
        ]);

        return response()->json([
            'message' => 'Backup generado exitosamente',
            'output' => Artisan::output(),
        ]);
    }

    /** Descargar un backup */
    public function download($filename): StreamedResponse
    {
        $path = "{$this->backupPath}/{$filename}";

        if (! Storage::disk($this->disk)->exists($path)) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        return Storage::disk($this->disk)->download($path);
    }

    /** Subir un backup manualmente */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:zip',
        ]);

        $file = $request->file('file');
        $filename = time().'_'.$file->getClientOriginalName();
        $path = "{$this->backupPath}/{$filename}";

        Storage::disk($this->disk)->putFileAs($this->backupPath, $file, $filename);

        return response()->json([
            'message' => 'Backup subido correctamente',
            'filename' => $filename,
        ], 201);
    }

    /** Restaurar desde un backup */
    public function restore($filename)
    {
        $path = storage_path("app/{$this->backupPath}/{$filename}");

        if (! file_exists($path)) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Supongamos que quieres restaurar solo DB:
        // Primero, extrae el SQL del zip a un temp
        $zip = new \ZipArchive;
        if ($zip->open($path) === true) {
            $zip->extractTo(storage_path('app/temp_restore'));
            $zip->close();
        } else {
            return response()->json(['message' => 'Error al abrir el zip'], 500);
        }

        // Busca el .sql dentro
        $files = glob(storage_path('app/temp_restore').'/*.sql');
        if (empty($files)) {
            return response()->json(['message' => 'No se encontró .sql en el backup'], 500);
        }
        $sqlPath = $files[0];

        // Ejecuta importación SQL
        $database = config('database.connections.'.config('database.default'));
        $command = sprintf(
            'mysql --host=%s --port=%s --user=%s --password=%s %s < %s',
            $database['host'],
            $database['port'] ?? 3306,
            $database['username'],
            $database['password'],
            $database['database'],
            $sqlPath
        );
        exec($command, $output, $returnVar);

        // Limpia temp
        \Illuminate\Support\Facades\File::deleteDirectory(storage_path('app/temp_restore'));

        if ($returnVar !== 0) {
            return response()->json(['message' => 'Error al restaurar la base de datos'], 500);
        }

        return response()->json(['message' => 'Restauración completada']);
    }
}