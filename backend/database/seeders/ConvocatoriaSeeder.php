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
        DB::table('convocatoria')->insert([
            [
                'titulo' => 'conv1',
                'descripcion'  => 'descripcion 1',
                'fechaPublicacion' => '2022-01-01',
                'fechaInicioInsc'  => '2022-01-05',
                'fechaFinInsc'     => '2022-01-20',
                'portada'          => 'pasada.jpg',
                'habilitada'       => false,
                'fechaInicioOlimp' => '2022-02-01',
                'fechaFinOlimp'    => '2022-02-10',
            ],
            [
                'titulo' => 'conv2',
                'descripcion'  => 'descripcion 2',
                'fechaPublicacion' => Carbon::now()->subDays(10)->toDateString(),
                'fechaInicioInsc'  => Carbon::now()->subDays(5)->toDateString(),
                'fechaFinInsc'     => Carbon::now()->addDays(5)->toDateString(),
                'portada'          => 'en_curso.jpg',
                'habilitada'       => true,
                'fechaInicioOlimp' => Carbon::now()->addDays(10)->toDateString(),
                'fechaFinOlimp'    => Carbon::now()->addDays(20)->toDateString(),
            ],
             [
                'titulo' => 'conv3',
                'descripcion'  => 'descripcion 3',
                'fechaPublicacion' => Carbon::now()->addDays(30)->toDateString(),
                'fechaInicioInsc'  => Carbon::now()->addDays(35)->toDateString(),
                'fechaFinInsc'     => Carbon::now()->addDays(45)->toDateString(),
                'portada'          => 'futura.jpg',
                'habilitada'       => true,
                'fechaInicioOlimp' => Carbon::now()->addDays(50)->toDateString(),
                'fechaFinOlimp'    => Carbon::now()->addDays(60)->toDateString(),
            ],

        ]);
    }
}
