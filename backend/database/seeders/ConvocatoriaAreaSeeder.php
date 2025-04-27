<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class ConvocatoriaAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = DB::table('area')->get();
        $convocatorias = DB::table('convocatoria')->get();
        foreach ($convocatorias as $convocatoria) {
            foreach ($areas as $area) {
                DB::table('convocatoria_area')->insert([
                    'idConvocatoria' => $convocatoria->idConvocatoria,
                    'idArea'         => $area->idArea,
                ]);
            }
        }
    }
}