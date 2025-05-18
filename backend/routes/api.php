<?php

use App\Http\Controllers\ReciboController;
use App\Http\Controllers\TutorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostulanteController;
// use App\Http\Controllers\ColegioController;
use App\Http\Controllers\Api\ColegioController;
use App\Http\Controllers\Api\CursoController;
//use App\Http\Controllers\Api\ConvocatoriaController;
use App\Http\Controllers\ConvocatoriaController;
use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\OrdenPagoController;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\TutorNotificationController;



use App\Http\Controllers\UserController;


use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\ProvinciaController;
//use App\Http\Controllers\PostulacionController;
use App\Http\Controllers\Api\PostulacionController;
use App\Http\Controllers\EstructuraConvocatoriaController;
use App\Http\Controllers\ConvocatoriaEstructuraController;

use App\Http\Controllers\ConvocatoriaRoleController;

use App\Http\Controllers\ReportePostulantesController;


Route::get('/mostrarpostulaciones/{id}', [PostulacionController::class, 'show']); //edita inscripcion



Route::get('/vercursos', [CursoController::class, 'index']); //obtiene los cursos


Route::get('/verdepartamentos', [DepartamentoController::class, 'index']); //obtiene departamentos para la direccion d postulante
Route::get('/verprovincias/departamento/{nombre}', [ProvinciaController::class, 'getProvinciasPorNombreDepartamento']);//obtiene las provincias de la direccion d postulante



Route::get('/getcolegio', [ColegioController::class, 'index']); //obtiene todo los datos del colegio
//Route::post('/colegio', [ColegioController::class, 'store']);     //guarda colegios
Route::get('/departamentos',[ColegioController::class,'getDepartamentos']); //rruta para obtener los departamentos
Route::get('/departamentos/{departamento}/provincias',[ColegioController::class,'getProvincias']); //rruta para obtener provincias
Route::get('/departamentos/{departamento}/provincias/{provincia}/colegios',[ColegioController::class,'getColegios']); //rruta para obtener colegios
Route::get('/areas', [AreaController::class, 'index']);
Route::get('/categorias', [CategoriaController::class, 'index']);


// Ruta de usuario autenticado (por defecto de laravel) NO BORRAR
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// Rutas para registrar/insertar entidades

//Registrar un postulante
Route::post('/registrar-postulante', [PostulanteController::class, 'register']);
Route::patch('/actualizar-postulante/{idPostulante}', [PostulanteController::class, 'updatePostulante']);


// Colegio
Route::post('/colegios', [ColegioController::class, 'store']);
Route::get('/getcolegio', [ColegioController::class, 'index']);     //obtiene todo los datos del colegio
Route::put('/colegio/{id}', [ColegioController::class, 'update']);

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
//Route::post('/convocatorias', [ConvocatoriaController::class, 'store']);

//crear orden de pago
Route::post('/ordenpago', [OrdenPagoController::class, 'store']);

//Crear Área
Route::post('/areas', [AreaController::class, 'store']);

//crear solo en tabla convocatoria
Route::post('/solo-convocatoria', [ConvocatoriaController::class, 'storeConvocatoria']);

//Crear Categoría
//Route::post('/categorias', [CategoriaController::class, 'store']);

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

//guarda Convocatoria junto con todos su datos
//Route::post('/convocatorias', [ConvocatoriaController::class, 'store']);

//obtiene todas las convocatorias activas
Route::get('convocatorias/activas', [ConvocatoriaController::class, 'getConvocatoriasActivas']);

//eliminar convocatoria mediante id convocatoria
Route::delete('/delconvocatorias/{idConvocatoria}', [ConvocatoriaController::class, 'destroy']);

//actualiza los datos de orden pago mediante id convocatoria
Route::put('/ordenpago/{idOrdenPago}', [OrdenPagoController::class, 'update']);

//edita solo convocatorias
// Para editar solo la convocatoria
Route::put('/editconvocatorias/{id}', [ConvocatoriaController::class, 'updateConvocatoria']);

// Para editar las áreas y categorías de una convocatoria
Route::put('/editcatconvocatorias/{id}/areas-categorias', [ConvocatoriaController::class, 'updateAreasCategorias']);

// RUTAS PARA TUTOR
Route::get('/tutor/{id}', [TutorController::class, 'show']);
//Route::get('/tutor', [TutorController::class, 'index']);
Route::get('/tutores', [TutorController::class, 'index']);
////
Route::post('/tutor', [TutorController::class, 'store']);

// login y registro
//Route::post('/register', [AuthController::class, 'registrarTutor']);
Route::post('/register', [AuthController::class, 'registrarTutor']);

Route::post('/login', [AuthController::class, 'login']);

// guarda los datos de un usuario
Route::post('/guardausers', [UserController::class, 'store']);

//actualiza los datos de un usuario mediante su id
Route::put('/editausers/{id}', [UserController::class, 'update']);

