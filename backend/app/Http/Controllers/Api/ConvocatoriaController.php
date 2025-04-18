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
    public function storeV(Request $request)
    {
        \Log::info('Store method reached');
    
        // Log para ver los datos recibidos
        \Log::info('Request Data:', $request->all());
    
        try {
            $validatedData = $request->validate([
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
    
            \Log::info('Validated data:', $validatedData);
    
            DB::beginTransaction();
    
            if ($request->hasFile('portada')) {
                $portadaPath = $request->file('portada')->store('portadas', 'public');
                \Log::info('Portada almacenada en: ' . $portadaPath);
            } else {
                $portadaPath = null;
                \Log::info('No se recibió portada');
            }
    
            $convocatoriaData = $request->has('convocatoria')
                ? $request->input('convocatoria')
                : $request->only([
                    'titulo', 'descripcion', 'fechaPublicacion', 'fechaInicioInsc',
                    'fechaFinInsc', 'habilitada', 'fechaInicioOlimp', 'fechaFinOlimp',
                    'maximoPostPorArea'
                ]);
    
            \Log::info('Convocatoria Data:', $convocatoriaData);
    
            $convocatoriaData['portada'] = $portadaPath;
    
            $conv = Convocatoria::create($convocatoriaData);
            \Log::info('Convocatoria creada: ', $conv->toArray());
    
            // Aquí puedes seguir con la lógica de áreas y categorías, añadiendo logs similares
    
            DB::commit();
    
            return response()->json(['message' => 'Convocatoria creada con éxito'], 201);
    
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error('Error al guardar: ' . $e->getMessage());
            \Log::error('Trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Error al guardar: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString()  // Incluye el trace para obtener detalles
            ], 500);
        }
    }
    
    
    // Comparación de nombres flexible
    private function compararNombres($curso, $categoriaNivel)
    {
        return strtolower(trim($curso)) === strtolower(trim($categoriaNivel));
    }
}
