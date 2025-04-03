<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostulanteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/prueba', function (Request $request) {
    $convocatorias = DB::table('convocatoria')->get();
    return response()->json($convocatorias);
});

Route::get('/colegios', function (Request $request) {
    return response()->json([
        'message' => 'Conexión exitosa desde el backend',
        'timestamp' => now()
    ]);
});

Route::post('/registrar-postulante', [PostulanteController::class, 'store']);

Route::post('/prueba', function () {
    return response()->json(['message' => 'Ruta de prueba funcionando']);
});