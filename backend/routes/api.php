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

use App\Http\Controllers\Api\BackupController;
use App\Http\Controllers\Api\LogController;

// -------------------------------------------------
// RUTAS PÚBLICAS (sin autenticación)
// -------------------------------------------------

Route::get('/vercursos', [CursoController::class, 'index']); //obtiene los cursos

Route::get('/verdepartamentos', [DepartamentoController::class, 'index']); //obtiene departamentos para la direccion d postulante
Route::get('/verprovincias/departamento/{nombre}', [ProvinciaController::class, 'getProvinciasPorNombreDepartamento']);//obtiene las provincias de la direccion d postulante

//Route::post('/colegio', [ColegioController::class, 'store']);     //guarda colegios
Route::get('/departamentos',[ColegioController::class,'getDepartamentos']); //rruta para obtener los departamentos
Route::get('/departamentos/{departamento}/provincias',[ColegioController::class,'getProvincias']); //rruta para obtener provincias
Route::get('/departamentos/{departamento}/provincias/{provincia}/colegios',[ColegioController::class,'getColegios']); //rruta para obtener colegios
Route::get('/areas', [AreaController::class, 'index']);
Route::get('/categorias', [CategoriaController::class, 'index']);

// Colegio
Route::post('/colegios', [ColegioController::class, 'store']);
//esta
Route::get('/getcolegio', [ColegioController::class, 'index']);     //obtiene todo los datos del colegio
Route::put('/colegio/{id}', [ColegioController::class, 'update']);

//Crear ordenPago
   // "montoTotal": ,
  //  "cancelado": ,
 //   "vigencia": ,
//    "recibido": ,
//    "idTutor":

//Crear Curso
Route::post('/cursos', [CursoController::class, 'store']);

//Crear Área
Route::post('/areas', [AreaController::class, 'store']);

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
//esta
//obtiene todas las convocatorias activas
Route::get('convocatorias/activas', [ConvocatoriaController::class, 'getConvocatoriasActivas']);

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

//envia correo de restablecimiento de contraseña
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);

//actualiza la contraseña 
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

