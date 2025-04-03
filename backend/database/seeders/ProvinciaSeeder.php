<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class ProvinciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $provincias = [
            'La Paz'      => ['Murillo', 'Ingavi', 'Pacajes'],
            'Cochabamba'  => ['Cercado', 'Quillacollo', 'Chapare'],
            'Santa Cruz'  => ['Andrés Ibáñez', 'Warnes', 'Obispo Santistevan'],
            'Oruro'       => ['Cercado', 'El Choro', 'Carangas'],
            'Potosí'      => ['Tomás Frías', 'Chayanta', 'Nor Chichas'],
            'Chuquisaca'  => ['Oropeza', 'Zudáñez', 'Tomina'],
            'Tarija'      => ['Gran Chaco', 'Aniceto Arce', 'Yacuiba'],
            'Beni'        => ['Moxos', 'Vaca Díez', 'General José Ballivián'],
            'Pando'       => ['Abuná', 'Manuripi', 'Nicolás Suárez'],
        ];

        foreach ($provincias as $departamento => $lista) {
            $idDepto = DB::table('departamento')
                ->where('nombreDepartamento', $departamento)
                ->value('idDepartamento');

            foreach ($lista as $provincia) {
                DB::table('provincia')->insert([
                    'nombreProvincia' => $provincia,
                    'idDepartamento'  => $idDepto,
                ]);
            }
        }
    }
}
