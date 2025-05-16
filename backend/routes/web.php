
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});



Route::get('/reset-password/{token}', function ($token) {
    return 'Este es tu token de restablecimiento: ' . $token;
})->name('password.reset');
  // Esto agrega todas las rutas de autenticación automáticamente



use Illuminate\Support\Facades\Mail;

Route::get('/test-email', function () {
    Mail::raw('Este es un correo de prueba desde Laravel', function ($message) {
        $message->to('jhuly.kely.6000@gmail.com')  // Cambia a tu correo o un correo de prueba
                ->subject('Correo de prueba');
    });

    return 'Correo enviado';
});

