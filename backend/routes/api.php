<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostulanteController;
use App\Http\Controllers\Api\ColegioController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\ConvocatoriaController;
use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\CategoriaController;


// Ruta de usuario autenticado (por defecto de laravel) NO BORRAR
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Ruta de prueba
Route::get('/prueba', function (Request $request) {
    return response()->json([
        'message' => 'Ruta de prueba funcionando',
        'timestamp' => now()
    ]);
});


// Rutas para registrar/insertar entidades

//Registrar un postulante
Route::post('/registrar-postulante', [PostulanteController::class, 'register']);

//Crear Colegio
Route::post('/colegios', [ColegioController::class, 'store']);

//Crear Curso
Route::post('/cursos', [CursoController::class, 'store']);

//Crear Convocatoria
Route::post('/convocatorias', [ConvocatoriaController::class, 'store']);

//Crear Área
Route::post('/areas', [AreaController::class, 'store']);

//Crear Categoría
Route::post('/categorias', [CategoriaController::class, 'store']);