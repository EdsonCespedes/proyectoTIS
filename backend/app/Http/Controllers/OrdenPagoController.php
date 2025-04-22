<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutor;

class OrdenPagoController extends Controller
{
    
    
    public function buscar(Request $request)
    {
        $query = $request->input('query'); // Puede ser idTutor o "nombre apellido"

        $resultados = Tutor::with('ordenesPago')
            ->where('idTutor', $query)
            ->orWhereRaw("CONCAT(nombreTutor, ' ', apellidoTutor) LIKE ?", ["%{$query}%"])
            ->get();

        return response()->json($resultados);
    }

    
    
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
