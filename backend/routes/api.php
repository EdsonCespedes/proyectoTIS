<?php

use App\Http\Controllers\ConvocatoriaController;
use App\Http\Controllers\PostulanteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/convocatorias', [ConvocatoriaController::class, 'index']);
Route::get('/postulantes', [PostulanteController::class, 'index']);

