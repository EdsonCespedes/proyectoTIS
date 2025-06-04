<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Tutor;
use App\Models\Postulante;
use App\Models\Postulacion;
use App\Models\Colegio;
use App\Models\Curso;

class PostulanteController extends Controller
{
    public function register(Request $request)
    {
        
        if ($request->filled('idTutor')) {
            $request->request->remove('tutor');
        }
               
        $validator = Validator::make($request->all(), [
            // Campos postulante
            'nombrePost'         => 'required|string|max:45',
            'apellidoPost'       => 'required|string|max:45',
            'carnet'             => 'required|string|max:45|unique:postulante,carnet',
            'fechaNaciPost'      => 'required|date',
            'correoPost'         => 'required|email|max:45|unique:postulante,correoPost',
            'telefonoPost'       => 'nullable|string|max:45',
            'departamento'       => 'required|string|max:45',
            'provincia'          => 'required|string|max:45',
            'idColegio'          => 'required|string',
            'idCurso'            => 'required|string',
            'idTutor'            => 'nullable',
            'delegacion'         => 'nullable|string',
            // Tutor
            'tutor.nombreTutor'  => 'required_without:idTutor|string|max:45',
            'tutor.apellidoTutor'=> 'required_without:idTutor|string|max:45',
            'tutor.correoTutor'  => 'required_without:idTutor|email|max:45|unique:tutor,correoTutor',
            'tutor.telefonoTutor'=> 'required_without:idTutor|string|max:45',
            'tutor.fechaNaciTutor'=> 'required_without:idTutor|date',
            // Areas y categorías
            'areas'              => 'required|array|min:1',
            'categorias'         => 'required|array|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            if (!$request->filled('idTutor') && $request->has('tutor')) {
                $tutorData = $request->input('tutor');
                $tutor = Tutor::create($tutorData);
                $idTutor = $tutor->idTutor;
            } else {
                $idTutor = $request->input('idTutor');
            }
            

            // Busca o crear Colegio y Curso
            $colegioId = $this->buscarOCrearColegio($request->input('idColegio'));
            $cursoId   = $this->buscarOCrearCurso($request->input('idCurso'));

            // Crea el Postulante
            $postulanteData = [
                'nombrePost'    => $request->input('nombrePost'),
                'apellidoPost'  => $request->input('apellidoPost'),
                'carnet'        => $request->input('carnet'),
                'fechaNaciPost' => $request->input('fechaNaciPost'),
                'correoPost'    => $request->input('correoPost'),
                'telefonoPost'  => $request->input('telefonoPost'),
                'departamento'  => $request->input('departamento'),
                'provincia'     => $request->input('provincia'),
                'idTutor'       => $idTutor,
                'idColegio'     => $colegioId,
                'delegacion'    => $request->input('delegacion'),
                'idCurso'       => $cursoId,
            ];
            $postulante = Postulante::create($postulanteData);

            // Relacionar en convocatoria_area
            foreach ($request->input('areas') as $areaItem) {
                // Verificar si el area existe
                $areaExists = DB::table('area')->where('idArea', $areaItem['idArea'])->first();
                if (!$areaExists) {
                    // Crea el area con los datos recibidos
                    DB::table('area')->insert([
                        'idArea'         => $areaItem['idArea'],
                        'tituloArea'     => $areaItem['tituloArea'],
                        'descArea'       => $areaItem['descArea'],
                        'habilitada'     => $areaItem['activo'],
                        'idConvocatoria' => $areaItem['idConvocatoria']
                    ]);
                }
                // Crea la relación en la tabla convocatoria_area
                $existsConvArea = DB::table('convocatoria_area')
                    ->where('idConvocatoria', $areaItem['idConvocatoria'])
                    ->where('idArea', $areaItem['idArea'])
                    ->exists();
                if (!$existsConvArea) {
                    DB::table('convocatoria_area')->insert([
                        'idConvocatoria' => $areaItem['idConvocatoria'],
                        'idArea'         => $areaItem['idArea']
                    ]);
                }
            }

            //// Guardar los ID de postulación
            $postulacionIds = [];
            ////


            // Categorías y sus relaciones intermedias
            foreach ($request->input('categorias') as $categoriaItem) {
                // Busca o crea categoría
                $categoriaExists = DB::table('categoria')
                    ->where('idCategoria', $categoriaItem['idCategoria'])
                    ->first();
                if (!$categoriaExists) {
                    DB::table('categoria')->insert([
                        'idCategoria'     => $categoriaItem['idCategoria'],
                        'nombreCategoria' => $categoriaItem['nombreCategoria'],
                        'descCategoria'   => $categoriaItem['descCategoria'],
                        'idArea'          => $categoriaItem['idArea'],
                        'maxPost'         => $categoriaItem['maxPost'] ?? 0,
                    ]);
                }

                // Verifica que no se supere el límite de postulaciones por categoría:
                    $inscriptos = DB::table('postulacion')
                    ->where('idCategoria', $categoriaItem['idCategoria'])
                    ->count();
                if ($inscriptos >= $categoriaExists->maxPost) {
                throw new \Exception("La categoría '{$categoriaItem['nombreCategoria']}' ya alcanzó el máximo de postulaciones ({$categoriaExists->maxPost}).");
                }

                // Categoría a Curso en categoria_curso
                $existsCatCurso = DB::table('categoria_curso')
                    ->where('idCategoria', $categoriaItem['idCategoria'])
                    ->where('idCurso', $cursoId)
                    ->exists();
                if (!$existsCatCurso) {
                    DB::table('categoria_curso')->insert([
                        'idCategoria' => $categoriaItem['idCategoria'],
                        'idCurso'     => $cursoId
                    ]);
                }
                
                // Insertar en postulacion y obtener ID
                $idPostulacion = DB::table('postulacion')->insertGetId([
                    'idCategoria'  => $categoriaItem['idCategoria'],
                    'idPostulante' => $postulante->idPostulante,
                ]);

                $postulacionIds[] = $idPostulacion;
            }

            activity()
            ->causedBy(Auth::user())
            ->performedOn($postulante)
            ->withProperties(['attributes' => $postulante->toArray()])
            ->log('created');

            DB::commit();
            return response()->json([
                'message'   => 'Registro completado correctamente',
                'idPostulacion' => $postulacionIds,
                'postulante'=> $postulante
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function buscarOCrearColegio($nombre)
    {
        $colegio = DB::table('colegio')->where('nombreColegio', $nombre)->first();
        if ($colegio) {
            return $colegio->idColegio;
        }
        // return DB::table('colegio')->insertGetId([
        //     'nombreColegio' => $nombre,
        //     'departamento'  => 'Sin definir',
        //     'provincia'     => 'Sin definir',
        //     'rue'           => 'Sin definir',
        //     'direccion'     => 'Sin definir',
        //     'fecha_creacion' => date('Y-m-d')
        // ]);
    }

    private function buscarOCrearCurso($nombre)
    {
        $curso = DB::table('curso')->where('Curso', $nombre)->first();
        if ($curso) {
            return $curso->idCurso;
        }
        // return DB::table('curso')->insertGetId([
        //     'Curso' => $nombre
        // ]);
    }

    public function index()
    {
        $postulantes = Postulante::all();
        return response()->json($postulantes);
    }

    public function updatePostulante(Request $request, $idPostulante)
    {
        $validator = Validator::make($request->all(), [
            'nombrePost'        => 'sometimes|required|string|max:45',
            'apellidoPost'      => 'sometimes|required|string|max:45',
            'carnet'            => 'sometimes|required|string|max:45|unique:postulante,carnet,' . $idPostulante . ',idPostulante',
            'fechaNaciPost'     => 'sometimes|required|date',
            'correoPost'        => 'sometimes|required|email|max:45|unique:postulante,correoPost,' . $idPostulante . ',idPostulante',
            'telefonoPost'      => 'nullable|string|max:45',
            'departamento'      => 'sometimes|required|string|max:45',
            'provincia'         => 'sometimes|required|string|max:45',
            'delegacion'        => 'nullable|string|max:255',
            'idColegio'         => 'nullable|string',
            'idCurso'           => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            $postulante = Postulante::findOrFail($idPostulante);

            if ($request->filled('idColegio')) {
                $postulante->idColegio = $this->buscarOCrearColegio($request->input('idColegio'));
            }

            if ($request->filled('idCurso')) {
                $postulante->idCurso = $this->buscarOCrearCurso($request->input('idCurso'));
            }

            $postulante->fill($request->only([
                'nombrePost',
                'apellidoPost',
                'carnet',
                'fechaNaciPost',
                'correoPost',
                'telefonoPost',
                'departamento',
                'provincia',
                'delegacion',
            ]));

            $postulante->save();

            activity()
                ->causedBy(Auth::user())
                ->performedOn($postulante)
                ->withProperties([
                    'old'        => array_intersect_key($oldData, $newData),
                    'attributes' => array_intersect_key($newData, $newData),
                ])
                ->log('updated');

            DB::commit();
            return response()->json([
                'message'    => 'Postulante actualizado correctamente',
                'postulante' => $postulante
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
