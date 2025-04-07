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
        // Obtener todas las categorías y cursos
        $categorias = DB::table('categoria')->get();
        $cursos = DB::table('curso')->get();

        foreach ($categorias as $categoria) {
            foreach ($cursos as $curso) {
                // Aquí puedes personalizar las relaciones entre cursos y categorías
                DB::table('categoria_curso')->insert([
                    'idCategoria' => $categoria->idCategoria,
                    'idCurso'     => $curso->idCurso,
                ]);
            }
        }
    }
}
