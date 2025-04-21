<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use App\Models\Convocatoria;

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
        Convocatoria::create([
            'tituloConvocatoria' => 'Convocatoria Nacional 2023',
            'descripcion' => 'Convocatoria para estudiantes de secundaria y primaria.',
            'fechaPublicacion' => '2023-04-15 10:00:00',
            'fechaInicioInsc' => '2023-05-01 00:00:00',
            'fechaFinInsc' => '2023-05-15 23:59:59',
            'portada' => 'portada2025.jpg',
            'habilitada' => true,
            'fechaInicioOlimp' => '2023-06-01 00:00:00',
            'fechaFinOlimp' => '2023-06-10 23:59:59',
            'maximoPostPorArea' => 3,
        ]);

        Convocatoria::create([
            'tituloConvocatoria' => 'Convocatoria Nacional 2020',
            'descripcion' => 'Convocatoria para estudiantes de primaria.',
            'fechaPublicacion' => '2020-02-15 10:00:00',
            'fechaInicioInsc' => '2020-03-01 00:00:00',
            'fechaFinInsc' => '2020-03-15 23:59:59',
            'portada' => 'portada2020.jpg',
            'habilitada' => true,
            'fechaInicioOlimp' => '2020-06-01 00:00:00',
            'fechaFinOlimp' => '2020-06-10 23:59:59',
            'maximoPostPorArea' => 1,
        ]);

        Convocatoria::create([
            'tituloConvocatoria' => 'Convocatoria Nacional 2021',
            'descripcion' => 'Convocatoria para estudiantes de secundaria y primaria.',
            'fechaPublicacion' => '2021-04-15 10:00:00',
            'fechaInicioInsc' => '2021-05-01 00:00:00',
            'fechaFinInsc' => '2021-05-15 23:59:59',
            'portada' => 'portada2021.jpg',
            'habilitada' => true,
            'fechaInicioOlimp' => '2021-06-01 00:00:00',
            'fechaFinOlimp' => '2021-06-10 23:59:59',
            'maximoPostPorArea' => 2,
        ]);

        Convocatoria::create([
            'tituloConvocatoria' => 'Convocatoria Nacional 2022',
            'descripcion' => 'Convocatoria para estudiantes de secundaria y primaria.',
            'fechaPublicacion' => '2022-04-15 10:00:00',
            'fechaInicioInsc' => '2022-05-01 00:00:00',
            'fechaFinInsc' => '2022-05-15 23:59:59',
            'portada' => 'portada2022.jpg',
            'habilitada' => true,
            'fechaInicioOlimp' => '2022-06-01 00:00:00',
            'fechaFinOlimp' => '2022-06-10 23:59:59',
            'maximoPostPorArea' => 2,
        ]);
        Convocatoria::create([
            'tituloConvocatoria' => 'Convocatoria Nacional 2024',
            'descripcion' => 'Convocatoria para estudiantes de secundaria y primaria.',
            'fechaPublicacion' => '2024-04-15 10:00:00',
            'fechaInicioInsc' => '2024-05-01 00:00:00',
            'fechaFinInsc' => '2024-05-15 23:59:59',
            'portada' => 'portada2024.jpg',
            'habilitada' => true,
            'fechaInicioOlimp' => '2024-06-01 00:00:00',
            'fechaFinOlimp' => '2024-06-10 23:59:59',
            'maximoPostPorArea' => 2,
        ]);
    }
}
