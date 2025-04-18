<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DepartamentoSeeder::class,
            ProvinciaSeeder::class,
            ColegioSeeder::class,
            CursoSeeder::class,
            ConvocatoriaSeeder::class,
            AreaSeeder::class,
            CategoriaSeeder::class,
            //ConvocatoriaAreaSeeder::class,
            CategoriaCursoSeeder::class,
            //AreaCategoriaSeeder::class,
            TutorSeeder::class,
            //DelegacionSeeder::class,
            PostulanteSeeder::class,
            PostulacionSeeder::class
        ]);
    }
}
