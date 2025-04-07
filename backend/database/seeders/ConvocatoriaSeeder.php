<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class ConvocatoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
<<<<<<< HEAD
        DB::table('convocatoria')->insert([
            [
                'fechaPublicacion' => '2022-01-01',
                'fechaInicioInsc'  => '2022-01-05',
                'fechaFinInsc'     => '2022-01-20',
                'portada'          => 'pasada.jpg',
                'habilitada'       => false,
                'fechaInicioOlimp' => '2022-02-01',
                'fechaFinOlimp'    => '2022-02-10',
            ],
            [
                'fechaPublicacion' => Carbon::now()->subDays(10)->toDateString(),
                'fechaInicioInsc'  => Carbon::now()->subDays(5)->toDateString(),
                'fechaFinInsc'     => Carbon::now()->addDays(5)->toDateString(),
                'portada'          => 'en_curso.jpg',
                'habilitada'       => true,
                'fechaInicioOlimp' => Carbon::now()->addDays(10)->toDateString(),
                'fechaFinOlimp'    => Carbon::now()->addDays(20)->toDateString(),
            ],
             [
                'fechaPublicacion' => Carbon::now()->addDays(30)->toDateString(),
                'fechaInicioInsc'  => Carbon::now()->addDays(35)->toDateString(),
                'fechaFinInsc'     => Carbon::now()->addDays(45)->toDateString(),
                'portada'          => 'futura.jpg',
                'habilitada'       => true,
                'fechaInicioOlimp' => Carbon::now()->addDays(50)->toDateString(),
                'fechaFinOlimp'    => Carbon::now()->addDays(60)->toDateString(),
            ],
=======
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
>>>>>>> 53f3711036b4b2a07e9cd7a620c7ba83fab1a1b1
        ]);
    }
}
