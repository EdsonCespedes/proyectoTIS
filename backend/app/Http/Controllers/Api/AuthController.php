<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use App\Models\Tutor;
use Spatie\Permission\Traits\HasRoles;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use HasRoles;
    public function registrarTutor(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            //
            'lastName' => 'required|string|max:255',
            //
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
                'apellido' => $request->lastName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'eliminado' => true,
            ]);

            $user->assignRole('Tutor');

            // Crear tutor vinculado
            Tutor::create([
                'idUser' => $user->id,
                'nombreTutor' => $request->name,
                'apellidoTutor' => $request->lastName, 
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

    //Recuperar al tutor una vez logeado
    public function obtenerDatosTutor()
    {
        $user = Auth::user();

        if ($user->rol !== 'tutor') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json([
            'tutor' => $user->tutor
        ]);
    }

}
