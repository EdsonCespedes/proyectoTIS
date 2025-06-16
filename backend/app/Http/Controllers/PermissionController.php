<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return response()->json(Permission::all());
    }

    public function store(Request $req)
    {
        $req->validate(['name'=>'required|string|unique:permissions,name']);
        $p = Permission::create(['name'=>$req->name,'guard_name'=>'sanctum']);
        return response()->json($p,201);
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return response()->json(null,204);
    }
}