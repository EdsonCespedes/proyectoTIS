<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

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
            if (in_array($area->tituloArea, ['Matemáticas', 'Física', 'Química', 'Biología'])) {
                for ($i = 1; $i <= 6; $i++) {
                    DB::table('categoria')->insert([
                        'nombreCategoria' => $i . 'P',
                        'descCategoria'   => 'Grado ' . $i . ' de Primaria',
                        'idArea'          => $area->idArea,
                    ]);
                }
                for ($i = 1; $i <= 6; $i++) {
                    DB::table('categoria')->insert([
                        'nombreCategoria' => $i . 'S',
                        'descCategoria'   => 'Grado ' . $i . ' de Secundaria',
                        'idArea'          => $area->idArea,
                    ]);
                }
            } elseif ($area->tituloArea === 'Informática') {
                DB::table('categoria')->insert([
                    'nombreCategoria' => 'Bufeo',
                    'descCategoria'   => 'Desde 1° Secundaria hasta 3° Secundaria',
                    'idArea'          => $area->idArea,
                ]);
            } elseif ($area->tituloArea === 'Robótica') {
                DB::table('categoria')->insert([
                    'nombreCategoria' => 'LEGO',
                    'descCategoria'   => 'Desde 3° Secundaria hasta 5° Secundaria',
                    'idArea'          => $area->idArea,
                ]);
            }
        }
    }
}