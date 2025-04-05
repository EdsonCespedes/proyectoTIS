<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Postulante;
use App\Models\Tutor;
use Illuminate\Support\Facades\DB;

class PostulanteController extends Controller
{
    
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombrePost'    => 'required|string|max:45',
            'apellidoPost'  => 'required|string|max:45',
            'carnet'        => 'required|string|max:45|unique:postulante,carnet',
            'fechaNaciPost' => 'required|date',
            'correoPost'    => 'required|email|max:45|unique:postulante,correoPost',
            'telefonoPost'  => 'nullable|string|max:45',
            'departamento'  => 'required|string|max:45',
            'provincia'     => 'required|string|max:45',
            'idColegio'     => 'required|string',
            'idCurso'       => 'required|string',
            'idTutor'       => 'nullable',
            'tutor.nombreTutor'   => 'required_without:idTutor|string|max:45',
            'tutor.apellidoTutor' => 'required_without:idTutor|string|max:45',
            'tutor.correoTutor'   => 'required_without:idTutor|email|max:45|unique:tutor,correoTutor',
            'tutor.telefonoTutor' => 'required_without:idTutor|string|max:45',
            'tutor.fechaNaciTutor'=> 'required_without:idTutor|date',
            'areas'         => 'required|array',
            'categorias'    => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            //Procesar Tutor
            if (empty($request->input('idTutor')) && $request->has('tutor')) {
                $tutorData = $request->input('tutor');
                $tutor = Tutor::create($tutorData);
                $idTutor = $tutor->idTutor;
            } else {
                $idTutor = $request->input('idTutor');
            }

            //Buscar o crear Colegio y Curso por nombre
            $colegioId = $this->buscarOCrearColegio($request->input('idColegio'));
            $cursoId = $this->buscarOCrearCurso($request->input('idCurso'));

            //Crear el registro de Postulante
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
                'idDelegacion'  => null,
                'idCurso'       => $cursoId,
            ];
            $postulante = Postulante::create($postulanteData);

            //Areas, categorías, y crear las postulaciones
            foreach ($request->input('areas') as $areaItem) {
                $area = DB::table('area')->where('idArea', $areaItem['idArea'])->first();
                if (!$area) {
                    DB::table('area')->insert([
                        'idArea' => $areaItem['idArea'],
                        'tituloArea' => $areaItem['tituloArea'],
                        'descArea' => $areaItem['descArea'],
                        'habilitada' => $areaItem['activo'],
                        'idConvocatoria' => $areaItem['idConvocatoria']
                    ]);
                }
            }

            foreach ($request->input('categorias') as $categoriaItem) {
                $categoria = DB::table('categoria')->where('idCategoria', $categoriaItem['idCategoria'])->first();
                if (!$categoria) {
                    DB::table('categoria')->insert([
                        'idCategoria' => $categoriaItem['idCategoria'],
                        'nombreCategoria' => $categoriaItem['nombreCategoria'],
                        'descCategoria' => $categoriaItem['descCategoria'],
                        'idArea' => $categoriaItem['idArea']
                    ]);
                }
                DB::table('postulacion')->insert([
                    'idCategoria'  => $categoriaItem['idCategoria'],
                    'idPostulante' => $postulante->idPostulante,
                ]);
            }

            DB::commit();
            return response()->json([
                'message'   => 'Registro completado correctamente',
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
        return DB::table('colegio')->insertGetId([
            'nombreColegio' => $nombre,
            'departamento' => 'Sin definir',
            'provincia' => 'Sin definir',
        ]);
    }

    private function buscarOCrearCurso($nombre)
    {
        $curso = DB::table('curso')->where('Curso', $nombre)->first();
        if ($curso) {
            return $curso->idCurso;
        }
        return DB::table('curso')->insertGetId([
            'Curso' => $nombre
        ]);
    }
}
