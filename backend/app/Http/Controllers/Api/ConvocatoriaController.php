<?php

namespace App\Http\Controllers\Api;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
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
        $request->validate([
            'titulo' => 'required|string',
            'fechaPublicacion' => 'required|date',
            'fechaInicioInsc' => 'required|date',
            'fechaFinInsc' => 'required|date',
            'portada' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'habilitada' => 'required|boolean',
            'fechaInicioOlimp' => 'required|date',
            'fechaFinOlimp' => 'required|date',
            'maximoPostPorArea' => 'required|integer',
        ]);
    
        DB::beginTransaction();
        
    
        try {

            if ($request->hasFile('portada')) {
                $portadaPath = $request->file('portada')->store('portadas', 'public');
            } else {
                $portadaPath = null;  
            }

            $convocatoriaData = $request->has('convocatoria')
                ? $request->input('convocatoria')
                : $request->only([
                    'titulo',
                    'descripcion',
                    'fechaPublicacion',
                    'fechaInicioInsc',
                    'fechaFinInsc',
                    'habilitada',
                    'fechaInicioOlimp',
                    'fechaFinOlimp',
                    'maximoPostPorArea'
                ]);
                
                $convocatoriaData['portada'] = $portadaPath;
    
            $conv = Convocatoria::create($convocatoriaData);
    
            foreach ($request->input('areas') as $areaData) {
                // Verifica si existe o crea el área (sin necesidad de usar idConvocatoria en el área)
                $area = isset($areaData['idArea']) && Area::find($areaData['idArea'])
                    ? Area::find($areaData['idArea'])
                    : Area::firstOrCreate(
                        ['tituloArea' => $areaData['tituloArea']],
                        [
                            'descArea' => $areaData['descArea'] ?? null,
                            'habilitada' => $areaData['habilitada'] ?? true
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
    
    // Comparación de nombres flexible
    private function compararNombres($curso, $categoriaNivel)
    {
        return strtolower(trim($curso)) === strtolower(trim($categoriaNivel));
    }
}
