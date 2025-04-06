<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cursos = [
            '1° Primaria', '2° Primaria', '3° Primaria', '4° Primaria', '5° Primaria', '6° Primaria',
            '1° Secundaria', '2° Secundaria', '3° Secundaria', '4° Secundaria', '5° Secundaria', '6° Secundaria',
        ];

        foreach ($cursos as $curso) {
            DB::table('curso')->insert([
                'Curso' => $curso,
            ]);
        }
    }
}
