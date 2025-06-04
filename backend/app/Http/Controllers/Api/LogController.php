<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Listar todas las entradas de bitácora (paginado).
     */
    // public function index(Request $request)
    // {
    //     $perPage = $request->input('per_page', 25);
    //     $logs = Activity::orderBy('created_at', 'desc')->paginate($perPage);
    //     return response()->json($logs);
    // }

    /**
     * Mostrar una entrada de bitácora en detalle.
     */
    // public function show($id)
    // {
    //     $log = Activity::findOrFail($id);
    //     return response()->json($log);
    // }

    public function show($id)
    {
        $log = Activity::with(['causer'])->findOrFail($id);
        return response()->json($log);
    }

    /**
     * Filtrar bitácoras por parámetros opcionales:
     *  - causer_id (quién hizo la acción)
     *  - subject_type + subject_id (sobre qué modelo/registro)
     *  - from/to (fechas)
     */
    public function filter(Request $request)
    {
        $query = Activity::query();

        if ($request->filled('causer_id')) {
            $query->where('causer_id', $request->causer_id);
        }
        if ($request->filled('subject_type')) {
            $query->where('subject_type', $request->subject_type);
        }
        if ($request->filled('subject_id')) {
            $query->where('subject_id', $request->subject_id);
        }
        if ($request->filled('from')) {
            $query->whereDate('created_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('created_at', '<=', $request->to);
        }

        $perPage = $request->input('per_page', 25);
        $logs = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($logs);
    }

    public function index(Request $request)
    {
        // Por ejemplo, paginamos de 25 en 25:
        $perPage = 25;
        $logs = Activity::with(['causer'])->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($logs);
    }
}
