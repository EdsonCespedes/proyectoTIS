<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = [
            'Matematicas', 'Fisica', 'Quimica', 'Biologia', 'Informatica', 'Robotica'
        ];

        $idConvocatoria = 2;

        foreach ($areas as $area) {
            DB::table('area')->insert([
                'tituloArea'     => $area,
                'descArea'       => 'Area de ' . strtolower($area),
                'habilitada'     => true,
                'idConvocatoria' => $idConvocatoria,
            ]);
        }
    }
}
