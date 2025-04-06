<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Provincia;
use App\Models\Departamento;


class ProvinciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    public function getProvinciasPorNombreDepartamento($nombre)
    {
        // Ajusta el nombre de la columna a la que realmente existe en la base de datos
        $departamento = Departamento::where('nombreDepartamento', $nombre)->first();

        if (!$departamento) {
            return response()->json(['error' => 'Departamento no encontrado'], 404);
        }

        // Obtiene las provincias que pertenecen al departamento encontrado
        $provincias = Provincia::where('idDepartamento', $departamento->idDepartamento)->get();

        return response()->json($provincias);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
