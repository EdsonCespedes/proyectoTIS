<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;

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

}
