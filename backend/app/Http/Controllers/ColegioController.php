<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Colegio;
use Illuminate\Support\Facades\DB;

class ColegioController extends Controller
{
    public function index() //obtiene 
    {
       
        return Colegio::obtenerDatosColegio();
    }

    public function store(Request $request) //guarda
    {
        $validated = $request->validate([
            'nombreColegio' => 'required|string',
            'departamento' => 'required|string',
            'provincia' => 'required|string',
            'RUE' => 'required|string',
            'direccion' => 'required|string',
            'fecha_creacion' => 'required|date',
        ]);
    
        $colegio = Colegio::create($validated);

        activity()
                ->causedBy(Auth::user())
                ->performedOn($colegio)
                ->withProperties(['attributes' => $colegio->toArray()])
                ->log('created');
    
        return response()->json([
            'message' => 'Colegio registrado correctamente',
            'data' => $colegio
        ], 201);
    
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


    //obtiene los datos de un colegio por su id
    public function muestraColegioconid($id)
{
    $colegio = Colegio::find($id);

    if (!$colegio) {
        return response()->json(['message' => 'Colegio no encontrado'], 404);
    }

    return response()->json($colegio);
}


}
