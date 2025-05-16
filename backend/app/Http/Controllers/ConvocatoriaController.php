<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use App\Models\Area;
use App\Models\Categoria;
use App\Models\Curso;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
//
use Illuminate\Support\Facades\Validator;

//
use Illuminate\Support\Facades\Storage;



class ConvocatoriaController extends Controller
{
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




 //upadte solo de convocatoria//

 public function updateConvocatoria(Request $request, $idConvocatoria)
 {
     // Validación de los datos del request
     $validatedData = $request->validate([
         'tituloConvocatoria' => 'required|string',
         'descripcion' => 'required|string',
         'fechaPublicacion' => 'required|date',
         'fechaInicioInsc' => 'required|date',
         'fechaFinInsc' => 'required|date',
         //'portada' => 'required|string',
         'portada' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
         'habilitada' => 'required|boolean',
         'fechaInicioOlimp' => 'required|date',
         'fechaFinOlimp' => 'required|date',
         'maximoPostPorArea' => 'required|integer',
         'eliminado' => 'required|boolean',
     ]);

     try {
         // Buscar la convocatoria por el ID
         $conv = Convocatoria::findOrFail($idConvocatoria);

        if ($request->hasFile('portada')) {
            // Eliminar portada anterior si existe
            if ($conv->portada && Storage::disk('public')->exists($conv->portada)) {
                Storage::disk('public')->delete($conv->portada);
            }

            // Guardar la nueva portada
            $path = $request->file('portada')->store('portadas', 'public');
            $validatedData['portada'] = $path;
        }


        $updateData=[
            'tituloConvocatoria' => $validatedData['tituloConvocatoria'],
            'descripcion' => $validatedData['descripcion'],
            'fechaPublicacion' => $validatedData['fechaPublicacion'],
            'fechaInicioInsc' => $validatedData['fechaInicioInsc'],
            'fechaFinInsc' => $validatedData['fechaFinInsc'],
            //'portada' => $validatedData['portada'],
            'habilitada' => $validatedData['habilitada'],
            'fechaInicioOlimp' => $validatedData['fechaInicioOlimp'],
            'fechaFinOlimp' => $validatedData['fechaFinOlimp'],
            'maximoPostPorArea' => $validatedData['maximoPostPorArea'],
            'eliminado' => $validatedData['eliminado'],
        ];

        if (isset($validatedData['portada'])) {
            $updateData['portada'] = $validatedData['portada'];
        }

        $conv->update($updateData);

         // Responder con mensaje de éxito
         return response()->json(['message' => 'Convocatoria actualizada correctamente'], 200);

     } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
         // Error si la convocatoria no se encuentra
         return response()->json(['error' => 'Convocatoria no encontrada'], 404);

     } catch (\Exception $e) {
         // Error genérico
         //Log::error('Error al actualizar convocatoria: '.$e->getMessage());
         return response()->json(['error' => 'Hubo un problema al actualizar la convocatoria', 'details' => $e->getMessage()], 500);
     }
 }












 
      //upadte solo de areas //

      public function updateAreasCategorias(Request $request, $idConvocatoria)
      {
          DB::beginTransaction();
          try {
              // Obtener IDs de áreas y categorías relacionadas
              $areaIds = DB::table('convocatoria_area')
                  ->where('idConvocatoria', $idConvocatoria)
                  ->pluck('idArea');
      
              $categoriaIds = Categoria::whereIn('idArea', $areaIds)->pluck('idCategoria');
      
              // Eliminar asociaciones en tabla intermedia
              DB::table('categoria_curso')->whereIn('idCategoria', $categoriaIds)->delete();
      
              // Eliminar categorías que no están asociadas a postulaciones
              $idsProtegidos = DB::table('postulacion')->pluck('idCategoria');
              $idsEliminables = $categoriaIds->diff($idsProtegidos);
      
              Categoria::whereIn('idCategoria', $idsEliminables)->delete();
      
              // Eliminar relaciones convocatoria_area solo si las áreas no están protegidas
              DB::table('convocatoria_area')->where('idConvocatoria', $idConvocatoria)->delete();
      
              // Insertar nuevas áreas y categorías
              foreach ($request->input('areas') as $areaData) {
                  $area = Area::firstOrCreate(
                      ['tituloArea' => $areaData['tituloArea']],
                      [
                          'descArea' => $areaData['descArea'] ?? null,
                          'habilitada' => $areaData['habilitada'] ?? true
                      ]
                  );
      
                  DB::table('convocatoria_area')->updateOrInsert([
                      'idConvocatoria' => $idConvocatoria,
                      'idArea' => $area->idArea
                  ]);
      
                  foreach ($areaData['categorias'] as $catData) {
                      $categoria = Categoria::create([
                          'nombreCategoria' => $catData['nombreCategoria'],
                          'descCategoria' => $catData['descCategoria'],
                          'maxPost' => $catData['maxPost'] ?? 0,
                          'montoCate' => $catData['montoCate'] ?? 0,
                          'idArea' => $area->idArea,
                          'idConvocatoria' => $idConvocatoria
                      ]);
      
                      // Asociar con cursos según coincidencia
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
              return response()->json(['message' => 'Áreas y categorías actualizadas correctamente'], 200);
      
          } catch (\Exception $e) {
              DB::rollback();
              return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
          }
      }
      
      // 🔍 Función para comparar nombres flexible
      private function compararNombres($a, $b)
      {
          return strtolower(trim($a)) === strtolower(trim($b));
      }
      










      public function destroy($idConvocatoria)
{
    DB::beginTransaction();
    try {
        // Buscar la convocatoria
        $conv = Convocatoria::findOrFail($idConvocatoria);

        // Marcar como eliminada cambiando el campo 'eliminado' a false
        $conv->eliminado = false;
        $conv->save();

        // Eliminar relaciones de tabla intermedia convocatoria_area
        DB::table('convocatoria_area')->where('idConvocatoria', $idConvocatoria)->delete();

        // Obtener los IDs de las áreas asociadas a la convocatoria
        $areaIds = DB::table('convocatoria_area')
            ->where('idConvocatoria', $idConvocatoria)
            ->pluck('idArea');

        // Obtener las categorías asociadas a las áreas
        $categoriaIds = Categoria::whereIn('idArea', $areaIds)->pluck('idCategoria');

        // Eliminar las relaciones en la tabla intermedia categoria_curso
        DB::table('categoria_curso')->whereIn('idCategoria', $categoriaIds)->delete();

        // Eliminar las categorías asociadas a las áreas (si no hay postulaciones)
        $idsProtegidos = DB::table('postulacion')->pluck('idCategoria');
        $idsEliminables = $categoriaIds->diff($idsProtegidos);
        Categoria::whereIn('idCategoria', $idsEliminables)->delete();

        DB::commit();
        return response()->json(['message' => 'Convocatoria marcada como eliminada correctamente'], 200);

    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['error' => 'Error al eliminar: ' . $e->getMessage()], 500);
    }
}



// obtiene convocatoria que no estan eliminadas mediante id convocatoria
public function getConvocatoriaById($idConvocatoria)
{
    try {
        // Recuperar la convocatoria con todas las relaciones: áreas, categorías, cursos
        $convocatoria = Convocatoria::with('areas.categorias.cursos')
            ->where('idConvocatoria', $idConvocatoria)
            ->where('eliminado', false)  // Solo convocatorias que no han sido eliminadas
            ->first();

        // Si no se encuentra la convocatoria
        if (!$convocatoria) {
            return response()->json(['error' => 'Convocatoria no encontrada o eliminada'], 404);
        }

        // Convertir la ruta de la imagen a URL pública
        if ($convocatoria->portada) {
            $convocatoria->portada = Storage::disk('public')->url($convocatoria->portada);
        }

        // ✅ Falta este return si todo va bien
        return response()->json($convocatoria, 200);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al recuperar la convocatoria',
            'message' => $e->getMessage()
        ], 500);
    }
}

