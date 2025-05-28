<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json(Role::with('permissions')->get());
    }

    public function store(Request $req)
    {
        $data = $req->validate([
          'name'        => 'required|string|unique:roles,name',
          'permissions' => 'sometimes|array',
          'permissions.*' => 'string|exists:permissions,name'
        ]);

        $role = Role::create(['name'=>$data['name'],'guard_name'=>'sanctum']);
        if(!empty($data['permissions'])) {
          $role->syncPermissions($data['permissions']);
        }
        return response()->json($role->load('permissions'),201);
    }

    public function show(Role $role)
    {
        return response()->json($role->load('permissions'));
    }

    public function update(Role $role, Request $req)
    {
        $data = $req->validate([
          'name'        => 'required|string|unique:roles,name,'.$role->id,
          'permissions' => 'sometimes|array',
          'permissions.*' => 'string|exists:permissions,name'
        ]);

        $role->update(['name'=>$data['name']]);
        $role->syncPermissions($data['permissions'] ?? []);
        return response()->json($role->load('permissions'));
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(null,204);
    }
}