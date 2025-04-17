<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaCursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categorias = DB::table('categoria')->get();
        $cursos = DB::table('curso')->get();

        foreach ($categorias as $categoria) {
            foreach ($cursos as $curso) {
                DB::table('categoria_curso')->insert([
                    'idCategoria' => $categoria->idCategoria,
                    'idCurso'     => $curso->idCurso,
                ]);
            }
        }
    }
}
