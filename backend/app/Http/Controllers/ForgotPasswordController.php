<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Carbon\Carbon;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Notifications\CustomResetPasswordNotification;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        \Log::info('Request recibido para email: ' . $request->email);

        // Validar la entrada
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            \Log::info('Validación falló: ' . json_encode($validator->errors()));
            return response()->json(['message' => 'Correo inválido'], 400);
        }

        // Buscar al usuario
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            \Log::info('Usuario no encontrado para email: ' . $request->email);
            return response()->json(['message' => 'Correo no registrado'], 404);
        }

        // Crear token de restablecimiento
        $token = Password::createToken($user);
        \Log::info('Token generado: ' . $token);

        // Notificar al usuario
        $user->notify(new CustomResetPasswordNotification($token));

        \Log::info('Correo enviado a: ' . $user->email);

        return response()->json(['message' => 'Enlace de restablecimiento enviado'], 200);
    }



public function resetPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|confirmed|min:8',
        'token' => 'required'
    ]);

    // Obtener el registro en password_resets por email
    $passwordReset = DB::table('password_resets')
                        ->where('email', $request->email)
                        ->first();

    if (!$passwordReset) {
        return response()->json(['message' => 'Token o email inválido'], 400);
    }

    // Verificar si el token coincide
    if (!Hash::check($request->token, $passwordReset->token)) {
        return response()->json(['message' => 'Token inválido'], 400);
    }

    // Verificar si el token ha expirado (opcional, si estás usando timestamps)
    $expiresAt = Carbon::parse($passwordReset->created_at)->addMinutes(config('auth.passwords.users.expire'));
    if (Carbon::now()->greaterThan($expiresAt)) {
        return response()->json(['message' => 'El token ha expirado'], 400);
    }

    // Actualizar la contraseña del usuario
    $user = \App\Models\User::where('email', $request->email)->first();
    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    $user->password = Hash::make($request->password);
    $user->save();

    // Eliminar el registro de password_resets para evitar reusarlo
    DB::table('password_resets')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Contraseña restablecida con éxito']);
}
}

