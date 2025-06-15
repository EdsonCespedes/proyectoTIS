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
        // Si llega idTutor, removemos el objeto tutor
        if ($request->filled('idTutor')) {
            $request->request->remove('tutor');
        }

        $validator = Validator::make($request->all(), [
            // Campos postulante
            'nombrePost'         => 'required|string|max:45',
            'apellidoPost'       => 'required|string|max:45',
            'carnet'             => 'required|string|max:45',
            'fechaNaciPost'      => 'required|date',
            'correoPost'         => 'required|email|max:45',
            'telefonoPost'       => 'nullable|string|max:45',
            'departamento'       => 'required|string|max:45',
            'provincia'          => 'required|string|max:45',
            'idColegio'          => 'required|string',
            'idCurso'            => 'required|string',
            'idTutor'            => 'nullable|exists:tutor,idTutor',
            'delegacion'         => 'nullable|string',

            // Tutor (si no viene idTutor)
            'tutor.nombreTutor'   => 'required_without:idTutor|string|max:45',
            'tutor.apellidoTutor' => 'required_without:idTutor|string|max:45',
            'tutor.correoTutor'   => 'required_without:idTutor|email|max:45|unique:tutor,correoTutor',
            'tutor.telefonoTutor' => 'required_without:idTutor|string|max:45',
            'tutor.fechaNaciTutor'=> 'required_without:idTutor|date',

            // Areas y categorías
            'areas'              => 'required|array|min:1',
            'areas.*.idArea'     => 'required|integer',
            'areas.*.tituloArea' => 'required|string',
            'areas.*.descArea'   => 'required|string',
            'areas.*.activo'     => 'required|boolean',
            'areas.*.idConvocatoria'=>'required|integer|exists:convocatoria,idConvocatoria',

            'categorias'            => 'required|array|min:1',
            'categorias.*.idCategoria'    => 'required|integer',
            'categorias.*.nombreCategoria'=> 'required|string',
            'categorias.*.descCategoria'  => 'nullable|string',
            'categorias.*.idArea'         => 'required|integer|exists:area,idArea',
            'categorias.*.maxPost'        => 'nullable|integer',
            'categorias.*.idConvocatoria' => 'required|integer|exists:convocatoria,idConvocatoria',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            // 1) Crear o asignar Tutor
            if (! $request->filled('idTutor') && $request->has('tutor')) {
                $tutorData = $request->input('tutor');
                $tutor = Tutor::create($tutorData);
                $idTutor = $tutor->idTutor;
            } else {
                $idTutor = $request->input('idTutor');
            }

            // 2) Colegio y Curso
            $colegioId = $this->buscarOCrearColegio($request->input('idColegio'));
            $cursoId   = $this->buscarOCrearCurso($request->input('idCurso'));

            // 3) Crear o actualizar Postulante
            $postulante = Postulante::firstOrCreate(
                [
                    'carnet'     => $request->input('carnet'),
                    'correoPost' => $request->input('correoPost')
                ],
                [
                    'nombrePost'    => $request->input('nombrePost'),
                    'apellidoPost'  => $request->input('apellidoPost'),
                    'fechaNaciPost' => $request->input('fechaNaciPost'),
                    'telefonoPost'  => $request->input('telefonoPost'),
                    'departamento'  => $request->input('departamento'),
                    'provincia'     => $request->input('provincia'),
                    'idTutor'       => $idTutor,
                    'idColegio'     => $colegioId,
                    'delegacion'    => $request->input('delegacion'),
                    'idCurso'       => $cursoId,
                ]
            );

            // 4) Áreas (tabla pivot convocatoria_area)
            foreach ($request->input('areas') as $area) {
                // 4.1) Actualiza/crea la definición del área (sin idConvocatoria)
                DB::table('area')->updateOrInsert(
                    ['idArea' => $area['idArea']],
                    [
                        'tituloArea' => $area['tituloArea'],
                        'descArea'   => $area['descArea'],
                        'habilitada' => $area['activo'],
                    ]
                );

                // 4.2) Enlaza esa área con la convocatoria en la tabla pivote
                DB::table('convocatoria_area')->updateOrInsert(
                    [
                        'idConvocatoria' => $area['idConvocatoria'],
                        'idArea'         => $area['idArea']
                    ],
                    [] // no hay campos extra en la pivote
                );
            }

            // 5) Categorías + Postulaciones
            $postulacionIds = [];
            foreach ($request->input('categorias') as $cat) {
                DB::table('categoria')->updateOrInsert(
                    ['idCategoria' => $cat['idCategoria']],
                    [
                        'nombreCategoria' => $cat['nombreCategoria'],
                        'descCategoria'   => $cat['descCategoria'] ?? null,
                        'idArea'          => $cat['idArea'],
                        'maxPost'         => $cat['maxPost'] ?? 0
                    ]
                );

                $postulacionIds[] = DB::table('postulacion')->insertGetId([
                    'idCategoria'    => $cat['idCategoria'],
                    'idPostulante'   => $postulante->idPostulante,
                    'idConvocatoria' => $cat['idConvocatoria'],
                ]);
            }

            // 6) Log de actividad
            activity()
                ->causedBy(Auth::user())
                ->performedOn($postulante)
                ->withProperties([
                    'postulacion_ids' => $postulacionIds,
                    'postulante'      => $postulante->toArray()
                ])
                ->log('postulante_inscrito');

            DB::commit();

            return response()->json([
                'message'        => 'Inscripción completada',
                'postulante'     => $postulante,
                'postulaciones'  => $postulacionIds
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al inscribir',
                'error'   => $e->getMessage()
            ], 500);
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
