<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Convocatoria;
use Spatie\Permission\Models\Role;

class RoleInConvocatoria
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $requiredRole)
    {
        $user = $request->user();
        $convId = $request->route('convocatoria') 
               ?? $request->route('convocatoria_id');

        if (!$convId || !$user) {
            return response()->json(['error'=>'Datos faltantes'], 403);
        }

        $pivot = $user->convocatoriaRoles()
                      ->wherePivot('convocatoria_id', $convId)
                      ->first();

        if (!$pivot || Role::find($pivot->pivot->role_id)->name !== $requiredRole) {
            return response()->json(['error'=>'Acceso denegado'], 403);
        }

        return $next($request);
    }
    
}
