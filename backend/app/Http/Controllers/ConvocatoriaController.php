<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;

class ConvocatoriaController extends Controller
{
    //
    public function index(){
        $convocatorias = Convocatoria::all();
        return response()->json($convocatorias);
    }
}
