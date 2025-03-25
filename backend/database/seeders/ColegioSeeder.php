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
        DB::table('colegio')->insert([
            [
                'nombreColegio' => 'Colegio La Salle',
                'departamento'  => 'Cbba',
                'provincia'     => 'Cbba',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'nombreColegio' => 'Colegio Bolivar',
                'departamento'  => 'Cbba',
                'provincia'     => 'Cbba',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ]);
    }
}
