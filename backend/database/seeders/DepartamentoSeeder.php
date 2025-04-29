<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class DepartamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departamentos = [
            'La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí',
            'Chuquisaca', 'Tarija', 'Beni', 'Pando'
        ];

        foreach ($departamentos as $nombre) {
            DB::table('departamento')->insert([
                'nombreDepartamento' => $nombre,
            ]);
        }
    }
}