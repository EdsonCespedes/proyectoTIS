<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Convocatoria;
use Spatie\Permission\Models\Role;
use Illuminate\Validation\ValidationException;

class ConvocatoriaRoleController extends Controller
{

    public function store(Request $req)
    {
        try {
            $data = $req->validate([
                'user_id'         => 'required|exists:users,id',
                'convocatoria_id' => 'required|exists:convocatoria,idConvocatoria',
                'role_name'       => 'required|exists:roles,name',
            ]);

            $user = User::findOrFail($data['user_id']);
            $conv = Convocatoria::findOrFail($data['convocatoria_id']);
            $role = Role::where('name', $data['role_name'])->firstOrFail();

            $user->convocatorias()
                 ->syncWithoutDetaching([
                     $conv->idConvocatoria => ['role_id' => $role->id]
                 ]);

            return response()->json([
                'message' => "Usuario {$user->id} asignado al rol “{$role->name}” en convocatoria {$conv->idConvocatoria}"
            ], 201);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Error inesperado.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function index($convocatoriaId)
    {
        $conv = Convocatoria::with('usersRoles')->findOrFail($convocatoriaId);

        $out = $conv->usersRoles->map(function($u) {
            $role = Role::find($u->pivot->role_id);
            return [
                'user' => [
                    'id'    => $u->id,
                    'name'  => $u->name,
                    'email' => $u->email,
                ],
                'role' => [
                    'id'   => $role->id,
                    'name' => $role->name,
                ],
                'permissions'  => $role->permissions->pluck('name'),
                'convocatoria' => $u->pivot->convocatoria_id,
            ];
        });

        return response()->json($out);
    }

    public function all()
    {
        $convocatorias = Convocatoria::with('usersRoles')->get();

        $out = $convocatorias->map(function ($conv) {
            return [
                'convocatoria_id'     => $conv->idConvocatoria,
                'convocatoria_nombre' => $conv->tituloConvocatoria,
                'usuarios' => $conv->usersRoles->map(function ($u) {
                    $role = Role::find($u->pivot->role_id);
                    return [
                        'user_id'      => $u->id,
                        'name'         => "{$u->name} {$u->apellido}",
                        'role'         => $role->name ?? null,
                        'permissions'  => $role ? $role->permissions->pluck('name') : [],
                    ];
                }),
            ];
        });

        return response()->json($out);
    }
}