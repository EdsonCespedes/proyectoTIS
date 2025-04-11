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
        foreach ($areas as $area) {
            DB::table('convocatoria_area')->insert([
                'idConvocatoria' => $area->idConvocatoria,
                'idArea'         => $area->idArea,
            ]);
        }
    }
}