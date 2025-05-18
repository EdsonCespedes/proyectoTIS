<?php

namespace App\Http\Controllers;

use App\Models\Postulante;
use Illuminate\Http\Request;

class PostulanteControllerJ extends Controller
{
    //
    public function index(){
        $postulante = Postulante::all();
        return response()->json($postulante);
    }
}
