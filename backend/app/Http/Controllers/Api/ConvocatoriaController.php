<?php

namespace App\Http\Controllers\Api;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class ConvocatoriaController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fechaPublicacion' => 'required|date',
            'fechaInicioInsc'  => 'required|date',
            'fechaFinInsc'     => 'required|date',
            'portada'          => 'required|string|max:45',
            'habilitada'       => 'required|boolean',
            'fechaInicioOlimp' => 'required|date',
            'fechaFinOlimp'    => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $convocatoria = Convocatoria::create($request->only([
            'fechaPublicacion',
            'fechaInicioInsc',
            'fechaFinInsc',
            'portada',
            'habilitada',
            'fechaInicioOlimp',
            'fechaFinOlimp'
        ]));

        return response()->json([
            'message' => 'Convocatoria creada correctamente',
            'convocatoria' => $convocatoria
        ], 201);
    }
}
