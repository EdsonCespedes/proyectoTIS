<?php

namespace App\Http\Controllers\Api;

use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class AreaController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tituloArea'      => 'required|string|max:45',
            'descArea'        => 'required|string|max:45',
            'habilitada'      => 'required|boolean',
            'idConvocatoria'  => 'required|integer|exists:convocatoria,idConvocatoria'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $area = Area::create($request->only([
            'tituloArea',
            'descArea',
            'habilitada',
            'idConvocatoria'
        ]));

        return response()->json([
            'message' => 'Área creada correctamente',
            'area' => $area
        ], 201);
    }

    public function index(){
        $areas = Area::all();
        return response()->json($areas);
    }
}
