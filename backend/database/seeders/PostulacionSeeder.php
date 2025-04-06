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
        $categoria1P = DB::table('categoria')->where('nombreCategoria', '1P')->first();
        $categoria1S = DB::table('categoria')->where('nombreCategoria', '1S')->first();

        DB::table('postulacion')->insert([
            [
                'idCategoria'  => $categoria1P ? $categoria1P->idCategoria : 1,
                'idPostulante' => 1,
            ],
            [
                'idCategoria'  => $categoria1S ? $categoria1S->idCategoria : 1,
                'idPostulante' => 2,
            ],
        ]);
    }
}
