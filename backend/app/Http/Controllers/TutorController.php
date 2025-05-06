<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TutorController extends Controller
{
    //
    public function index(){
        $tutor = Tutor::all();
        return response()->json($tutor);
    }

    public function show($id)
    {
        $tutor = Tutor::find($id);

        if (!$tutor) {
            return response()->json(['message' => 'Tutor no encontrado'], 404);
        }

        return response()->json($tutor, 200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'nombreTutor'  => 'required|string|max:45',
            'apellidoTutor'=> 'required|string|max:45',
            'correoTutor'  => 'required|email|max:45',
            'telefonoTutor'=> 'required|string|max:45',
            'fechaNaciTutor'=> 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verificar si ya existe un tutor con ese correo
        $tutorExistente = Tutor::where('correoTutor', $request->correoTutor)->first();
        if ($tutorExistente) {
            return response()->json([
                'message' => 'El tutor ya existe',
                'idTutor' => $tutorExistente->idTutor
            ], 200); // o 409 si quieres marcarlo como conflicto
        }

        $tutor = Tutor::create($request->only([
            'nombreTutor',
            'apellidoTutor',
            'correoTutor',
            'telefonoTutor',
            'fechaNaciTutor'
        ]));

        return response()->json([
            'message' => 'Tutor creado correctamente',
            'idTutor' => $tutor->idTutor
        ], 201);
    }
}
