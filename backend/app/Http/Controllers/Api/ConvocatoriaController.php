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
            'titulo'            => 'nullable|string|max:45',
            'descripcion'       => 'nullable|string|max:75',
            'fechaPublicacion'  => 'required|date',
            'fechaInicioInsc'   => 'required|date',
            'fechaFinInsc'      => 'required|date',
//            'portada'           => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'portada' => 'nullable|string',
            'habilitada'        => 'required|boolean',
            'fechaInicioOlimp'  => 'required|date',
            'fechaFinOlimp'     => 'required|date',
            'maximoPostCategoria' => 'nullable|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $path = $request->hasFile('portada')
            ? $request->file('portada')->store('portadas', 'public')
            : null;

        $convocatoria = Convocatoria::create([
            'titulo'              => $request->input('titulo'),
            'descripcion'         => $request->input('descripcion'),
            'fechaPublicacion'    => $request->input('fechaPublicacion'),
            'fechaInicioInsc'     => $request->input('fechaInicioInsc'),
            'fechaFinInsc'        => $request->input('fechaFinInsc'),
            'portada'             => $path,
            'habilitada'          => $request->input('habilitada'),
            'fechaInicioOlimp'    => $request->input('fechaInicioOlimp'),
            'fechaFinOlimp'       => $request->input('fechaFinOlimp'),
            'maximoPostCategoria' => $request->input('maximoPostCategoria')
        ]);

        return response()->json([
            'message' => 'Convocatoria creada correctamente',
            'convocatorias' => $convocatoria
        ], 201);
    }

    public function index(){
        $convocatorias = Convocatoria::all();
        return response()->json($convocatorias);
    }
}
