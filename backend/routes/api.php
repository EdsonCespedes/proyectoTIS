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

//Crear ordenPago
   // "montoTotal": ,
  //  "cancelado": ,
 //   "vigencia": ,
//    "recibido": ,
//    "idTutor":
Route::post('/ordenpago', [OrdenPagoController::class, 'store']);

//Crear Curso
Route::post('/cursos', [CursoController::class, 'store']);

//Crear Convocatoria
Route::post('/convocatorias', [ConvocatoriaController::class, 'store']);

//Crear Área
Route::post('/areas', [AreaController::class, 'store']);

//Crear Categoría
Route::post('/categorias', [CategoriaController::class, 'store']);

//crear solo en tabla convocatoria
Route::post('/solo-convocatoria', [ConvocatoriaController::class, 'storeConvocatoria']);

Route::get('/postulantes', [PostulanteController::class, 'index']);




//obtiene todo los datos de la tabla area 

Route::get('/todasAreas', [AreaController::class, 'index']);

//obtiene los datos de un colegio por su id

Route::get('/muestracolegio/{id}', [ColegioController::class, 'muestraColegioconid']);


// obtener areas y categorias de los cursos habilitados mediante el nombre del curso

Route::get('/convocatoria/{idConvocatoria}/curso/{Curso}', [EstructuraConvocatoriaController::class, 'obtenerEstructuraPorConvocatoriaYCurso']);


//obtiene todas las convocatorias
Route::get('/todasconvocatorias', [ConvocatoriaController::class, 'index']);

//obtiene los datos de una convocatoria activa mediante su id 
Route::get('/veridconvocatorias/{idConvocatoria}', [ConvocatoriaController::class, 'getConvocatoriaById']);


//obtiene todas las convocatorias activas 
Route::get('convocatorias/activas', [ConvocatoriaController::class, 'getConvocatoriasActivas']);


//buscador por nombre e id al tutor o nombre
Route::get('/buscar-ordenes', [OrdenPagoController::class, 'buscar']);

//guarda areas y todo lo demas d convocatoria

Route::post('/convocatoria/{id}/estructura', [ConvocatoriaEstructuraController::class, 'areasEstructura']);


//eliminar convocatoria mediante id convocatoria
Route::delete('/delconvocatorias/{idConvocatoria}', [ConvocatoriaController::class, 'destroy']);

//actualiza los datos de orden pago mediante id convocatoria
Route::put('/ordenpago/{idOrdenPago}', [OrdenPagoController::class, 'update']);

//edita solo convocatorias 
// Para editar solo la convocatoria
Route::put('/editconvocatorias/{id}', [ConvocatoriaController::class, 'updateConvocatoria']);

// Para editar las áreas y categorías de una convocatoria
Route::put('/editcatconvocatorias/{id}/areas-categorias', [ConvocatoriaController::class, 'updateAreasCategorias']);



