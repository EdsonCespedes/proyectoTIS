<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

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
                'nombrePost'     => 'Luis',
                'apellidoPost'   => 'Martínez',
                'carnet'         => 'A123456',
                'fechaNacPost'   => Carbon::create(2000, 1, 1, 0, 0, 0),
                'correoPost'     => 'luis.martinez@example.com',
                'telefonoPost'   => '111222333',
                'departamento'   => 'Lima',
                'provincia'      => 'Lima',
                'curso'          => '10',
                'idColegio'      => 1,  // Colegio San Pedro
                'idDelegacion'   => 1,  // Delegación Lima Centro
                'idTutor'        => 1,  // Tutor Carlos Gómez
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ],
            [
                'nombrePost'     => 'Ana',
                'apellidoPost'   => 'García',
                'carnet'         => 'B654321',
                'fechaNacPost'   => Carbon::create(2001, 2, 2, 0, 0, 0),
                'correoPost'     => 'ana.garcia@gmail.com',
                'telefonoPost'   => '444555666',
                'departamento'   => 'Cbba',
                'provincia'      => 'Cbba',
                'curso'          => '11',
                'idColegio'      => 2,
                'idDelegacion'   => 2,
                'idTutor'        => 2,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ],
        ]);
    }
}
