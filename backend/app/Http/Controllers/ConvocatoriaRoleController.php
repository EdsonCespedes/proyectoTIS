<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Convocatoria;
use Spatie\Permission\Models\Role;

class ConvocatoriaRoleController extends Controller
{
    public function store(Request $req)
    {
        $data = $req->validate([
            'user_id'         => 'required|exists:users,id',
            'convocatoria_id' => 'required|exists:convocatoria,idConvocatoria',
            'role_name'       => 'required|exists:roles,name',
        ]);

        $user = User::find($data['user_id']);
        $conv = Convocatoria::find($data['convocatoria_id']);
        $role = Role::where('name',$data['role_name'])->first();

        $user->convocatoriasRoles()
             ->syncWithoutDetaching([
               $conv->idConvocatoria => ['role_id'=>$role->id]
             ]);

        return response()->json([
          'message'=>"Usuario {$user->id} asignado rol “{$role->name}” en convocatoria {$conv->idConvocatoria}"
        ],201);
    }

    public function index($convocatoriaId)
    {
        $conv = Convocatoria::with('usersRoles')->findOrFail($convocatoriaId);

        $out = $conv->usersRoles->map(fn($u)=>[
           'user_id'=>$u->id,
           'name'=>$u->name,
           'role'=> Role::find($u->pivot->role_id)->name,
        ]);

        return response()->json($out);
    }
}