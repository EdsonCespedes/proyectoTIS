<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            ConvocatoriaSeeder::class,
            ColegioSeeder::class,
            DelegacionSeeder::class,
            TutorSeeder::class,
            AreaSeeder::class,
            PostulanteSeeder::class,
            PostulacionSeeder::class,
            CategoriaSeeder::class,
        ]);
    }
}