//elimina un usuario mediante su id
Route::delete('/eliminausers/{id}', [UserController::class, 'destroy']);


// muestra todos los usuarios
Route::get('/todosusers', [UserController::class, 'index']);

// muestra los datos de un usuario mediante su id
Route::get('/especificousers/{id}', [UserController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    //recuperar al tutor
    Route::get('/tutor', [AuthController::class, 'obtenerDatosTutor']);
});

Route::post('/convocatoria/role',      [ConvocatoriaRoleController::class,'store']);
Route::get('/convocatoria/{id}/roles', [ConvocatoriaRoleController::class,'index']);
Route::get('/convocatorias-roles', [ConvocatoriaRoleController::class, 'all']);


//Route::get('/convocatorias/{convocatoria}/gestion-estudiantes',
//    [GestionController::class, 'index']
//)->middleware('auth', 'role.in.convocatoria:Tutor');

//Route::post('/convocatoria/role',      [ConvocatoriaRoleController::class,'store']);
Route::get('/convocatoria/{convocatoria}/roles',[ConvocatoriaRoleController::class,'index']);

// Listar roles
Route::get('/roles', function(){
    $roles = Role::with('permissions')->get(); // Carga los permisos de cada rol
    // return response()->json(Role::all());
    return response()->json($roles);
});

// Crear rol + permisos
Route::post('/roles', function(Request $req){
    // validamos nombre y un arreglo de permisos (opcionalmente vacío)
    $data = $req->validate([
      'name'        => 'required|string|unique:roles,name',
      'permissions' => 'sometimes|array',
      'permissions.*' => 'string|exists:permissions,name'
    ]);

     // 1) crear rol
    $role = Role::create([
      'name'       => $data['name'],
      'guard_name' => 'sanctum',
    ]);

    // 2) asignar permisos (si vienen)
    if (!empty($data['permissions'])) {
      $role->syncPermissions($data['permissions']);
    }

    return response()->json($role->load('permissions'), 201);
});

// Actualizar rol (nombre y permisos)
Route::put('/roles/{role}', function(Role $role, Request $req){
    $data = $req->validate([
      'name'        => 'required|string|unique:roles,name,'.$role->id,
      'permissions' => 'sometimes|array',
      'permissions.*' => 'string|exists:permissions,name'
    ]);

    $role->name = $data['name'];
    $role->save();

    // re-sincronizamos permisos
    $role->syncPermissions($data['permissions'] ?? []);
    
    return response()->json($role->load('permissions'));
});

// Mostrar un rol con sus permisos
Route::get('/roles/{role}', function(Role $role){
    return response()->json($role->load('permissions'));
});

//Actualiza el nombre del rol
Route::put('/roles/{id}', function($id, Request $request) {
    $request->validate(['name' => 'required|string|unique:roles,name,' . $id]);
    
    $rol = Role::findOrFail($id);
    $rol->name = $request->name;
    $rol->save();

    return response()->json(['message' => 'Rol actualizado correctamente', 'rol' => $rol]);
});

// Obtiene un rol en especifico con sus permisos
Route::get('/roles/{id}', function($id) {
    $rol = Role::with('permissions')->findOrFail($id);
    return response()->json($rol);
});

// Listar permisos
Route::get('/permissions', function(){
    return response()->json(Permission::all());
});

// Crear permiso
Route::post('/permissions', function(Request $req){
    $req->validate(['name'=>'required|string|unique:permissions,name']);
    $p = Permission::create(['name'=>$req->name,'guard_name'=>'sanctum']);
    return response()->json($p,201);
});

// Asignar permiso a rol
Route::post('/roles/{role}/give-permission', function(Role $role, Request $req){
    $req->validate(['permission'=>'required|exists:permissions,name']);
    $role->givePermissionTo($req->permission);
    return response()->json(['message'=>"Permission {$req->permission} added to role {$role->name}"]);
});

//Actualiza los permisos del rol
Route::put('/roles/{id}/sync-permissions', function($id, Request $request) {
    $request->validate(['permissions' => 'required|array']);
    
    $rol = Role::findOrFail($id);
    $rol->syncPermissions($request->permissions); // ← reemplaza todos los permisos

    return response()->json(['message' => 'Permisos actualizados correctamente']);
});

// RECIBOS
Route::post('/recibos', [ReciboController::class, 'store']);
Route::get('/recibos/{id}', [ReciboController::class, 'show']);





//envia correo de restablecimiento de contraseña
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);

//actualiza la contraseña 

Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

// envia notificaciones a tutores
Route::post('/notify-tutors', [TutorNotificationController::class, 'notifyAllTutors']);



Route::get('/recibos/orden/{idOrdenPago}', [ReciboController::class, 'getByOrdenPago']);

Route::get('/reporte-postulantes/{idCurso}', [ReportePostulantesController::class, 'obtenerPostulantesPorCurso']);