// -------------------------------------------------
// RUTAS PRIVADAS
// -------------------------------------------------
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Registrar un postulante
    Route::post('/registrar-postulante', [PostulanteController::class, 'register']);
    Route::patch('/actualizar-postulante/{idPostulante}', [PostulanteController::class, 'updatePostulante']);

    Route::get('/mostrarpostulaciones/{id}', [PostulacionController::class, 'show']); //edita inscripcion

    Route::get('/postulantes', [PostulanteController::class, 'index']);

        // guarda los datos de un usuario
    Route::post('/guardausers', [UserController::class, 'store']);

    //actualiza los datos de un usuario mediante su id
    Route::put('/editausers/{id}', [UserController::class, 'update']);

    //elimina un usuario mediante su id
    Route::delete('/eliminausers/{id}', [UserController::class, 'destroy']);

    //eliminar convocatoria mediante id convocatoria
    Route::delete('/delconvocatorias/{idConvocatoria}', [ConvocatoriaController::class, 'destroy']);

        // muestra todos los usuarios
    Route::get('/todosusers', [UserController::class, 'index']);

    // muestra los datos de un usuario mediante su id
    Route::get('/especificousers/{id}', [UserController::class, 'show']);

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    //recuperar al tutor
    Route::get('/tutor', [AuthController::class, 'obtenerDatosTutor']);

    //.............BITACORAS................
    // Listar todas las bitácoras
    Route::get('/logs', [LogController::class, 'index']);

    // Ver detalle de una bitácora
    Route::get('/logs/{id}', [LogController::class, 'show']);

    // Filtrar por evento (created, updated, deleted, login, logout)
    Route::get('/logs/event/{event}', [LogController::class, 'byEvent'])
         ->where('event', '[A-Za-z_]+');

    // Filtrar por usuario
    Route::get('/logs/user/{userId}', [LogController::class, 'byUser'])
         ->whereNumber('userId');

    // Filtrar por rango de fechas, agregar "?from=2025-06-01&to=2025-06-15" a la ruta
    Route::get('/logs/date-range',    [LogController::class, 'byDateRange']);
    //.......................

    // Crear un nuevo backup
    Route::post('/backups', [BackupController::class, 'create']);

    // Listar backups existentes
    Route::get('/backups', [BackupController::class, 'index']);

    // Descargar un backup específico
    Route::get('/backups/{filename}/download', [BackupController::class, 'download']);

    // Restaurar base de datos desde backup
    Route::post('/backups/restore', [BackupController::class, 'restore']);

    // CRUD de Postulante (admin)
    Route::patch('/actualizar-postulante/{idPostulante}', [PostulanteController::class, 'updatePostulante']);
    Route::get('/postulantes', [PostulanteController::class, 'index']);

    // CRUD de Colegio completo (admin)
    Route::post('/colegios', [ColegioController::class, 'store']);
    Route::put('/colegio/{id}', [ColegioController::class, 'update']);
    Route::get('/muestracolegio/{id}', [ColegioController::class, 'muestraColegioconid']);

    // CRUD de Curso (admin)
    Route::post('/cursos', [CursoController::class, 'store']);

    // CRUD de Orden de Pago (admin)
    Route::post('/ordenpago', [OrdenPagoController::class, 'store']);
    Route::put('/ordenpago/{idOrdenPago}', [OrdenPagoController::class, 'update']);
    Route::get('/buscar-ordenes', [OrdenPagoController::class, 'buscar']);

    // CRUD de Convocatoria (admin)
    //Route::post('/convocatorias', [ConvocatoriaController::class, 'store']);
    Route::post('/solo-convocatoria', [ConvocatoriaController::class, 'storeConvocatoria']);
    Route::delete('/delconvocatorias/{idConvocatoria}', [ConvocatoriaController::class, 'destroy']);
    Route::put('/editconvocatorias/{id}', [ConvocatoriaController::class, 'updateConvocatoria']);
    Route::put('/editcatconvocatorias/{id}/areas-categorias', [ConvocatoriaController::class, 'updateAreasCategorias']);
    Route::post('/convocatoria/{id}/estructura', [ConvocatoriaEstructuraController::class, 'areasEstructura']);

    // CRUD de Usuario (admin)
    Route::post('/guardausers', [UserController::class, 'store']);
    Route::put('/editausers/{id}', [UserController::class, 'update']);
    Route::delete('/eliminausers/{id}', [UserController::class, 'destroy']);
    Route::get('/todosusers', [UserController::class, 'index']);
    Route::get('/especificousers/{id}', [UserController::class, 'show']);

    // Gestión de Roles y Permisos (Spatie)
    Route::get('/roles', function(){
        $roles = Role::with('permissions')->get(); // Carga los permisos de cada rol
        return response()->json($roles);
    });
    Route::post('/roles', function(Request $req){
        $data = $req->validate([
          'name'        => 'required|string|unique:roles,name',
          'permissions' => 'sometimes|array',
          'permissions.*' => 'string|exists:permissions,name'
        ]);
        $role = Role::create([ 'name' => $data['name'], 'guard_name' => 'sanctum' ]);
        if (!empty($data['permissions'])) { $role->syncPermissions($data['permissions']); }
        return response()->json($role->load('permissions'), 201);
    });
    Route::put('/roles/{role}', function(Role $role, Request $req){
        $data = $req->validate([
          'name'        => 'required|string|unique:roles,name,'.$role->id,
          'permissions' => 'sometimes|array',
          'permissions.*' => 'string|exists:permissions,name'
        ]);
        $role->name = $data['name'];
        $role->save();
        $role->syncPermissions($data['permissions'] ?? []);
        return response()->json($role->load('permissions'));    
    });
    Route::get('/roles/{role}', function(Role $role){
        return response()->json($role->load('permissions'));
    });
    Route::put('/roles/{id}/sync-permissions', function($id, Request $request) {
        $request->validate(['permissions' => 'required|array']);
        $rol = Role::findOrFail($id);
        $rol->syncPermissions($request->permissions); // ← reemplaza todos los permisos
        return response()->json(['message' => 'Permisos actualizados correctamente']);
    });

    // Listar permisos
    Route::get('/permissions', function(){
        return response()->json(Permission::all());
    });

    // Asignar permiso a rol
    Route::post('/roles/{role}/give-permission', function(Role $role, Request $req){
        $req->validate(['permission'=>'required|exists:permissions,name']);
        $role->givePermissionTo($req->permission);
        return response()->json(['message'=>"Permission {$req->permission} added to role {$role->name}"]);
    });

    // Reportes y Notificaciones avanzadas
    Route::get('/reporte-postulantes/{idCurso}', [ReportePostulantesController::class, 'obtenerPostulantesPorCurso']);
    Route::get('/reporte-postulantes', [ReportePostulantesController::class, 'obtenerPostulantes']);
    Route::post('/notify-tutors', [TutorNotificationController::class, 'notifyAllTutors']);
    
    // Gestión de Recibos
    Route::post('/recibos', [ReciboController::class, 'store']);
    Route::get('/recibos/{id}', [ReciboController::class, 'show']);
    Route::get('/recibos/orden/{idOrdenPago}', [ReciboController::class, 'getByOrdenPago']);
    Route::put('/recibos/{id}', [ReciboController::class, 'update']);

    // Prefijos adicionales
    Route::prefix('convocatoria')->group(function(){
        Route::post('role',      [ConvocatoriaRoleController::class,'store']);
        Route::get('{id}/roles', [ConvocatoriaRoleController::class,'index']);
        Route::get('roles/all',  [ConvocatoriaRoleController::class,'all']);

    });
    Route::get('/convocatorias-roles', [ConvocatoriaRoleController::class, 'all']);
    Route::get('/convocatoria/{convocatoria}/roles',[ConvocatoriaRoleController::class,'index']);


    Route::prefix('user')->group(function(){
        // .todos los roles y permisos de un usuario en todas las convocatorias
        Route::get('{user}/roles', [UserRoleController::class,'allForUser']);
        // Roles y permisos de un usuario dentro de UNA convocatoria
        Route::get('{user}/convocatoria/{conv}/roles', [UserRoleController::class,'forUserInConvocatoria']);
    });

    //eliminar rol dado el rol
    Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

});
