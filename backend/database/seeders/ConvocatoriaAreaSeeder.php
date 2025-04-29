<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Convocatoria; 
use App\Models\Area; 
use Illuminate\Support\Facades\DB;

class ConvocatoriaAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $convocatoria1 = Convocatoria::where('tituloConvocatoria', 'Convocatoria Nacional 2023')->first();
        $convocatoria2 = Convocatoria::where('tituloConvocatoria', 'Convocatoria Nacional 2020')->first();
        $convocatoria3 = Convocatoria::where('tituloConvocatoria', 'Convocatoria Nacional 2021')->first();
        $convocatoria4 = Convocatoria::where('tituloConvocatoria', 'Convocatoria Nacional 2022')->first();
        $convocatoria5 = Convocatoria::where('tituloConvocatoria', 'Convocatoria Nacional 2024')->first();

        $areaMatematica = Area::where('tituloArea', 'Matematicas')->first();
        $areaQuimica = Area::where('tituloArea', 'Quimica')->first();
        $areaFisica = Area::where('tituloArea', 'Fisica')->first();
        $areaInformatica = Area::where('tituloArea', 'Informatica')->first();
        $areaRobotica = Area::where('tituloArea', 'Robotica')->first();
        $areaBiologia = Area::where('tituloArea', 'Biologia')->first();


        // Relacionar convocatoria 1 con Matemáticas y Química
        DB::table('convocatoria_area')->insert([
            ['idConvocatoria' => $convocatoria1->idConvocatoria, 'idArea' => $areaMatematica->idArea],
            ['idConvocatoria' => $convocatoria1->idConvocatoria, 'idArea' => $areaQuimica->idArea],
        ]);

        // Relacionar convocatoria 2 con Física
        DB::table('convocatoria_area')->insert([
            ['idConvocatoria' => $convocatoria2->idConvocatoria, 'idArea' => $areaFisica->idArea],
        ]);
        //convocatoria 3 con fisica e informatica
        DB::table('convocatoria_area')->insert([
            ['idConvocatoria' => $convocatoria3->idConvocatoria, 'idArea' => $areaFisica->idArea],
            ['idConvocatoria' => $convocatoria3->idConvocatoria, 'idArea' => $areaInformatica->idArea],
        ]);

        //convocatoria 4 con robotica y biologia
        DB::table('convocatoria_area')->insert([
            ['idConvocatoria' => $convocatoria4->idConvocatoria, 'idArea' => $areaRobotica->idArea],
            ['idConvocatoria' => $convocatoria4->idConvocatoria, 'idArea' => $areaBiologia->idArea],
        ]);

        //convocatoria 5 con quimica y fisica
        DB::table('convocatoria_area')->insert([
            ['idConvocatoria' => $convocatoria5->idConvocatoria, 'idArea' => $areaQuimica->idArea],
            ['idConvocatoria' => $convocatoria5->idConvocatoria, 'idArea' => $areaFisica->idArea],
        ]);
    }
}