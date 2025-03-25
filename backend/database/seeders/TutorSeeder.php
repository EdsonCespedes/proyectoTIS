<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tutor')->insert([
            [
                'nombreTutor'   => 'Carlos',
                'apellidoTutor' => 'Gómez',
                'correoTutor'   => 'carlos.gomez@gmail.com',
                'telefonoTutor' => '73456789',
                'fechaNacTutor' => Carbon::create(1980, 5, 10, 0, 0, 0),
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'nombreTutor'   => 'María',
                'apellidoTutor' => 'López',
                'correoTutor'   => 'maria.lopez@gmail.com',
                'telefonoTutor' => '67654321',
                'fechaNacTutor' => Carbon::create(1985, 8, 15, 0, 0, 0),
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
        ]);
    }
}
