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
            'provincia' => 'Cercado',
            'RUE' => '123456',
            'direccion' => 'Av. Heroínas 123',
            'fecha_creacion' => '2000-01-25'
        ]);

        Colegio::firstOrcreate([
            'nombreColegio' => 'San Marcos',
            'departamento' => 'Cochabamba',
            'provincia' => 'Punata',
            'RUE' => '654321',
            'direccion' => 'Calle Ayacucho 456',
            'fecha_creacion' => '2001-03-15'
        ]);

        Colegio::firstOrcreate([
            'nombreColegio' => 'Santa Ana',
            'departamento' => 'Cochabamba',
            'provincia' => 'Cercado',
            'RUE' => '789012',
            'direccion' => 'Calle Sucre 789',
            'fecha_creacion' => '1990-05-10'

        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Carlos Medinaceli',
            'departamento' => 'Cochabamba',
            'provincia' => 'Cercado',
            'RUE' => '345678',
            'direccion' => 'Calle Aroma 321',
            'fecha_creacion' => '1995-07-20'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Bolivia',
            'departamento' => 'Cochabamba',
            'provincia' => 'Cercado',
            'RUE' => '987654',
            'direccion' => 'Calle Libertad 654',
            'fecha_creacion' => '1998-09-30'

        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Evo Morales',
            'departamento' => 'La Paz',
            'provincia' => 'Murillo',
            'RUE' => '456789',
            'direccion' => 'Calle 21 de Enero 123',
            'fecha_creacion' => '1970-11-05'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Montessori',
            'departamento' => 'La Paz',
            'provincia' => 'Murillo',
            'RUE' => '234567',
            'direccion' => 'Calle 2 de Febrero 456',
            'fecha_creacion' => '1985-12-15'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Fe y Alegria',
            'departamento' => 'La Paz',
            'provincia' => 'Yunguyo',
            'RUE' => '567890',
            'direccion' => 'Calle 6 de Agosto 789',
            'fecha_creacion' => '1992-02-20' 

        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'San Calixto',
            'departamento' => 'La Paz',
            'provincia' => 'Yunguyo',
            'RUE' => '890123',
            'direccion' => 'Calle 16 de Julio 321',
            'fecha_creacion' => '1999-04-25'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Sagrados Corazones',
            'departamento' => 'La Paz',
            'provincia' => 'Yunguyo',
            'RUE' => '321098',
            'direccion' => 'Calle 20 de Octubre 654',
            'fecha_creacion' => '1975-06-30'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => '6 de Junio',
            'departamento' => 'Beni',
            'provincia' => 'San Joaquin',
            'RUE' => '135790',
            'direccion' => 'Calle 6 de Junio 123',
            'fecha_creacion' => '1980-08-10'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Horacio Vasquez',
            'departamento' => 'Beni',
            'provincia' => 'San Joaquin',
            'RUE' => '246801',
            'direccion' => 'Calle 24 de Septiembre 456',
            'fecha_creacion' => '1990-10-20'

        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Pedro Rivera',
            'departamento' => 'Tarija',
            'provincia' => 'Cercado',
            'RUE' => '135792',
            'direccion' => 'Calle 15 de Abril 789',
            'fecha_creacion' => '1988-12-30'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'San Antonio',
            'departamento' => 'Tarija',
            'provincia' => 'Bermejo',
            'RUE' => '246802',
            'direccion' => 'Calle 12 de Octubre 321',
            'fecha_creacion' => '1995-01-15'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Juan Pablo II',
            'departamento' => 'Tarija',
            'provincia' => 'Villa Montes',
            'RUE' => '357913',
            'direccion' => 'Calle 21 de Septiembre 654',
            'fecha_creacion' => '1992-03-25'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Gaston Gillaux',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Charagua',
            'RUE' => '468024',
            'direccion' => 'Calle 25 de Mayo 123',
            'fecha_creacion' => '1998-05-30'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Britanico Santa Cruz',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Charagua',
            'RUE' => '579135',
            'direccion' => 'Calle 10 de Noviembre 456',
            'fecha_creacion' => '1996-07-15'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Domingo Savio',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Warnes',
            'RUE' => '680246',
            'direccion' => 'Calle 14 de Septiembre 789',
            'fecha_creacion' => '1994-09-20'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Luis Espinal',
            'departamento' => 'Santa Cruz',
            'provincia' => 'Ichilo',
            'RUE' => '791357',
            'direccion' => 'Calle 2 de Agosto 321',
            'fecha_creacion' => '1991-11-25'

        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'San Francisco',
            'departamento' => 'Oruro',
            'provincia' => 'Cercado',
            'RUE' => '802468',
            'direccion' => 'Calle 10 de Febrero 654',
            'fecha_creacion' => '1993-01-30'  

        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'La Salle',
            'departamento' => 'Oruro',
            'provincia' => 'Mamore',
            'RUE' => '913579',
            'direccion' => 'Calle 6 de Agosto 123',
            'fecha_creacion' => '1997-03-15'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Bethania',
            'departamento' => 'Oruro',
            'provincia' => 'Marban',
            'RUE' => '024680',
            'direccion' => 'Calle 21 de Diciembre 456',
            'fecha_creacion' => '1999-05-20'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Anglo Americano',
            'departamento' => 'Oruro',
            'provincia' => 'Yacuma',
            'RUE' => '135791',
            'direccion' => 'Calle 10 de Noviembre 789',
            'fecha_creacion' => '1995-07-25'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Santa Luisa',
            'departamento' => 'Potosi',
            'provincia' => 'Charcas',
            'RUE' => '246802',
            'direccion' => 'Calle 2 de Febrero 321',
            'fecha_creacion' => '1994-09-30'
        ]);
        Colegio::firstOrcreate([
            'nombreColegio' => 'Fe y Alegria',
            'departamento' => 'Potosi',
            'provincia' => 'Chayanta',
            'RUE' => '357913',
            'direccion' => 'Calle 14 de Septiembre 654',
            'fecha_creacion' => '1992-11-15'

        ]);
    }
}
