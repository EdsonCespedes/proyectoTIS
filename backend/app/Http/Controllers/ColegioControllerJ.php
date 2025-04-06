<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Colegio;

class ColegioControllerJ extends Controller
{
    public function index() //obtiene 
    {
       
        return Colegio::obtenerDatosColegio();
    }

    public function store(Request $request) //guarda
    {
        $colegio = Colegio::create($request->all());
        return response()->json($colegio, 201);
    }

    public function getDepartamentos()
    {
          $departamentos= Colegio::select('departamento')
          ->distinct()
          ->orderBy('departamento')
          ->get()
          ->pluck('departamento');

          return response()->json($departamentos);

    }

    public function getProvincias($departamento)
    {
        $provincias=Colegio::where('departamento',$departamento)
        ->select('provincia')
        ->distinct()
        ->orderBy('provincia')
        ->get()
        ->pluck('provincia');
        return response()->json($provincias);

    }
    public function getColegios($departamento,$provincia)
    {
          $colegios=Colegio::where('departamento',$departamento)
          ->where('provincia',$provincia)
          ->select('idColegio','nombreColegio')
          ->orderBy('nombreColegio')
          ->get()
          ->pluck('nombreColegio','idColegio'); //pluck hace que salga directamente los datos sin el nombre de su atributo si lo quitas saldra el nombre del atributo
          return response()->json($colegios);

    }
}
