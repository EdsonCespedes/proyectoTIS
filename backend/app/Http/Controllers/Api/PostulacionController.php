<?php

namespace App\Http\Controllers\Api;

use App\Models\Tutor;
use App\Models\Postulante;
use App\Models\Postulacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PostulacionController extends Controller
{
    public function registrar(Request $request)
    {
        $data = $request->all();

        DB::beginTransaction();

        try {
            //Crear o reutiliza tutor
            $tutor = Tutor::create([
                'nombreTutor' => 'Por definir',
                'apellidoTutor' => 'Por definir',
                'correoTutor' => 'por@definir.com',
                'telefonoTutor' => '00000000',
                'fechaNaciTutor' => '1990-01-01'
            ]);

            //Crear postulante
            $postulante = Postulante::create([
                'nombrePost'     => $data['nombrePost'],
                'apellidoPost'   => $data['apellidoPost'],
                'carnet'         => $data['carnet'],
                'fechaNaciPost'  => $data['fechaNaciPost'],
                'correoPost'     => $data['correoPost'],
                'telefonoPost'   => $data['telefonoPost'] ?? '00000000',
                'departamento'   => $data['departamento'],
                'provincia'      => $data['provincia'],
                'idTutor'        => $tutor->idTutor,
                'idColegio'      => $this->buscarOCrearColegio($data['idColegio']),
                'idCurso'        => $this->buscarOCrearCurso($data['idCurso']),
            ]);

            //Registrar postulaciones (categorías)
            foreach ($data['categorias'] as $categoria) {
                Postulacion::create([
                    'idCategoria' => $categoria['idCategoria'],
                    'idPostulante' => $postulante->idPostulante
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Postulante registrado correctamente.'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function buscarOCrearColegio($nombre)
    {
        return DB::table('colegio')->firstOrCreate(['nombreColegio' => $nombre])->idColegio;
    }

    private function buscarOCrearCurso($nombre)
    {
        return DB::table('curso')->firstOrCreate(['nombreCurso' => $nombre])->idCurso;
    }
}
