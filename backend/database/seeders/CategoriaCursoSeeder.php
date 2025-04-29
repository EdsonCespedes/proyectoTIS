<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


use App\Models\Categoria;
use App\Models\Area;

use App\Models\Curso;
use App\Models\Convocatoria;

class CategoriaCursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $curso1 = Curso::firstOrCreate(['Curso' => '1° Primaria']);
        $curso2 = Curso::firstOrCreate(['Curso' => '2° Primaria']);
        $curso3 = Curso::firstOrCreate(['Curso' => '3° Primaria']);
        $curso4 = Curso::firstOrCreate(['Curso' => '1° Secundaria']);
        $curso5 = Curso::firstOrCreate(['Curso' => '2° Secundaria']);
        $curso6 = Curso::firstOrCreate(['Curso' => '3° Secundaria']);


        // Supongamos que estas categorías ya fueron creadas en otro seeder
        $categoria1 = Categoria::where('nombreCategoria', 'Primaria 1° a 3°')->first();
        $categoria2 = Categoria::where('nombreCategoria', 'Secundaria 1° a 3°')->first();
        $categoria3 = Categoria::where('nombreCategoria', 'Laboratorio Básico')->first();
        $categoria4 = Categoria::where('nombreCategoria', 'Laboratorio Fisico')->first();
        $categoria5 = Categoria::where('nombreCategoria', 'Laboratorio Informatico')->first();
        $categoria6 = Categoria::where('nombreCategoria', 'Laboratorio Robotica')->first();
        $categoria7 = Categoria::where('nombreCategoria', 'Laboratorio Biologia')->first();

        // Asignar cursos a categoría 1 (Primaria 1° a 3°)
        DB::table('categoria_curso')->insert([
            ['idCategoria' => $categoria1->idCategoria, 'idCurso' => $curso1->idCurso],
            ['idCategoria' => $categoria1->idCategoria, 'idCurso' => $curso2->idCurso],
            ['idCategoria' => $categoria1->idCategoria, 'idCurso' => $curso3->idCurso],
        ]);

        // Asignar cursos a categoría 2 (Secundaria 1° a 3°)
        DB::table('categoria_curso')->insert([
            ['idCategoria' => $categoria2->idCategoria, 'idCurso' => $curso4->idCurso],
            ['idCategoria' => $categoria2->idCategoria, 'idCurso' => $curso5->idCurso],
            ['idCategoria' => $categoria2->idCategoria, 'idCurso' => $curso6->idCurso],
        ]);

        // Asignar un curso a la categoría 3 (Laboratorio Básico)
        DB::table('categoria_curso')->insert([
            ['idCategoria' => $categoria3->idCategoria, 'idCurso' => $curso1->idCurso],
           
            ['idCategoria' => $categoria3->idCategoria, 'idCurso' => $curso5->idCurso],
            ['idCategoria' => $categoria3->idCategoria, 'idCurso' => $curso6->idCurso],
        ]);


        DB::table('categoria_curso')->insert([
            ['idCategoria' => $categoria4->idCategoria, 'idCurso' => $curso3->idCurso],
           
            ['idCategoria' => $categoria4->idCategoria, 'idCurso' => $curso4->idCurso],
            
        ]);

        DB::table('categoria_curso')->insert([
            ['idCategoria' => $categoria5->idCategoria, 'idCurso' => $curso3->idCurso],
           
            ['idCategoria' => $categoria5->idCategoria, 'idCurso' => $curso1->idCurso],
            
        ]);

        DB::table('categoria_curso')->insert([
            ['idCategoria' => $categoria6->idCategoria, 'idCurso' => $curso2->idCurso],
           
            ['idCategoria' => $categoria6->idCategoria, 'idCurso' => $curso4->idCurso],
            
        ]);

        DB::table('categoria_curso')->insert([
            ['idCategoria' => $categoria7->idCategoria, 'idCurso' => $curso1->idCurso],
            
            ['idCategoria' => $categoria7->idCategoria, 'idCurso' => $curso4->idCurso],
            
        ]);
    }
}
