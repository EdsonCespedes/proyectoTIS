<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = DB::table('area')->get();

        foreach ($areas as $area) {

            if (in_array($area->tituloArea, ['Matematicas', 'Fisica', 'Quimica', 'Biologia'])) {
                for ($i = 1; $i <= 6; $i++) {
                    $data = [
                        'nombreCategoria' => $i . 'P',
                        'descCategoria'   => 'Grado ' . $i . ' de Primaria',
                        'idArea'          => $area->idArea,
                        'maxPost'          => 20,
                        'idConvocatoria'   => 1
                    ];
                    DB::table('categoria')->insert($data);
                }
                for ($i = 1; $i <= 6; $i++) {
                    $data = [
                        'nombreCategoria' => $i . 'S',
                        'descCategoria'   => 'Grado ' . $i . ' de Secundaria',
                        'idArea'          => $area->idArea,
                        'maxPost'          => 20,
                        'idConvocatoria'   => 2
                    ];
                    DB::table('categoria')->insert($data);
                }
            } elseif ($area->tituloArea === 'Informática') {
                $data = [
                    'nombreCategoria' => 'Bufeo',
                    'descCategoria'   => 'Desde 1° Secundaria hasta 3° Secundaria',
                    'idArea'          => $area->idArea,
                    'maxPost'          => 20,
                    'idConvocatoria'   => 3
                ];
                DB::table('categoria')->insert($data);
            } elseif ($area->tituloArea === 'Robótica') {
                $data = [
                    'nombreCategoria' => 'LEGO',
                    'descCategoria'   => 'Desde 3° Secundaria hasta 5° Secundaria',
                    'idArea'          => $area->idArea,
                    'maxPost'          => 20,
                    'idConvocatoria'   => 1
                ];
                DB::table('categoria')->insert($data);
            }
        }
    }
}
