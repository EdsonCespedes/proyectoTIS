<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use App\Models\Convocatoria;

class UserRoleController extends Controller
{
    
    public function allForUser($userId)
    {
        $user = User::with('convocatorias')->findOrFail($userId);

        $out = $user->convocatorias->map(function($conv) use($user){
            $pivot = $conv->pivot;
            $role  = Role::find($pivot->role_id);
            return [
                'convocatoria_id'   => $conv->idConvocatoria,
                'convocatoria_name' => $conv->tituloConvocatoria,
                'role'              => $role->name,
                'permissions'       => $role->permissions->pluck('name'),
            ];
        });

        return response()->json([
            'user'  => ['id'=>$user->id,'name'=>$user->name],
            'assignments' => $out,
        ]);
    }

    public function forUserInConvocatoria($userId, $convocatoriaId)
    {
        $user = User::findOrFail($userId);
        $conv = Convocatoria::findOrFail($convocatoriaId);

        $assign = $user->convocatorias()
                       ->where('convocatoria_id',$convocatoriaId)
                       ->firstOrFail();

        $role = Role::find($assign->pivot->role_id);

        return response()->json([
            'user' => ['id'=>$user->id,'name'=>$user->name],
            'convocatoria' => ['id'=>$conv->idConvocatoria,'name'=>$conv->tituloConvocatoria],
            'role' => $role->name,
            'permissions' => $role->permissions->pluck('name'),
        ]);
    }
}