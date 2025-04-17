<?php

namespace App\Http\Controllers\Api;

use App\Models\Colegio;
use App\Models\Departamento;
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
            'RUE' => 'required|string',
            'direccion' => 'required|string',
            'fecha_creacion' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $colegio = Colegio::create($request->only([
            'nombreColegio',
            'departamento',
            'provincia',
            'RUE',
            'direccion',
            'fecha_creacion'
        ]));

        return response()->json([
            'message' => 'Colegio creado correctamente',
            'colegio' => $colegio
        ], 201);
    }

    public function index() //obtiene 
    {
       
        return Colegio::obtenerDatosColegio();
    }

    // public function store(Request $request) //guarda
    // {
    //     $colegio = Colegio::create($request->all());
    //     return response()->json($colegio, 201);
    // }

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
