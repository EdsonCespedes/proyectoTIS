<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConvocatoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('convocatorias')->insert([
            'fechaPublicacion'   => now(),
            'fechaInicioInsc'    => now()->addDay(),
            'fechaFinInsc'       => now()->addDays(7),
            'portada'            => 'portada.jpg',
            'activo'             => true,
            'fechaInicioOlimp'   => now()->addDays(10),
            'fechaFinOlimp'      => now()->addDays(20),
            'maximoPostPorArea'  => 5,
            'created_at'         => now(),
            'updated_at'         => now(),
        ]);
    }
}
