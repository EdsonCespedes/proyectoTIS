<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('area')->insert([
            [
                'tituloArea'     => 'Matemáticas',
                'descArea'       => 'Área de matemáticas avanzadas',
                'activo'         => true,
                'idConvocatoria' => 1,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'tituloArea'     => 'Ciencias',
                'descArea'       => 'Área de ciencias naturales',
                'activo'         => true,
                'idConvocatoria' => 1,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
        ]);
    }
}
