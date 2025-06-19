<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class LogController extends Controller
{
    //Listar todas las bitacoras.
    public function index()
    {
        $logs = Activity::latest()->paginate(25);
        return response()->json($logs, 200);
    }

    public function show($id)
    {
        $log = Activity::findOrFail($id);
        return response()->json($log, 200);
    }

    //Filtrar por modelo (p.ej. Tutor, Postulante…)
    public function byModel($model)
    {
        $fullClass = 'App\\Models\\' . $model;
        $logs = Activity::where('subject_type', $fullClass)
                        ->latest()
                        ->get();

        return response()->json($logs, 200);
    }

    // Filtrar por evento
    public function byEvent($event)
    {
        $logs = Activity::where('description', $event)
                        ->latest()
                        ->get();

        return response()->json($logs, 200);
    }

    //Filtrar por usuario que causó la acción.
    public function byUser($userId)
    {
        $logs = Activity::where('causer_id', $userId)
                        ->latest()
                        ->get();

        return response()->json($logs, 200);
    }

    //Filtrar por rango de fechas: ?from=YYYY‑MM‑DD&to=YYYY‑MM‑DD
    public function byDateRange(Request $request)
    {
        $from = $request->query('from');
        $to   = $request->query('to');

        $logs = Activity::when($from, fn($q) => $q->whereDate('created_at', '>=', $from))
                        ->when($to,   fn($q) => $q->whereDate('created_at', '<=', $to))
                        ->latest()
                        ->get();

        return response()->json($logs, 200);
    }
}
