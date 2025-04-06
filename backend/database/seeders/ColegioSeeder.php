<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Colegio; // Importamos el modelo Colegio
use Illuminate\Support\Facades\DB;

class ColegioSeeder extends Seeder
{
    
    public function run(): void
    {

        // Insertar datos en la tabla "colegios"
        Colegio::firstOrcreate([
            'nombreColegio' => 'Nacional',
            'departamento' => 'Cochabamba',
            'provincia' => 'Cercado'
        ]);

        Colegio::firstOrcreate([
            'nombreColegio' => 'San Marcos',
            'departamento' => 'Cochabamba',
            'provincia' => 'Punata'
        ]);

        Colegio::firstOrcreate([
            'nombreColegio' => 'Santa Ana',
            'departamento' => 'Cochabamba',
            'provincia' => 'Cercado'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Carlos Medinaceli',
            'departamento' => 'Cochabamba',
            'provincia' => 'Cercado'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Bolivia',
            'departamento' => 'Cochabamba',
            'provincia' => 'Cercado'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Evo Morales',
            'departamento' => 'La Paz',
            'provincia' => 'Murillo'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Montessori',
            'departamento' => 'La Paz',
            'provincia' => 'Murillo'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Fe y Alegria',
            'departamento' => 'La Paz',
            'provincia' => 'Yunguyo'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'San Calixto',
            'departamento' => 'La Paz',
            'provincia' => 'Yunguyo'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Sagrados Corazones',
            'departamento' => 'La Paz',
            'provincia' => 'Yunguyo'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => '6 de Junio',
            'departamento' => 'Beni',
            'provincia' => 'San Joaquin'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Horacio Vasquez',
            'departamento' => 'Beni',
            'provincia' => 'San Joaquin'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Pedro Rivera',
            'departamento' => 'Tarija',
            'provincia' => 'Cercado'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'San Antonio',
            'departamento' => 'Tarija',
            'provincia' => 'Bermejo'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Juan Pablo II',
            'departamento' => 'Tarija',
            'provincia' => 'Villa Montes'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Gaston Gillaux',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Charagua'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Britanico Santa Cruz',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Charagua'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Domingo Savio',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Warnes'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Luis Espinal',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Ichilo'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'San Francisco',
            'departamento' => 'Oruro',
            'provincia' => 'Cercado'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'La Salle',
            'departamento' => 'Oruro',
            'provincia' => 'Mamore'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Bethania',
            'departamento' => 'Oruro',
            'provincia' => 'Marban'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Anglo Americano',
            'departamento' => 'Oruro',
            'provincia' => 'Yacuma'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Santa Luisa',
            'departamento' => 'Potosi',
            'provincia' => 'Charcas'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Fe y Alegria',
            'departamento' => 'Potosi',
            'provincia' => 'Chayanta'
        ]);
    }
}
