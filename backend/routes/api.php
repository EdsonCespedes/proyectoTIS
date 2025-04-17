<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostulanteController;
use App\Http\Controllers\ColegioController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\ConvocatoriaController;
use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\OrdenPagoController;



use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\PostulacionController;
use App\Http\Controllers\EstructuraConvocatoriaController;

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


Route::get('/postulantes', [PostulanteController::class, 'index']);




//obtiene todo los datos de la tabla area 

Route::get('/todasAreas', [AreaController::class, 'index']);

//obtiene los datos de un colegio por su id

Route::get('/muestracolegio/{id}', [ColegioController::class, 'muestraColegioconid']);


// obtener areas y categorias de los cursos habilitados mediante el nombre del curso

Route::get('/convocatoria/{idConvocatoria}/curso/{Curso}', [EstructuraConvocatoriaController::class, 'obtenerEstructuraPorConvocatoriaYCurso']);

//guarda Convocatoria junto con todos su datos asociados
Route::post('/convocatorias', [ConvocatoriaController::class, 'store']);

//obtiene todas las convocatorias
Route::get('/todasconvocatorias', [ConvocatoriaController::class, 'index']);


//buscador por nombre e id al tutor
Route::get('/buscar-ordenes', [OrdenPagoController::class, 'buscar']);

//guarda areas y todo lo demas d convocatoria

Route::post('/convocatoria/{id}/estructura', [ConvocatoriaEstructuraController::class, 'areasEstructura']);


//obtiene  convocatoria mediante id convocatoria
Route::get('/editaconvocatoria/{idConvocatoria}', [ConvocatoriaController::class, 'editarConvocatoria']); //edita convocatoria