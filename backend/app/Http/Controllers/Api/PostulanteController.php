<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 
use App\Models\Postulante;


class PostulanteController extends Controller
{
    /**
     * Registra un nuevo postulante.
     */
    public function store(Request $request)
    {
        // Validación de los datos
        $validator = Validator::make($request->all(), [
            'nombrePost'    => 'required|string|max:45',
            'apellidoPost'  => 'required|string|max:45',
            'carnet'        => 'required|string|max:45|unique:postulante,carnet',
            'fechaNaciPost' => 'required|date',
            'correoPost'    => 'required|email|max:45|unique:postulante,correoPost',
            'telefonoPost'  => 'required|string|max:45',
            'departamento'  => 'required|string|max:45',
            'provincia'     => 'required|string|max:45',
            'idTutor'       => 'required|integer|exists:tutor,idTutor',
            'idColegio'     => 'required|integer|exists:colegio,idColegio',
            'idDelegacion'  => 'nullable|integer|exists:delegacion,idDelegacion',
            'idCurso'       => 'required|integer|exists:curso,idCurso',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Crear el postulante
        $postulante = Postulante::create($request->all());

        return response()->json([
            'message'   => 'Postulante registrado correctamente',
            'postulante'=> $postulante
        ], 201);
    }
}
