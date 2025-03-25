<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostulacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('postulacion')->insert([
            [
                'idArea'        => 1,
                'idPostulante'  => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'idArea'        => 2,
                'idPostulante'  => 2,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ]);
    }
}
