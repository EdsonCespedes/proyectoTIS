<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DelegacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('delegacion')->insert([
            [
                'nombreDelegacion' => 'Delegación Bolivar',
                'idColegio'        => 1,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'nombreDelegacion' => 'Delegación La Salle',
                'idColegio'        => 2,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
        ]);
    }
}
