<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use App\Models\Area;
use App\Models\Categoria;
use App\Models\Curso;
use Illuminate\Support\Facades\DB;

class ConvocatoriaController extends Controller
{
    //
    public function index(){
        $convocatorias = Convocatoria::all();
        return response()->json($convocatorias);
    }

    //agregar post
    public function store(Request $request)
{
    // Validar la entrada, con la posibilidad de que los datos vengan en formato anidado
    $request->validate([
        'convocatoria.titulo' => 'required|string',
        'convocatoria.fechaPublicacion' => 'required|date',
        'convocatoria.fechaInicioInsc' => 'required|date',
        'convocatoria.fechaFinInsc' => 'required|date',
        'convocatoria.portada' => 'required|string',
        'convocatoria.habilitada' => 'required|boolean',
        'convocatoria.fechaInicioOlimp' => 'required|date',
        'convocatoria.fechaFinOlimp' => 'required|date',
        'convocatoria.maximoPostPorArea' => 'required|integer',
    ]);

    // Iniciar la transacción
    DB::beginTransaction();

    try {
        // Verificar si la data de convocatoria viene dentro de un campo 'convocatoria' (formato anidado)
        $convocatoriaData = $request->has('convocatoria')
            ? $request->input('convocatoria') // Si está anidado, tomarlo
            : $request->only([ // Si no, tomar los campos directamente
                'titulo',
                'descripcion',
                'fechaPublicacion',
                'fechaInicioInsc',
                'fechaFinInsc',
                'portada',
                'habilitada',
                'fechaInicioOlimp',
                'fechaFinOlimp',
                'maximoPostPorArea'
            ]);

        // Guardar la convocatoria
        $conv = Convocatoria::create($convocatoriaData);

        // Recorrer las áreas
        foreach ($request->input('areas') as $areaData) {
            // Si viene con ID, es existente
            if (isset($areaData['idArea'])) {
                $area = Area::findOrFail($areaData['idArea']);
            } else {
                // Si es nueva, crearla
                $area = Area::create([
                    'tituloArea' => $areaData['tituloArea'],
                    'descArea' => $areaData['descArea'],
                    'habilitada' => $areaData['habilitada'],
                    'idConvocatoria' => $conv->idConvocatoria
                ]);
            }

            // Guardar la relación en la tabla convocatoria_area
            DB::table('convocatoria_area')->insert([
                'idConvocatoria' => $conv->idConvocatoria,
                'idArea' => $area->idArea
            ]);

            // Recorrer las categorías
            foreach ($areaData['categorias'] as $catData) {
                $categoria = Categoria::create([
                    'nombreCategoria' => $catData['nombreCategoria'],
                    'descCategoria' => $catData['descCategoria'],
                    'idArea' => $area->idArea
                ]);

                // Guardar los cursos asociados a la categoría
                foreach ($catData['cursos'] as $idCurso) {
                    DB::table('categoria_curso')->insert([
                        'idCategoria' => $categoria->idCategoria,
                        'idCurso' => $idCurso
                    ]);
                }
            }
        }

        // Confirmar la transacción
        DB::commit();
        return response()->json(['message' => 'Convocatoria creada con éxito'], 201);
        
    } catch (\Exception $e) {
        // Revertir la transacción en caso de error
        DB::rollback();
        return response()->json(['error' => 'Error al guardar: ' . $e->getMessage()], 500);
    }
}





    
    public function obtenerEstructura($id)
{
    $convocatoria = Convocatoria::with(['areas' => function ($areaQuery) {
        $areaQuery->where('habilitada', true)->with(['categorias' => function ($categoriaQuery) {
            $categoriaQuery->where('habilitada', true)->with('cursos');
        }]);
    }])->find($id);

    if (!$convocatoria) {
        return response()->json(['message' => 'Convocatoria no encontrada'], 404);
    }

    return response()->json($convocatoria);
}

}
