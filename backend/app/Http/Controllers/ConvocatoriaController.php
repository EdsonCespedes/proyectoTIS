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
                    'montoCate' => $catData['montoCate'] ?? 0,
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
     
    


    public function update(Request $request, $idConvocatoria)
    {
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
    
        DB::beginTransaction();
        try {
            // 1. Actualizar convocatoria
            $conv = Convocatoria::findOrFail($idConvocatoria);
            $conv->update($request->input('convocatoria'));
    
            // 2. Eliminar relaciones previas
            $areaIds = DB::table('convocatoria_area')
                        ->where('idConvocatoria', $idConvocatoria)
                        ->pluck('idArea');
    
            $categoriaIds = Categoria::whereIn('idArea', $areaIds)->pluck('idCategoria');
    
            DB::table('categoria_curso')->whereIn('idCategoria', $categoriaIds)->delete();
            Categoria::whereIn('idCategoria', $categoriaIds)->delete();
            DB::table('convocatoria_area')->where('idConvocatoria', $idConvocatoria)->delete();
    
            // 3. Insertar nuevamente las áreas y categorías
            foreach ($request->input('areas') as $areaData) {
                $area = Area::firstOrCreate(
                    ['tituloArea' => $areaData['tituloArea']],
                    [
                        'descArea' => $areaData['descArea'] ?? null,
                        'habilitada' => $areaData['habilitada'] ?? true
                    ]
                );
    
                DB::table('convocatoria_area')->updateOrInsert([
                    'idConvocatoria' => $conv->idConvocatoria,
                    'idArea' => $area->idArea
                ]);
    
                foreach ($areaData['categorias'] as $catData) {
                    $categoria = Categoria::create([
                        'nombreCategoria' => $catData['nombreCategoria'],
                        'descCategoria' => $catData['descCategoria'],
                        'maxPost' => $catData['maxPost'] ?? 0,
                        'montoCate' => $catData['montoCate'] ?? 0,
                        'idArea' => $area->idArea
                       
                    ]);
    
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
            return response()->json(['message' => 'Convocatoria actualizada con éxito'], 200);
    
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
        }
    }

    






    public function destroy($idConvocatoria)
{
    DB::beginTransaction();
    try {
        $conv = Convocatoria::findOrFail($idConvocatoria);

        // Eliminar relaciones
        $areaIds = DB::table('convocatoria_area')
                    ->where('idConvocatoria', $idConvocatoria)
                    ->pluck('idArea');

        $categoriaIds = Categoria::whereIn('idArea', $areaIds)->pluck('idCategoria');

        DB::table('categoria_curso')->whereIn('idCategoria', $categoriaIds)->delete();
        Categoria::whereIn('idCategoria', $categoriaIds)->delete();
        DB::table('convocatoria_area')->where('idConvocatoria', $idConvocatoria)->delete();

        // Finalmente eliminar la convocatoria
        $conv->delete();

        DB::commit();
        return response()->json(['message' => 'Convocatoria eliminada correctamente'], 200);

    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['error' => 'Error al eliminar: ' . $e->getMessage()], 500);
    }
}


}
