<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class AreaCategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categorias = DB::table('categoria')->get();
        foreach ($categorias as $categoria) {
            DB::table('area_categoria')->insert([
                'idArea'       => $categoria->idArea,
                'idCategoria'  => $categoria->idCategoria,
            ]);
        }
    }
}
