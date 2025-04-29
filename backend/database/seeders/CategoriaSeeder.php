<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Area;

use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areaMatematicas = Area::firstOrCreate(
            ['tituloArea' => 'Matematicas'],
            ['descArea' => 'Area de Matemáticas', 'habilitada' => true]
        );

        $areaQuimica = Area::firstOrCreate(
            ['tituloArea' => 'Quimica'],
            ['descArea' => 'Area de Química', 'habilitada' => true]
        );

        $areaFisica = Area::firstOrCreate(
            ['tituloArea' => 'Fisica'],
            ['descArea' => 'Area de Fisica', 'habilitada' => true]
        );

        $areaInformatica = Area::firstOrCreate(
            ['tituloArea' => 'Informatica'],
            ['descArea' => 'Area de Informatica', 'habilitada' => true]
        );
        $areaRobotica = Area::firstOrCreate(
            ['tituloArea' => 'Robotica'],
            ['descArea' => 'Area de Robotica', 'habilitada' => true]
        );
        $areaBiologia = Area::firstOrCreate(
            ['tituloArea' => 'Biologia'],
            ['descArea' => 'Area de Biologia', 'habilitada' => true]
        );
           



        // Categorías para Matemáticas
        $categoriasMatematicas = [
            [
                'nombreCategoria' => 'Primaria 1° a 3°',
                'descCategoria' => '1° Primaria, 2° Primaria, 3° Primaria',
                'habilitada' => true,
                'maxPost' => 5,
                'montoCate' => 25,
                'idArea' => $areaMatematicas->idArea,
                //
                'idConvocatoria' => 1,
            ],
            [
                'nombreCategoria' => 'Secundaria 1° a 3°',
                'descCategoria' => '1° Secundaria, 2° Secundaria, 3° Secundaria',
                'habilitada' => true,
                'maxPost' => 10,
                'montoCate' => 25,
                'idArea' => $areaMatematicas->idArea,
                //
                'idConvocatoria' => 1,
            ]
        ];

        // Categoría para Química
        $categoriasQuimica = [
            [
                'nombreCategoria' => 'Laboratorio Básico',
                'descCategoria' => '1° Secundaria, 2° Primaria, 3° Primaria',
                'habilitada' => true,
                'maxPost' => 3,
                'montoCate' => 25,
                'idArea' => $areaQuimica->idArea,
                //
                'idConvocatoria' => 1,
            ],
            [
                'nombreCategoria' => 'Laboratorio Básico',
                'descCategoria' => '1° Secundaria, 2° Primaria, 3° Primaria',
                'habilitada' => true,
                'maxPost' => 3,
                'montoCate' => 25,
                'idArea' => $areaQuimica->idArea,
                //
                'idConvocatoria' => 5,
            ]
        ];

        $categoriasFisica = [
            [
                'nombreCategoria' => 'Laboratorio Fisico',
                'descCategoria' => '1° Secundaria, 3° Primaria',
                'habilitada' => true,
                'maxPost' => 4,
                'montoCate' => 25,
                'idArea' => $areaFisica->idArea,
                //
                'idConvocatoria' => 2,
            ],[
                'nombreCategoria' => 'Laboratorio Fisico Sec',
                'descCategoria' => '3° Secundaria, 6° Primaria',
                'habilitada' => true,
                'maxPost' => 4,
                'montoCate' => 25,
                'idArea' => $areaFisica->idArea,
                //
                'idConvocatoria' => 3,
            ],[
                'nombreCategoria' => 'Laboratorio Fisico Final',
                'descCategoria' => '6° Secundaria',
                'habilitada' => true,
                'maxPost' => 4,
                'montoCate' => 25,
                'idArea' => $areaFisica->idArea,
                //
                'idConvocatoria' => 5,
            ]
        ];

        $categoriasInformatica = [
            [
                'nombreCategoria' => 'Laboratorio Informatico',
                'descCategoria' => '1° Primaria, 3° Primaria',
                'habilitada' => true,
                'maxPost' => 2,
                'montoCate' => 25,
                'idArea' => $areaInformatica->idArea,
                //
                'idConvocatoria' => 3,
            ]
        ];

        $categoriasRobotica = [
            [
                'nombreCategoria' => 'Laboratorio Robotica',
                'descCategoria' => '1° Secundaria, 2° Primaria',
                'habilitada' => true,
                'maxPost' => 4,
                'montoCate' => 25,
                'idArea' => $areaRobotica->idArea,
                //
                'idConvocatoria' => 4,
            ]
        ];
    
       
        $categoriasBiologia = [
            [
                'nombreCategoria' => 'Laboratorio Biología',
                'descCategoria' => '1° Secundaria, 1° Primaria',
                'habilitada' => true,
                'maxPost' => 3,
                'montoCate' => 25,
                'idArea' => $areaBiologia->idArea,
                //
                'idConvocatoria' => 4,
            ]
        ];



        // Insertar categorías de Matemáticas
        foreach ($categoriasMatematicas as $categoria) {
            Categoria::create($categoria);
        }

        // Insertar categorías de Química
        foreach ($categoriasQuimica as $categoria) {
            Categoria::create($categoria);
        }

        foreach ($categoriasFisica as $categoria) {
            Categoria::create($categoria);
        }

        foreach ($categoriasInformatica as $categoria) {
            Categoria::create($categoria);
        }

        foreach ($categoriasRobotica as $categoria) {
            Categoria::create($categoria);
        }

        foreach ($categoriasBiologia as $categoria) {
            Categoria::create($categoria);
        }
    }
}
