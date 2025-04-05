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
                'idColegio' => 1,
                'nombreDelegacion' => 'Delegación Norte'
            ],
            [
                'idColegio' => 2,
                'nombreDelegacion' => 'Delegación Sur'
            ]
        ]);
    }
}
