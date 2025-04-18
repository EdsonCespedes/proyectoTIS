<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use App\Models\Area;
use App\Models\Categoria;
use App\Models\Curso;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ConvocatoriaControllerJ extends Controller
{
    //obtiene todas las convocatorias
    public function index(){
        $convocatorias = Convocatoria::all();
        return response()->json($convocatorias);
    }

    //agregar post
    public function store(Request $request)
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
            $convocatoriaData = $request->has('convocatoria')
                ? $request->input('convocatoria')
                : $request->only([
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
    
            $conv = Convocatoria::create($convocatoriaData);
    
            foreach ($request->input('areas') as $areaData) {
                // Verifica si existe o crea el área (sin necesidad de usar idConvocatoria en el área)
                $area = Area::firstOrCreate(
                    ['tituloArea' => $areaData['tituloArea']], // Compara por el nombre del área
                    [
                        'descArea' => $areaData['descArea'] ?? null, // Si no se envía descripción, se deja null
                        'habilitada' => $areaData['habilitada'] ?? true // Si no se indica habilitación, se pone true por defecto
                    ]
                );
                // Insertar relación en tabla intermedia (evita duplicados)
                DB::table('convocatoria_area')->updateOrInsert(
                    [
                        'idConvocatoria' => $conv->idConvocatoria,
                        'idArea' => $area->idArea
                    ],
                    [] // Sin cambios extra, solo asegúrate de que exista
                );
    
                // Procesar categorías
                foreach ($areaData['categorias'] as $catData) {
                    $categoria = Categoria::create([
                        'nombreCategoria' => $catData['nombreCategoria'],
                        'descCategoria' => $catData['descCategoria'],
                        'maxPost' => $catData['maxPost'] ?? 0,
                        'idArea' => $area->idArea
                    ]);
    
                    // Separar niveles de descCategoria (ej: "1° Primaria, 2° Primaria")
                    $niveles = array_map('trim', explode(',', $catData['descCategoria']));
    
                    // Comparar con cursos existentes
                    $cursos = Curso::all();
    
                    foreach ($cursos as $curso) {
                        foreach ($niveles as $nivel) {
                            if ($this->compararNombres($curso->Curso, $nivel)) {
                                DB::table('categoria_curso')->insert([
                                    'idCategoria' => $categoria->idCategoria,
                                    'idCurso' => $curso->idCurso
                                ]);
                                break; // Ya lo encontró, salir del foreach
                            }
                        }
                    }
                }
            }
    
            DB::commit();
            return response()->json(['message' => 'Convocatoria creada con éxito'], 201);
    
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al guardar: ' . $e->getMessage()], 500);
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