public function storeConvocatoria(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo'              => 'required|string|max:45',
            'descripcion'         => 'required|string|max:75',
            'fechaPublicacion'    => 'required|date',
            'fechaInicioInsc'     => 'required|date',
            'fechaFinInsc'        => 'required|date',
            'portada'             => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'habilitada'          => 'required|boolean',
            'fechaInicioOlimp'    => 'required|date',
            'fechaFinOlimp'       => 'required|date',
            'maximoPostPorArea'   => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
            // guarda la imagen en la carpeta portadas
        if ($request->hasFile('portada')) {
            $path = $request->file('portada')->store('portadas', 'public');
        } else {
            $path = null;
        }

        $convocatoria = Convocatoria::create([
            'tituloConvocatoria'  => $request->input('titulo'),
            'descripcion'         => $request->input('descripcion'),
            'fechaPublicacion'    => $request->input('fechaPublicacion'),
            'fechaInicioInsc'     => $request->input('fechaInicioInsc'),
            'fechaFinInsc'        => $request->input('fechaFinInsc'),
            'portada'             => $path,
            'habilitada'          => $request->input('habilitada'),
            'fechaInicioOlimp'    => $request->input('fechaInicioOlimp'),
            'fechaFinOlimp'       => $request->input('fechaFinOlimp'),
            'maximoPostPorArea'   => $request->input('maximoPostPorArea'),
            'eliminado' => false,
        ]);

        // devuelve el id del a convocatoria creada
        return response()->json([
            'idConvocatoria' => $convocatoria->idConvocatoria
        ], 201);
    }


