<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tutores = [
            ['nombreTutor' => 'Carlos', 'apellidoTutor' => 'Gómez', 'correoTutor' => 'carlos@gmail.com', 'telefonoTutor' => '12345678', 'fechaNaciTutor' => '1980-05-10'],
            ['nombreTutor' => 'María', 'apellidoTutor' => 'López', 'correoTutor' => 'maria@gmail.com', 'telefonoTutor' => '87654321', 'fechaNaciTutor' => '1985-08-15'],
        ];
        foreach ($tutores as $tutor) {
            DB::table('tutor')->insert(array_merge($tutor, [
                'fechaNaciTutor' => $tutor['fechaNaciTutor'],
            ]));
        }
    }
}
