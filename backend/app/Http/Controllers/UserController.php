<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'apellido' => $validatedData['apellido'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'eliminado' => true, // Se crea como "no eliminado"
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Usuario creado exitosamente',
                'data' => $user,
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al crear el usuario: ' . $e->getMessage()], 500);
        }
    }





    public function update(Request $request, $id)
{
    $user = User::where('id', $id)->where('eliminado', true)->first();

    if (!$user) {
        return response()->json(['error' => 'Usuario no encontrado o está eliminado'], 404);
    }

    $user->name = $request->input('name', $user->name);
    $user->apellido = $request->input('apellido', $user->apellido);
    $user->email = $request->input('email', $user->email);

    if ($request->has('password')) {
        $user->password = bcrypt($request->input('password'));
    }

    $user->save();

    return response()->json(['message' => 'Usuario actualizado correctamente', 'user' => $user]);
}


public function destroy($id)
{
    $user = User::findOrFail($id);

    // Cambiar el atributo 'eliminado' a false
    $user->eliminado = false;
    $user->save();

    return response()->json(['message' => 'Usuario marcado como eliminado'], 200);
}




public function index()
{
    // Solo usuarios con eliminado = true (no eliminados)
    $users = User::where('eliminado', true)->get();
    return response()->json($users);
}


public function show($id)
{
    $user = User::where('id', $id)->where('eliminado', true)->first();

    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado o eliminado'], 404);
    }

    return response()->json($user);
}




}
