<?php

namespace App\Http\Controllers\Api;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CategoriaController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombreCategoria' => 'required|string|max:45|unique:categoria,nombreCategoria',
            'descCategoria'   => 'nullable|string|max:45',
            'idArea'          => 'required|integer|exists:area,idArea'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $categoria = Categoria::create($request->only([
            'nombreCategoria',
            'descCategoria',
            'idArea'
        ]));

        return response()->json([
            'message' => 'Categoría creada correctamente',
            'categoria' => $categoria
        ], 201);
    }
}