// obtiene convocatoria que no estan eliminadas mediante id convocatoria
// public function getConvocatoriaById($idConvocatoria)
// {
//     try {
//         // Recuperar la convocatoria con todas las relaciones: áreas, categorías, cursos
//         $convocatoria = Convocatoria::with('areas.categorias.cursos')
//             ->where('idConvocatoria', $idConvocatoria)
//             ->where('eliminado', true)  // Solo convocatorias que no han sido eliminadas
//             ->first();

//         // Si no se encuentra la convocatoria
//         if (!$convocatoria) {
//             return response()->json(['error' => 'Convocatoria no encontrada o eliminada'], 404);
//         }

//         // Retornar la convocatoria con todas sus relaciones
//         return response()->json($convocatoria, 200);

//     } catch (\Exception $e) {
//         // Manejo de errores
//         return response()->json(['error' => 'Error al obtener la convocatoria: ' . $e->getMessage()], 500);
//     }
// }


public function getConvocatoriasActivas()
    {
        try {
            // Recuperar todas las convocatorias activas con sus relaciones: áreas, categorías, cursos
            $convocatorias = Convocatoria::with('areas.categorias.cursos')
                ->where('eliminado', false)  // Solo convocatorias que no han sido eliminadas
                ->get();

            // Si no se encuentran convocatorias activas
            if ($convocatorias->isEmpty()) {
                return response()->json(['message' => 'No se encontraron convocatorias activas'], 404);
            }

            foreach ($convocatorias as $conv) {
                if ($conv->portada) {
                    $conv->portada = Storage::disk('public')->url($conv->portada);
                }
            }

            // Retornar las convocatorias activas con todas sus relaciones
            return response()->json($convocatorias, 200);

        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json(['error' => 'Error al obtener las convocatorias activas: ' . $e->getMessage()], 500);
        }
    }

    public function index(){
        $convocatorias = Convocatoria::all();
        
        foreach ($convocatorias as $conv) {
            if ($conv->portada) {
                $conv->portada = Storage::disk('public')->url($conv->portada);
            }
        }
        
        return response()->json($convocatorias);
    }

}


