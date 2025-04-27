<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use App\Models\Tutor;

class AuthController extends Controller
{
    public function registrarTutor(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|string|max:255|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'telefono' => 'required|string|max:20',
            'fechaNacimiento' => 'required|date',
        ]);

        DB::beginTransaction();

        try {
            // Crea usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => 'tutor',
                'password' => Hash::make($request->password),
            ]);

            // Crear tutor vinculado
            Tutor::create([
                'idUser' => $user->id,
                'nombreTutor' => $request->name,
                'apellidoTutor' => '', 
                'correoTutor' => $request->email,
                'telefonoTutor' => $request->telefono,
                'fechaNaciTutor' => $request->fechaNacimiento,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Registro exitoso',
                'user' => $user
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error al registrar usuario y tutor',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son incorrectas.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

    public function miInfo(Request $request)
    {
        return response()->json($request->user());
    }
}
