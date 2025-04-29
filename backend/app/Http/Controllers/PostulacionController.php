<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Postulacion;

class PostulacionControllerG extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $postulaciones = Postulacion::with([
            'postulante.colegio',
            'postulante.tutor',
            'postulante.delegacion',
            'postulante.curso',
            'categoria.area'
        ])->get();

        return response()->json($postulaciones);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $postulacion = Postulacion::with([
            'postulante.colegio',
            'postulante.tutor',
            'postulante.delegacion',
            'postulante.curso',
            'categoria.area'
        ])->find($id);

        if (!$postulacion) {
            return response()->json(['message' => 'Postulación no encontrada'], 404);
        }

        return response()->json($postulacion);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Función para crear una nueva postulación (opcional)
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
        // Función para actualizar una postulación (opcional)
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Función para eliminar una postulación (opcional)
    }
}
