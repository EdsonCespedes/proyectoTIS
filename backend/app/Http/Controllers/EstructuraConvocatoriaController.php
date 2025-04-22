<?php

namespace App\Http\Controllers;



use App\Models\Convocatoria;
use Illuminate\Http\Request;
use App\Models\Area;
use App\Models\Categoria;
use App\Models\Curso;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class EstructuraConvocatoriaController extends Controller
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
   
     public function obtenerEstructuraPorConvocatoriaYCurso($idConvocatoria, $nombreCurso)
{
    // Verificar si la convocatoria existe y está habilitada
    $convocatoria = Convocatoria::where('habilitada', true)->find($idConvocatoria);
    if (!$convocatoria) {
        return response()->json(['message' => 'Convocatoria no encontrada o no habilitada'], 404);
    }

    // Buscar el curso por su nombre
    $curso = Curso::where('Curso', $nombreCurso)->first();
    if (!$curso) {
        return response()->json(['message' => 'Curso no encontrado'], 404);
    }

    // Obtener las categorías habilitadas
    $categorias = $curso->categorias()
        ->where('maxPost', '>', 0) // solo categorías con cupo disponible
        ->whereHas('area', function($query) use ($idConvocatoria) {
            $query->where('habilitada', true)
                  ->where('idConvocatoria', $idConvocatoria);
        })
        ->with(['area' => function($query) {
            $query->where('habilitada', true);
        }])
        ->get();

    // Estructurar la respuesta
    $resultado = [
        'convocatoria' => [
            'id' => $convocatoria->idConvocatoria
        ],
        'curso' => [
            'id' => $curso->idCurso,
            'nombre' => $curso->Curso
        ],
        'estructura' => []
    ];

    // Agrupar por áreas
    foreach ($categorias as $categoria) {
        if ($categoria->area) {
            $areaId = $categoria->area->idArea;
            if (!isset($resultado['estructura'][$areaId])) {
                $resultado['estructura'][$areaId] = [
                    'area' => [
                        'id' => $categoria->area->idArea,
                        'nombre' => $categoria->area->tituloArea
                    ],
                    'categorias' => []
                ];
            }

            $resultado['estructura'][$areaId]['categorias'][] = [
                'id' => $categoria->idCategoria,
                'nombre' => $categoria->nombreCategoria
            ];
        }
    }

    // Convertir a array indexado
    $resultado['estructura'] = array_values($resultado['estructura']);

    return response()->json($resultado);
}

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
