<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Area; 
use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = [
           
            ['tituloArea' => 'Lenguaje', 'descArea' => 'Area lenguaje'],
            ['tituloArea' => 'Filosofia', 'descArea' => 'Area filosofia'],
        ];

        foreach ($areas as $area) {
            Area::create(array_merge($area, ['habilitada' => true]));
        }
    }
}
