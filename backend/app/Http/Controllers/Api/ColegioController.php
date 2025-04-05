<?php

namespace App\Http\Controllers\Api;

use App\Models\Colegio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class ColegioController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombreColegio' => 'required|string|max:45|unique:colegio,nombreColegio',
            'departamento'  => 'required|string|max:45',
            'provincia'     => 'required|string|max:45',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $colegio = Colegio::create($request->only([
            'nombreColegio',
            'departamento',
            'provincia'
        ]));

        return response()->json([
            'message' => 'Colegio creado correctamente',
            'colegio' => $colegio
        ], 201);
    }
}
