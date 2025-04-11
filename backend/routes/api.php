<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostulanteControllerJ;
use App\Http\Controllers\Api\ColegioController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\ConvocatoriaController;
use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\CategoriaController;

use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\PostulacionController;

Route::get('/mostrarpostulaciones/{id}', [PostulacionController::class, 'show']); //edita inscripcion



Route::get('/vercursos', [CursoController::class, 'index']); //obtiene los cursos


Route::get('/verdepartamentos', [DepartamentoController::class, 'index']); //obtiene departamentos para la direccion d postulante
Route::get('/verprovincias/departamento/{nombre}', [ProvinciaController::class, 'getProvinciasPorNombreDepartamento']);//obtiene las provincias de la direccion d postulante




Route::get('/getcolegio', [ColegioController::class, 'index']);     //obtiene todo los datos del colegio
//Route::post('/colegio', [ColegioController::class, 'store']);     //guarda colegios
Route::get('/departamentos',[ColegioController::class,'getDepartamentos']); //rruta para obtener los departamentos
Route::get('/departamentos/{departamento}/provincias',[ColegioController::class,'getProvincias']); //rruta para obtener provincias
Route::get('/departamentos/{departamento}/provincias/{provincia}/colegios',[ColegioController::class,'getColegios']); //rruta para obtener colegios
Route::get('/areas', [AreaController::class, 'index']);
Route::get('/categorias', [AreaController::class, 'index']);


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

Route::get('/convocatorias', [ConvocatoriaController::class, 'index']);
    // $convocatorias = DB::table('convocatoria')->get();
    //     return response()->json($convocatorias);
    // });
Route::get('/postulantes', [PostulanteController::class, 'index']);

