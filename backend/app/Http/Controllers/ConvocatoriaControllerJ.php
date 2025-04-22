<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use App\Models\Area;
use App\Models\Categoria;
use App\Models\Curso;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

// ConvocatoriaEstructuraController.php
public function areasEstructura(Request $request, $id)
{
    $convocatoria = Convocatoria::find($id);

    if (!$convocatoria) {
        return response()->json(['error' => 'Convocatoria no encontrada'], 404);
    }

    DB::beginTransaction();

    try {
        foreach ($request->input('areas') as $areaData) {
            $area = Area::firstOrCreate(
                ['tituloArea' => $areaData['tituloArea']],
                [
                    'descArea' => $areaData['descArea'] ?? null,
                    'habilitada' => $areaData['habilitada'] ?? true
                ]
            );

            // Relacionar con convocatoria
            DB::table('convocatoria_area')->updateOrInsert(
                [
                    'idConvocatoria' => $convocatoria->idConvocatoria,
                    'idArea' => $area->idArea
                ],
                []
            );

            // Procesar categorías
            foreach ($areaData['categorias'] as $catData) {
                $categoria = Categoria::create([
                    'nombreCategoria' => $catData['nombreCategoria'],
                    'descCategoria' => $catData['descCategoria'],
                    'maxPost' => $catData['maxPost'] ?? 0,
                    'idArea' => $area->idArea
                ]);

                // Niveles desde descCategoria (ej: "1° Primaria, 2° Primaria")
                $niveles = array_map('trim', explode(',', $catData['descCategoria']));
                $cursos = Curso::all();

                foreach ($cursos as $curso) {
                    foreach ($niveles as $nivel) {
                        if ($this->compararNombres($curso->Curso, $nivel)) {
                            DB::table('categoria_curso')->insert([
                                'idCategoria' => $categoria->idCategoria,
                                'idCurso' => $curso->idCurso
                            ]);
                            break;
                        }
                    }
                }
            }
        }

        DB::commit();
        return response()->json(['message' => 'Estructura registrada correctamente'], 201);

    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['error' => 'Error al guardar estructura: ' . $e->getMessage()], 500);
    }
}








    public function editarConvocatoria($idConvocatoria)
    {
        $convocatoria = Convocatoria::with([
            'areas.categorias.cursos' 
        ])->find($idConvocatoria);
    
        if (!$convocatoria) {
            return response()->json(['message' => 'Convocatoria no encontrada'], 404);
        }
    
        return response()->json($convocatoria);
    }
     
    

    

}
