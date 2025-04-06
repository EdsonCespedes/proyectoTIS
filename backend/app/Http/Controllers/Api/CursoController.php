<?php

namespace App\Http\Controllers\Api;

use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CursoController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Curso' => 'required|string|max:45|unique:curso,Curso'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $curso = Curso::create($request->only('Curso'));

        return response()->json([
            'message' => 'Curso creado correctamente',
            'curso' => $curso
        ], 201);
    }

    public function index()
    {
        return response()->json(Curso::all());
    }
}
