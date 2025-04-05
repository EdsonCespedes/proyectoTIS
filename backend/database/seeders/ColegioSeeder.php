<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class ColegioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colegios = [
            'Colegio Bolivar',
            'Colegio San Ignacio',
            'Colegio Nuestra Señora de la Merced',
            'Colegio Los Andes',
            'Colegio Alemán',
            'Colegio Sucre',
            'Colegio San Carlos',
            'Colegio Cumbres',
            'Colegio Santa Cruz',
            'Colegio San Francisco',
        ];

        foreach ($colegios as $nombre) {
            DB::table('colegio')->insert([
                'nombreColegio' => $nombre,
                'departamento'  => 'Cochabamba',
                'provincia'     => 'Cercado',
            ]);
        }
    }
}
