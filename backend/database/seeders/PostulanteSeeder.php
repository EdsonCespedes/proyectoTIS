<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB; 

use Carbon\Carbon;

class PostulanteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('postulante')->insert([
            [
                'nombrePost'    => 'Luis',
                'apellidoPost'  => 'Martinez',
                'carnet'        => 'LM123456',
                'fechaNaciPost' => '2000-05-15',
                'correoPost'    => 'luis.martinez@example.com',
                'telefonoPost'  => '123456789',
                'departamento'  => 'Cochabamba',
                'provincia'     => 'Cercado',
                'idTutor'       => 1,
                'idColegio'     => 1,
                'delegacion'  => 'delegacion 1',  
                'idCurso'       => 1,
            ],
            [
                'nombrePost'    => 'Ana',
                'apellidoPost'  => 'Garcia',
                'carnet'        => 'AG654321',
                'fechaNaciPost' => '2001-08-20',
                'correoPost'    => 'ana.garcia@example.com',
                'telefonoPost'  => '987654321',
                'departamento'  => 'Cochabamba',
                'provincia'     => 'Cercado',
                'idTutor'       => 2, 
                'idColegio'     => 2,  
                'delegacion'  => 'delegacion 2', 
                'idCurso'       => 7, 
            ],
        ]);
    }
}
