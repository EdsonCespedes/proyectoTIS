<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categoria')->insert([
            [
                'nombreCategoria' => '1 primaria',
                'descCategoria'   => 'Categoría de primero de pri',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '2 primaria',
                'descCategoria'   => 'Categoría de segundo de pri',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '3 primaria',
                'descCategoria'   => 'Categoría de tercero de pri',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '4 primaria',
                'descCategoria'   => 'Categoría de cuarto de pri',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '5 primaria',
                'descCategoria'   => 'Categoría de quinto de pri',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '6 primaria',
                'descCategoria'   => 'Categoría de sexto de pri',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '1 secundaria',
                'descCategoria'   => 'Categoría de primero de sec',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '2 secundaria',
                'descCategoria'   => 'Categoría de segundo de sec',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '3 secundaria',
                'descCategoria'   => 'Categoría de tercero de sec',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '4 secundaria',
                'descCategoria'   => 'Categoría de cuarto de sec',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '5 secundaria',
                'descCategoria'   => 'Categoría de quinto de sec',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => '6 secundaria',
                'descCategoria'   => 'Categoría de sexto de sec',
                'idArea'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => 'Lego',
                'descCategoria'   => 'Categoría 1 de robotica',
                'idArea'          => 2,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => 'Lego 2',
                'descCategoria'   => 'Categoría 2 de robotica',
                'idArea'          => 2,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => 'Progra 1',
                'descCategoria'   => 'Categoría 1 de informática',
                'idArea'          => 2,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'nombreCategoria' => 'Progra 2',
                'descCategoria'   => 'Categoría 2 de informática',
                'idArea'          => 2,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ]);
    }
}
