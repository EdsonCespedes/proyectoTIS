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
            'portada'          => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'habilitada'       => 'required|boolean',
            'fechaInicioOlimp' => 'required|date',
            'fechaFinOlimp'    => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('portada')) {
            $path = $request->file('portada')->store('portadas', 'public');
        } else {
            $path = null;
        }

        $convocatoria = Convocatoria::create([
            'fechaPublicacion' => $request->input('fechaPublicacion'),
            'fechaInicioInsc'  => $request->input('fechaInicioInsc'),
            'fechaFinInsc'     => $request->input('fechaFinInsc'),
            'portada'          => $path,
            'habilitada'       => $request->input('habilitada'),
            'fechaInicioOlimp' => $request->input('fechaInicioOlimp'),
            'fechaFinOlimp'    => $request->input('fechaFinOlimp'),
        ]);

        return response()->json([
            'message' => 'Convocatoria creada correctamente',
            // 'convocatoria' => $convocatoria
            'convocatorias' => $convocatoria
        ], 201);
    }

    public function index(){
        $convocatorias = Convocatoria::all();
        return response()->json($convocatorias);
    }
}
