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
        //Cochabamba

       Colegio::firstOrCreate([
    'nombreColegio' => 'TAYLEJBËSHË IÑESENTU',
    'departamento' => 'Cochabamba',
    'provincia' => 'Chapare',
    'direccion' => 'COMUNIDAD PUERTO COCHABAMBA',
    'RUE' => '50870070',
    'fecha_creacion' => '1990-11-18'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'VINTO INTEGRADO',
    'departamento' => 'Cochabamba',
    'provincia' => 'Quillacollo',
    'direccion' => 'AV. ALBINA PATIÑO ESQ. AV. PAIRUMANI',
    'RUE' => '50900039',
    'fecha_creacion' => '1996-03-15'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MARCELO QUIROGA SANTA CRUZ',
    'departamento' => 'Cochabamba',
    'provincia' => 'Mizque',
    'direccion' => 'AV. TERAN ESQ. AROMA',
    'RUE' => '80970093',
    'fecha_creacion' => '1980-11-25'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ARANI A',
    'departamento' => 'Cochabamba',
    'provincia' => 'Arani',
    'direccion' => 'CALLE JOSE MANUEL PANDO Y OQUENDO',
    'RUE' => '80940033',
    'fecha_creacion' => '1983-10-28'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'WAWA WASI DE OVEJERIA LARAMA',
    'departamento' => 'Cochabamba',
    'provincia' => 'Arque',
    'direccion' => '(ARQUE) OVEJERIA LARAMA',
    'RUE' => '80930046',
    'fecha_creacion' => '1986-11-15'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "ABYA YALA DE PONGO K'ASA",
    'departamento' => 'Cochabamba',
    'provincia' => 'Ayopaya',
    'direccion' => "COMUNIDAD PONGO K'ASA",
    'RUE' => '80930083',
    'fecha_creacion' => '1973-10-05'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA PERASANI',
    'departamento' => 'Cochabamba',
    'provincia' => 'Capinota',
    'direccion' => 'PERASANI',
    'RUE' => '80930067',
    'fecha_creacion' => '1979-03-15'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA MACHAJMARCA ARQUE',
    'departamento' => 'Cochabamba',
    'provincia' => 'Ayopaya',
    'direccion' => 'COMUNIDAD MACHAJMARCA ARQUE',
    'RUE' => '80930058',
    'fecha_creacion' => '1990-02-15'
    
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA TARACACHI',
    'departamento' => 'Cochabamba',
    'provincia' => 'Arque',
    'direccion' => 'COMUNIDAD TARACACHI',
    'RUE' => '80930066',
    'fecha_creacion' => '1992-01-15'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'WAWA WASI DE TARACACHI',
    'departamento' => 'Cochabamba',
    'provincia' => 'Arque',
    'direccion' => 'ARQUE (TARACACHI)',
    'RUE' => '80930040',
    'fecha_creacion' => '1982-01-20'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA JARCAMAYU B',
    'departamento' => 'Cochabamba',
    'provincia' => 'Capinota',
    'direccion' => 'COMUNIDAD JARCAMAYU B',
    'RUE' => '80930069',
    'fecha_creacion' => '1976-04-15'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA JARCAMAYU A',
    'departamento' => 'Cochabamba',
    'provincia' => 'Tapacari',
    'direccion' => 'COMUNIDAD JARCAMAYU',
    'RUE' => '80930077',
    'fecha_creacion' => '1982-09-29'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'WAWA WASI DE COCAMARCA',
    'departamento' => 'Cochabamba',
    'provincia' => 'Narciso Campero',
    'direccion' => 'COMUNIDAD COCAMARCA',
    'RUE' => '80930055',
    'fecha_creacion' => '1982-06-15'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA CHANGO',
    'departamento' => 'Cochabamba',
    'provincia' => 'Narciso Campero',
    'direccion' => 'COMUNIDAD CHANGO',
    'RUE' => '80930062',
    'fecha_creacion' => '1972-11-15'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA INTINI MAYU',
    'departamento' => 'Cochabamba',
    'provincia' => 'Esteban Arce',
    'direccion' => 'COMUNIDAD INTINI MAYU',
    'RUE' => '80930072',
    'fecha_creacion' => '1992-12-25'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'WAWA WASI KALAPAQUERI',
    'departamento' => 'Cochabamba',
    'provincia' => 'Esteban Arce',
    'direccion' => 'KALAPAQUERI',
    'RUE' => '80930044',
    'fecha_creacion' => '1980-10-05'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA TUJSUMA',
    'departamento' => 'Cochabamba',
    'provincia' => 'German Jordán',
    'direccion' => 'COMUNIDAD TUJSUMA',
    'RUE' => '80930071',
    'fecha_creacion' => '1989-12-05'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'WAWA WASI DE TUJSUMA',
    'departamento' => 'Cochabamba',
    'provincia' => 'German Jordán',
    'direccion' => 'ARQUE (TUJSUMA)',
    'RUE' => '80930042',
    'fecha_creacion' => '1972-11-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'KALLPA WAWA TANGA TANGA',
    'departamento' => 'Cochabamba',
    'provincia' => 'Carrasco',
    'direccion' => 'COMUNIDAD TANGA TANGA',
    'RUE' => '80930073',
    'fecha_creacion' => '1992-11-17'
]);
Colegio::firstOrCreate([
    'nombreColegio' => 'TAMBILLO CHICO',
    'departamento' => 'Cochabamba',
    'provincia' => 'Esteban Arce',
    'direccion' => 'CMD. TAMBILLO CHICO',
    'RUE' => '80850030',
    'fecha_creacion' => '1982-04-10'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TAMBILLO CENTRO',
    'departamento' => 'Cochabamba',
    'provincia' => 'Punata',
    'direccion' => 'CAMINO A ARANI',
    'RUE' => '80850058',
    'fecha_creacion' => '1972-11-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUANA AZURDUY DE PADILLA',
    'departamento' => 'Cochabamba',
    'provincia' => 'German Jordán',
    'direccion' => 'AVENIDA ANDRES MARIA TORRICO',
    'RUE' => '80850002',
    'fecha_creacion' => '1992-01-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LEON RANCHO CENTRO',
    'departamento' => 'Cochabamba',
    'provincia' => 'Cercado',
    'direccion' => 'CMD. LEON RANCHO CENTRO',
    'RUE' => '80850025',
    'fecha_creacion' => null
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BOLIVIA',
    'departamento' => 'Cochabamba',
    'provincia' => 'Bolivar',
    'direccion' => 'CALLE CALAMA',
    'RUE' => '80850005',
    'fecha_creacion' => '1980-11-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LIBERTADOR SIMON BOLIVAR',
    'departamento' => 'Cochabamba',
    'provincia' => 'Bolivar',
    'direccion' => 'CALLE CALAMA',
    'RUE' => '80850006',
    'fecha_creacion' => '1970-11-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'EVO MORALES AYMA',
    'departamento' => 'Cochabamba',
    'provincia' => 'Cercado',
    'direccion' => 'AV. RUBEN FERRUFINO S/N',
    'RUE' => '80850059',
    'fecha_creacion' => '1971-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TAJAMAR',
    'departamento' => 'Cochabamba',
    'provincia' => 'Carrasco',
    'direccion' => 'CMD. TAJAMAR',
    'RUE' => '80850029',
    'fecha_creacion' => '1970-11-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MARISCAL ANDRES DE SANTA CRUZ',
    'departamento' => 'Cochabamba',
    'provincia' => 'Chapare',
    'direccion' => 'CALLE MEJILLONES',
    'RUE' => '80850060',
    'fecha_creacion' => '1975-10-17'
]);

//La paz

Colegio::firstOrCreate([
    'nombreColegio' => 'VILLA DE LA CRUZ',
    'departamento' => 'La Paz',
    'provincia' => 'Murillo',
    'direccion' => 'AV. PERIFERICA ZONA 27 DE MAYO AL LADO DE PRO SALUD',
    'RUE' => '80730609',
     'fecha_creacion' => '1970-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CHUQUIAGUILLO',
    'departamento' => 'La Paz',
    'provincia' => 'Murillo',
    'direccion' => 'AV. RAMIRO CASTILLO Nro 1012',
    'RUE' => '80730660',
     'fecha_creacion' => '1976-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BENITO JUAREZ',
    'departamento' => 'La Paz',
    'provincia' => 'Ingavi',
    'direccion' => 'CALLE T S/N',
    'RUE' => '80730591',
     'fecha_creacion' => '1990-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FRANCIA',
    'departamento' => 'La Paz',
    'provincia' => 'Ingavi',
    'direccion' => 'AV. CHACALTAYA Nro 710',
    'RUE' => '80730605',
     'fecha_creacion' => '1975-08-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN ANTONIO DE PADUA II',
    'departamento' => 'La Paz',
    'provincia' => 'Pacajes',
    'direccion' => 'CALLE YUNGAS NRO. 555',
    'RUE' => '80730582',
     'fecha_creacion' => '1975-12-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'COLORADOS DE BOLIVIA',
    'departamento' => 'La Paz',
    'provincia' => 'Pacajes',
    'direccion' => 'AV. MONTES Nº 467',
    'RUE' => '80730608',
    'fecha_creacion' => '1978-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'DANIEL SANCHEZ BUSTAMANTE V',
    'departamento' => 'La Paz',
    'provincia' => 'Abel Iturralde',
    'direccion' => 'CALLE GUILLERMO KILLMAN Nro 1170',
    'RUE' => '80730733',
     'fecha_creacion' => '1975-01-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MAX PAREDES NRO. 2',
    'departamento' => 'La Paz',
    'provincia' => 'Abel Iturralde',
    'direccion' => 'AV. 6 DE AGOSTO Nro 2100',
    'RUE' => '80730588',
     'fecha_creacion' => '1977-06-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'DANIEL SANCHEZ BUSTAMANTE IV',
    'departamento' => 'La Paz',
    'provincia' => 'Larecaja',
    'direccion' => 'CALLE GUILLERMO KILLMAN Nro 1170',
    'RUE' => '80730598',
     'fecha_creacion' => '1974-10-18'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SANTA MARIA MAZZARELLO II',
    'departamento' => 'La Paz',
    'provincia' => 'Larecaja',
    'direccion' => 'CALLE ASUNCION Nro 275',
    'RUE' => '80730635',
     'fecha_creacion' => '1979-08-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FATIMA',
    'departamento' => 'La Paz',
    'provincia' => 'Los Andes',
    'direccion' => 'CALLE DAVID CRESPO Nro 1060',
    'RUE' => '80730571',
     'fecha_creacion' => '1975-12-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'GUALBERTO VILLARROEL NRO. 4',
    'departamento' => 'La Paz',
    'provincia' => 'Los Andes',
    'direccion' => 'ISAC TAMAYO Nº 720',
    'RUE' => '80730600',
     'fecha_creacion' => '1976-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CIUDADELA FERROVIARIA',
    'departamento' => 'La Paz',
    'provincia' => 'Nor Yungas',
    'direccion' => 'CALLE 1 Nro 540',
    'RUE' => '80730755',
     'fecha_creacion' => '1980-06-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'PASANKERI',
    'departamento' => 'La Paz',
    'provincia' => 'Nor Yungas',
    'direccion' => 'C. 14 DE JUNIO NRO. 286 Y M. Q. SANTA CRUZ',
    'RUE' => '80730671',
     'fecha_creacion' => '1975-10-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LA PAZ II',
    'departamento' => 'La Paz',
    'provincia' => 'Caranavi',
    'direccion' => 'CALLE CAMPERO Nro 51',
    'RUE' => '80730631',
     'fecha_creacion' => '1979-09-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '20 DE OCTUBRE II',
    'departamento' => 'La Paz',
    'provincia' => 'Caranavi',
    'direccion' => 'CALLE COMERCIO Nº 1048',
    'RUE' => '80730584',
     'fecha_creacion' => '1975-05-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MCAL. SANTA CRUZ',
    'departamento' => 'La Paz',
    'provincia' => 'Bautista Saavedra',
    'direccion' => 'CALLE SANTA CRUZ Nro 534',
    'RUE' => '80730601',
     'fecha_creacion' => '1970-12-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SEÑOR DE LA SENTENCIA',
    'departamento' => 'La Paz',
    'provincia' => 'Bautista Saavedra',
    'direccion' => 'C/ INGAVI Nº721',
    'RUE' => '80730632',
     'fecha_creacion' => '1975-04-27'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MIRAFLORES',
    'departamento' => 'La Paz',
    'provincia' => 'Gualberto Villarroel',
    'direccion' => 'AV. CARRASCO FINAL S/N - MIRAFLORES',
    'RUE' => '80730586',
     'fecha_creacion' => '1975-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SARANTAÑANI',
    'departamento' => 'La Paz',
    'provincia' => 'Gualberto Villarroel',
    'direccion' => 'CALLE 3 DE MARZO',
    'RUE' => '80730821',
    'fecha_creacion' => '1975-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FELIX EGUINO ZABALLA',
    'departamento' => 'La Paz',
    'provincia' => 'José Manuel Pando',
    'direccion' => 'CALLE CARLOS LOVERA Nro 198',
    'RUE' => '80730627',
     'fecha_creacion' => '1975-10-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MEXICO',
    'departamento' => 'La Paz',
    'provincia' => 'José Manuel Pando',
    'direccion' => 'CALLE INGAVI Nro 889',
    'RUE' => '80730414',
    'fecha_creacion' => '1975-10-16'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'REPUBLICA BOLIVARIANA DE VENEZUELA NOCHE',
    'departamento' => 'La Paz',
    'provincia' => 'Omasuyos',
    'direccion' => 'PLAZA 21 DE DICIEMBRE CALLE A - B S/N',
    'RUE' => '40730523',
     'fecha_creacion' => '1975-10-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MARTIN CARDENAS HERMOSA E',
    'departamento' => 'La Paz',
    'provincia' => 'Omasuyos',
    'direccion' => 'PLAN 88 S/N',
    'RUE' => '40730326',
     'fecha_creacion' => '1975-10-18'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JAPON - AYACUCHO',
    'departamento' => 'La Paz',
    'provincia' => 'Pedro Domingo Murillo',
    'direccion' => 'AV. LITORAL S/N SAN LUIS II CHARAPAQUI',
    'RUE' => '40730329',
     'fecha_creacion' => '1975-12-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FRANZ TAMAYO',
    'departamento' => 'La Paz',
    'provincia' => 'Pedro Domingo Murillo',
    'direccion' => 'CALLE ALBERTO WILDE Nro 900',
    'RUE' => '40730320',
     'fecha_creacion' => '1975-10-27'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SIMON BOLIVAR',
    'departamento' => 'La Paz',
    'provincia' => 'Sud Yungas',
    'direccion' => 'MANZANO 2 D Nro 377',
    'RUE' => '40730541',
     'fecha_creacion' => '1975-10-07'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'REPUBLICA DE FRANCIA NOCHE',
    'departamento' => 'La Paz',
    'provincia' => 'Sud Yungas',
    'direccion' => 'CALLE RIO BERMEJO Nro.2034',
    'RUE' => '40730603',
     'fecha_creacion' => '1975-04-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JULIAN APAZA NOCHE',
    'departamento' => 'La Paz',
    'provincia' => 'Muñecas',
    'direccion' => 'AV. COCHABAMBA CALLE 10 Nro 80',
    'RUE' => '40730515',
     'fecha_creacion' => '1975-10-07'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SANTA ROSA',
    'departamento' => 'La Paz',
    'provincia' => 'Muñecas',
    'direccion' => 'AV. 6 DE JUNIO Nro 26',
    'RUE' => '40730322',
     'fecha_creacion' => '1975-03-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ILLIMANI D',
    'departamento' => 'La Paz',
    'provincia' => 'Manco Kapac',
    'direccion' => 'AVENIDA RAUL PRADA S/N',
    'RUE' => '40730704',
     'fecha_creacion' => '1978-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'VILLA ESPERANZA',
    'departamento' => 'La Paz',
    'provincia' => 'Manco Kapac',
    'direccion' => 'CALLE PASCOE Nro 777 ESQUINA AV. SUCRE',
    'RUE' => '40730506',
     'fecha_creacion' => '1978-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FAUSTO REYNAGA',
    'departamento' => 'La Paz',
    'provincia' => 'Jose Ramon Loaysa',
    'direccion' => 'KM. 12 EL ALTO CARRETERA HUARINA',
    'RUE' => '40730540',
     'fecha_creacion' => '1979-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'DELIA GAMBARTE DE QUEZADA',
    'departamento' => 'La Paz',
    'provincia' => 'Jose Ramon Loaysa',
    'direccion' => 'ENTRE CALLES 5 Y 6 S/N',
    'RUE' => '40730324',
     'fecha_creacion' => '1975-10-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '12 DE OCTUBRE NOCHE',
    'departamento' => 'La Paz',
    'provincia' => 'Inquisivi',
    'direccion' => 'AVENIDA RODOLFO PALENQUE SIN NUMERO',
    'RUE' => '40730328',
     'fecha_creacion' => '1976-10-21'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'COREA',
    'departamento' => 'La Paz',
    'provincia' => 'Inquisivi',
    'direccion' => 'AV.CHINCHASUYO Nº 100',
    'RUE' => '40730321',
     'fecha_creacion' => '1975-09-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'PABLO ZARATE WILLKA II',
    'departamento' => 'La Paz',
    'provincia' => 'Franz Tamayo',
    'direccion' => 'CALLE RADIO CONDOR S/N',
    'RUE' => '40730648',
     'fecha_creacion' => '1978-10-18'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUAN LECHIN OQUENDO',
    'departamento' => 'La Paz',
    'provincia' => 'Franz Tamayo',
    'direccion' => 'AV. ANCOHUMA ENTRE CONDORIRI S/N',
    'RUE' => '40730425',
     'fecha_creacion' => '1975-11-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MCAL. JOSE BALLIVIAN B',
    'departamento' => 'La Paz',
    'provincia' => 'Eliodoro Camacho',
    'direccion' => 'RENE VARGAS Y ALVAREZ PLATA Nro 200',
    'RUE' => '40730315',
     'fecha_creacion' => '1978-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUAN CAPRILES CIUDAD SATELITE',
    'departamento' => 'La Paz',
    'provincia' => 'Eliodoro Camacho',
    'direccion' => 'AVENIDA DEL POLICIA S/N',
    'RUE' => '40730327',
     'fecha_creacion' => '1979-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ESPAÑA B',
    'departamento' => 'La Paz',
    'provincia' => 'Aroma',
    'direccion' => 'BATALLON ILLIMANI Nro 656',
    'RUE' => '80730940',
     'fecha_creacion' => '1980-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '1RO. DE MAYO',
    'departamento' => 'La Paz',
    'provincia' => 'Aroma',
    'direccion' => 'BATALLON ILLIMANI Nro 656',
    'RUE' => '80730173',
     'fecha_creacion' => '1995-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'DANIEL SANCHEZ BUSTAMANTE II',
    'departamento' => 'La Paz',
    'provincia' => 'Aroma',
    'direccion' => 'CALLE GUILLERMO KILLMAN Nro 1170',
    'RUE' => '80730037',
     'fecha_creacion' => '1996-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SIMON BOLIVAR NRO. 1',
    'departamento' => 'La Paz',
    'provincia' => 'Abel Iturralde',
    'direccion' => 'CALLE CONCHITAS Nro 401',
    'RUE' => '80730012',
     'fecha_creacion' => '1978-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'DANIEL SANCHEZ BUSTAMANTE I',
    'departamento' => 'La Paz',
    'provincia' => 'Abel Iturralde',
    'direccion' => 'CALLE GUILLERMO KILLMAN Nro 1170',
    'RUE' => '80730036',
     'fecha_creacion' => '1979-10-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JACQUELINE KENNEDY',
    'departamento' => 'La Paz',
    'provincia' => 'Abel Iturralde',
    'direccion' => 'CALLE MAXIMILIANO ORTIZ S/N',
    'RUE' => '80730226',
     'fecha_creacion' => '1975-10-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LUCIO VELASCO FLORES',
    'departamento' => 'La Paz',
    'provincia' => 'Inquisivi',
    'direccion' => 'ALTO PURA PURA PANTICIRCA',
    'RUE' => '80730121',
     'fecha_creacion' => '1975-10-18'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'REPUBLICA DOMINICANA',
    'departamento' => 'La Paz',
    'provincia' => 'Inquisivi',
    'direccion' => 'AV. BUENOS AIRES 1751',
    'RUE' => '80730044',
     'fecha_creacion' => '1975-10-20'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'NICOLAS FERNANDEZ NARANJO',
    'departamento' => 'La Paz',
    'provincia' => 'Ingavi',
    'direccion' => 'CALLE MAXIMILIANO ORTIZ S/N',
    'RUE' => '80730227',
     'fecha_creacion' => '1975-10-21'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JOSE CARRASCO TORRICO',
    'departamento' => 'La Paz',
    'provincia' => 'Ingavi',
    'direccion' => 'CALLE DAVID CRESPO Nro 1060',
    'RUE' => '80730029',
     'fecha_creacion' => '1975-10-12'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BAUTISTA SAAVEDRA',
    'departamento' => 'La Paz',
    'provincia' => 'Ingavi',
    'direccion' => 'CALLE ASUNCION Nro 275',
    'RUE' => '80730127',
     'fecha_creacion' => '1975-01-17'
]);
//Santa Cruz 


Colegio::firstOrCreate([
    'nombreColegio' => 'MAGISTERIO E',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Andrés Ibáñez',
    'direccion' => 'CAMINO PARQUE REGIONAL LOMA DE ARENA S/N',
    'RUE' => '81981180',
    'fecha_creacion' => '1975-01-14'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LUZ Y ESPERANZA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Andrés Ibáñez',
    'direccion' => 'CARCEL DE VARONES DE PALMASOLA',
    'RUE' => '81980779',
    'fecha_creacion' => '1975-01-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN JORGE',
    'departamento' => 'Santa Cruz',
    'provincia' => 'José Miguel de Velasco',
    'direccion' => 'BARRIO SAN CAYETANO',
    'RUE' => '81981498',
    'fecha_creacion' => '1978-01-17'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LUIS ESPINAL CAMPS',
    'departamento' => 'Santa Cruz',
    'provincia' => 'José Miguel de Velasco',
    'direccion' => 'AV. ROQUE AGUILERA',
    'RUE' => '81981529',
    'fecha_creacion' => '1978-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SANTA CRUZ A',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Vallegrande',
    'direccion' => 'AV. ALEMANA CALLE JUNOS MZ 21',
    'RUE' => '81980156',
    'fecha_creacion' => '1978-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'METODISTA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Vallegrande',
    'direccion' => 'CALLE CORUMBA 2005',
    'RUE' => '81980132',
    'fecha_creacion' => '1978-09-20'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ALIPIO VALENCIA VEGA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Sara',
    'direccion' => 'AV. 2 DE AGOSTO PASANDO EL 6TO ANILLO',
    'RUE' => '81980421',
    'fecha_creacion' => '1978-09-21'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MUJERES',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Sara',
    'direccion' => 'ÑUFLO DE CHAVEZ 62',
    'RUE' => '81980796',
    'fecha_creacion' => '1980-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FELIX BASCOPE GONZALES E',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Obispo Santistevan',
    'direccion' => 'calle virgilio ludueña',
    'RUE' => '81980259',
    'fecha_creacion' => '1980-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'NOEL KEMPF MERCADO C',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Obispo Santistevan',
    'direccion' => 'BARRIO 6 DE FEBRERO UV 97',
    'RUE' => '81981033',
    'fecha_creacion' => '1981-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'NUEVO HORIZONTE',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ñuflo de Chávez',
    'direccion' => 'ÑUFLO DE CHAVEZ 62',
    'RUE' => '81981176',
    'fecha_creacion' => '1982-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MARISCAL ANDRES DE SANTA CRUZ',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ñuflo de Chávez',
    'direccion' => 'UV. MANZANO 42 AV. 2 DE ABRIL S/N',
    'RUE' => '81981485',
    'fecha_creacion' => '1983-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN FRANCISCO JAVIER A',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Manuel María Caballero',
    'direccion' => 'CALLE NO 10',
    'RUE' => '81980531',
    'fecha_creacion' => '1982-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '14 DE OCTUBRE',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Manuel María Caballero',
    'direccion' => 'BARRIO LA UNION CAMPECHE UV - 156A AVENIDA N° 30',
    'RUE' => '81981426',
    'fecha_creacion' => '1982-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'PNP SANTA CRUZ 7',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ignacio Warnes',
    'direccion' => 'CALLE LA PAZM Nº 766',
    'RUE' => '81981501',
    'fecha_creacion' => '1980-09-10'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN LORENZO D',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ignacio Warnes',
    'direccion' => 'AV. VIRGEN DE LUJAN UV 79 MZ 46',
    'RUE' => '81981316',
    'fecha_creacion' => '1980-09-12'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'WILLIAMS CESPEDES COSSIO',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ichilo',
    'direccion' => 'CALLE JAURU 2550',
    'RUE' => '81980134',
    'fecha_creacion' => '1976-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CALAMA III',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ichilo',
    'direccion' => 'KM. 6 CARRETERA A COCHABAMBA',
    'RUE' => '81981029',
    'fecha_creacion' => '1985-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BARTOLINA SISA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Guarayos',
    'direccion' => 'BARRIO CIUDAD DE LA ALEGRIA',
    'RUE' => '81981765',
    'fecha_creacion' => '1983-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '30 DE MARZO NOCHE',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Guarayos',
    'direccion' => 'URBANIZACION OLENDER BARRIO 30 DE MARZO',
    'RUE' => '81981179',
    'fecha_creacion' => '1980-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MODULO ZENOBIA APONTE C',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Germán Busch',
    'direccion' => 'ZONA PALMAR VIRUEZ - FINAL GALLITO',
    'RUE' => '81981505',
    'fecha_creacion' => '1980-09-13'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'DR. MARIO IBAÑEZ LOPEZ',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Germán Busch',
    'direccion' => 'PAMPA DE LA ISLA Y LOS CHACOS',
    'RUE' => '81980467',
    'fecha_creacion' => '1976-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'GENERAL ARNALDO SAUCEDO PARADA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Florida',
    'direccion' => 'CALLE FINAL CHARCAS',
    'RUE' => '81981185',
    'fecha_creacion' => '1978-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CUEVO',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Florida',
    'direccion' => 'CALLE 6 DE AGOSTO',
    'RUE' => '51920024',
    'fecha_creacion' => '1985-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'AMBORO - VIDA NUEVA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Cordillera',
    'direccion' => 'COMUNIDAD QUEBRADA LEON',
    'RUE' => '41980110',
    'fecha_creacion' => '1980-09-14'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'AMBORO',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Cordillera',
    'direccion' => 'COMUNIDAD QUEBRADA LEON',
    'RUE' => '41980104',
    'fecha_creacion' => '1980-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '25 DE JULIO',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Chiquitos',
    'direccion' => 'CALLE SANTA CRUZ ESQ. VALLE GRANDE',
    'RUE' => '41980033',
    'fecha_creacion' => '1980-09-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'DR. FRANZ TAMAYO',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Chiquitos',
    'direccion' => 'CALLE DR. RUBEN TERRAZAS S/N',
    'RUE' => '51900009',
    'fecha_creacion' => '1980-09-13'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAGRADO CORAZON 5',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ángel Sandóval',
    'direccion' => 'CALLE LOS ANDES',
    'RUE' => '71950056',
    'fecha_creacion' => '1980-09-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAGRADO CORAZON 6',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ángel Sandóval',
    'direccion' => 'CALLE LOS ANDES',
    'RUE' => '71950064',
    'fecha_creacion' => '1990-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'INTERCULTURAL',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ángel Sandóval',
    'direccion' => 'ENTRE CALLES, ANA MARÍA ROMERO DE CAMPERO Y HERNAN SILES',
    'RUE' => '51880031',
    'fecha_creacion' => '1998-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MARCELO QUIROGA SANTA CRUZ B',
    'departamento' => 'Santa Cruz',
    'provincia' => 'José Miguel de Velasco',
    'direccion' => 'ENTRE CALLES, ANA MARÍA ROMERO DE CAMPERO Y HERNAN SILES',
    'RUE' => '61880184',
    'fecha_creacion' => '1998-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'EL PARAISO B',
    'departamento' => 'Santa Cruz',
    'provincia' => 'José Miguel de Velasco',
    'direccion' => 'VILLA PARAISO',
    'RUE' => '51880022',
    'fecha_creacion' => '1980-09-12'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ASCENCION',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Vallegrande',
    'direccion' => 'BARRIO SAN GREGORIO',
    'RUE' => '81840021',
    'fecha_creacion' => '1980-02-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '15 DE NOVIEMBRE',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Vallegrande',
    'direccion' => 'BARRIO 16 DE JULIO',
    'RUE' => '81840042',
    'fecha_creacion' => '1980-09-21'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BUENA VISTA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Obispo Santistevan',
    'direccion' => 'CALLE OVIDIO SUAREZ Y MARIANO SAUCEDO SEVILLA',
    'RUE' => '81950110',
    'fecha_creacion' => '1980-03-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'COMARAPA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Obispo Santistevan',
    'direccion' => 'HEROES DEL CHACO',
    'RUE' => '81860006',
    'fecha_creacion' => '1980-09-22'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN ISIDRO III',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ñuflo de Chávez',
    'direccion' => 'SAN ISIDRO',
    'RUE' => '81860047',
    'fecha_creacion' => '1980-09-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'HUGO BANZER SUAREZ',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ñuflo de Chávez',
    'direccion' => 'ZONA 5 NOR OESTE',
    'RUE' => '81880082',
    'fecha_creacion' => '1980-10-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN MARTIN DE PORRES',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Manuel María Caballero',
    'direccion' => 'CALLE MONSEÑOR RIVERO',
    'RUE' => '71980039',
    'fecha_creacion' => '1980-09-21'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LAS PIEDADES',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Manuel María Caballero',
    'direccion' => 'LAS PIEDADES',
    'RUE' => '71980076',
    'fecha_creacion' => '1980-02-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'VIRGEN DE GUADALUPE',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ignacio Warnes',
    'direccion' => 'CALLE MONTERO',
    'RUE' => '81920023',
    'fecha_creacion' => '1980-03-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'REPUBLICA DEL JAPON',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Ignacio Warnes',
    'direccion' => 'AVENIDA FLORIDA',
    'RUE' => '81890119',
    'fecha_creacion' => '1980-09-12'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LA FLORESTA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Guarayos',
    'direccion' => 'PROLONGACION 24 DE SEPTIEMBRE',
    'RUE' => '81890069',
    'fecha_creacion' => '1980-01-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'AMERICANO MONTERO 4',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Guarayos',
    'direccion' => 'BARRIO RINCON DEL TIGRE',
    'RUE' => '81890014',
    'fecha_creacion' => '1980-09-25'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN MAXIMILIANO KOLBE 3',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Germán Busch',
    'direccion' => 'BARRIO URKUPIÑA',
    'RUE' => '81890022',
    'fecha_creacion' => '1980-09-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MONTERO',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Germán Busch',
    'direccion' => 'CALLE POTOSI',
    'RUE' => '81890026',
    'fecha_creacion' => '1980-09-24'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ROSENDA J. DE RODRIGUEZ II',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Cordillera',
    'direccion' => 'CALLE AVAROA ENTRE ROSENDO PAZ Y ROBERTO PAZ',
    'RUE' => '81890127',
    'fecha_creacion' => '1980-02-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CARLOS VILLEGAS QUIROGA',
    'departamento' => 'Santa Cruz',
    'provincia' => 'Cordillera',
    'direccion' => 'PARQUE INDUSTRIAL KM. 10',
    'RUE' => '81890136',
    'fecha_creacion' => '1990-09-19'
]);
//oruro

Colegio::firstOrCreate([
    'nombreColegio' => 'MARCOS BELTRAN AVILA',
    'departamento' => 'Oruro',
    'provincia' => 'Mejillones',
    'direccion' => 'VILLAZÓN CAMACHO WASHINGTON',
    'RUE' => '81230220',
   'fecha_creacion' => '1990-09-20'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ARLEQUIN',
    'departamento' => 'Oruro',
    'provincia' => 'Mejillones',
    'direccion' => 'CAMPO JORDAN Y 6 DE AGOSTO',
    'RUE' => '81230277',
    'fecha_creacion' => '1990-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "SANTOS MARKA T'ULA",
    'departamento' => 'Oruro',
    'provincia' => 'Carangas',
    'direccion' => 'KENEDDY Y TARIJA BAJA',
    'RUE' => '81230268',
   'fecha_creacion' => '1990-09-19'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'HIJOS DEL SOL',
    'departamento' => 'Oruro',
    'provincia' => 'Carangas',
    'direccion' => 'KENEDDY Y TARIJA BAJA',
    'RUE' => '81230229',
    'fecha_creacion' => '1990-09-01'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MCAL. BRAUN',
    'departamento' => 'Oruro',
    'provincia' => 'Tomas Barron',
    'direccion' => 'REGIMIENTO MARISCAL BRAUN CARRETERA A VINTO',
    'RUE' => '81230255',
    'fecha_creacion' => '1990-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'AZANAQUE',
    'departamento' => 'Oruro',
    'provincia' => 'Tomas Barron',
    'direccion' => 'AV. LADISLAO CABRERA ENTRE ECUADOR',
    'RUE' => '81220091',
    'fecha_creacion' => '1992-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CORQUE',
    'departamento' => 'Oruro',
    'provincia' => 'Pataleon Dalence',
    'direccion' => 'DETRAS DE LA IGLESIA, AL OESTE DE LA PLAZA PRINCIPAL',
    'RUE' => '81210040',
    'fecha_creacion' => '1993-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CURAHUARA DE CARANGAS',
    'departamento' => 'Oruro',
    'provincia' => 'Pataleon Dalence',
    'direccion' => 'CALLE SAJAMA LA PAZ ORURO',
    'RUE' => '81200023',
    'fecha_creacion' => '1990-07-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'EUCALIPTUS',
    'departamento' => 'Oruro',
    'provincia' => 'Poopó',
    'direccion' => 'CAPITAN MORALES Y EDUARDO ABAROA',
    'RUE' => '81130012',
    'fecha_creacion' => '1990-09-06'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LITORAL',
    'departamento' => 'Oruro',
    'provincia' => 'Poopó',
    'direccion' => 'HUCHACALLA',
    'RUE' => '81190007',
    'fecha_creacion' => '1990-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JULIO ROMANO',
    'departamento' => 'Oruro',
    'provincia' => 'Eduardo Abaroa',
    'direccion' => 'LIZARRAGA',
    'RUE' => '81170030',
    'fecha_creacion' => '1990-02-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'HUARI',
    'departamento' => 'Oruro',
    'provincia' => 'Eduardo Abaroa',
    'direccion' => 'LA PAZ ZONA NORTE',
    'RUE' => '81100035',
    'fecha_creacion' => '1998-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'HUAYLLAMARCA 2',
    'departamento' => 'Oruro',
    'provincia' => 'Sebastian Pagador',
    'direccion' => 'Calle Bolivar entre Av. Huayllani, 25 de Julio, colindante con el Rio de Huayllamarca',
    'RUE' => '81080024',
    'fecha_creacion' => '1990-04-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'POOPO',
    'departamento' => 'Oruro',
    'provincia' => 'Sebastian Pagador',
    'direccion' => 'FRONTANILLA S/N OBLITAS Y RODRIGUEZ',
    'RUE' => '81180017',
    'fecha_creacion' => '1990-05-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LUIS PÉREZ COLQUE',
    'departamento' => 'Oruro',
    'provincia' => 'Saucari',
    'direccion' => 'SEBASTIAN PAGADOR ENTRE ALIANZA Y AVENIDA DEL COMERCIO',
    'RUE' => '81150021',
    'fecha_creacion' => '1990-07-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SALINAS',
    'departamento' => 'Oruro',
    'provincia' => 'Saucari',
    'direccion' => 'GUALBERTO VILLARROEL S/N',
    'RUE' => '81160044',
    'fecha_creacion' => '1990-08-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SUR CARANGAS',
    'departamento' => 'Oruro',
    'provincia' => 'Nor Carangas',
    'direccion' => 'CORQUE S/N ENTRE SUCRE Y EDUARDO AVAROA',
    'RUE' => '81120028',
    'fecha_creacion' => '1990-07-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TOLEDO',
    'departamento' => 'Oruro',
    'provincia' => 'Nor Carangas',
    'direccion' => '21 DE SEPTIEMBRE Y FRANCISCO DE TOLEDO No. 8463',
    'RUE' => '81140019',
    'fecha_creacion' => '1990-09-09'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CHOQUECOTA 2',
    'departamento' => 'Oruro',
    'provincia' => 'San Pedro de Totora',
    'direccion' => 'AL SUD DE LA POBLACION',
    'RUE' => '71210001',
    'fecha_creacion' => '1990-10-09'
]);



Colegio::firstOrCreate([
    'nombreColegio' => 'MARIA ANTONIETA SUAREZ',
    'departamento' => 'Oruro',
    'provincia' => 'San Pedro de Totora',
    'direccion' => '6 DE OCTUBRE 5014 AROMA Y RODRIGUEZ',
    'RUE' => '81230207',
    'fecha_creacion' => '1994-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'APOYO EDUCATIVO ORURO',
    'departamento' => 'Oruro',
    'provincia' => 'Sud Carangas',
    'direccion' => 'JUNIN S/N ENTRE PETOT Y CAMACHO',
    'RUE' => '81230262',
    'fecha_creacion' => '1996-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'GUIDO VILLAGOMEZ ANEXO',
    'departamento' => 'Oruro',
    'provincia' => 'Sud Carangas',
    'direccion' => 'AVENIDA DEL MINERO FINAL OESTE',
    'RUE' => '81230265',
    'fecha_creacion' => '1994-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ABOPANE',
    'departamento' => 'Oruro',
    'provincia' => 'Ladisalo Cabrera',
    'direccion' => 'BOLIVAR Nro1636 ENTRE PETOT Y CAMACHO',
    'RUE' => '81230270',
    'fecha_creacion' => '1990-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUANCITO PINTO',
    'departamento' => 'Oruro',
    'provincia' => 'Ladisalo Cabrera',
    'direccion' => 'CALLE SUCRE PLAZUELA MURPHY',
    'RUE' => '71230064',
    'fecha_creacion' => '1990-12-06'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CRISTO REY',
    'departamento' => 'Oruro',
    'provincia' => 'Litoral',
    'direccion' => 'LA BANDERA',
    'RUE' => '81220087',
    'fecha_creacion' => '1990-09-07'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JESÚS DE NAZARET',
    'departamento' => 'Oruro',
    'provincia' => 'Litoral',
    'direccion' => 'CAMPO JURADO 24 DE JUNIO PANTALEON DALENCE',
    'RUE' => '81210043',
    'fecha_creacion' => '1990-09-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'VIRGEN DE KALA CHUA',
    'departamento' => 'Oruro',
    'provincia' => 'Sajama',
    'direccion' => 'AVENIDA SEBASTIAN PAGADOR, LITORAL Y TOCOPILLA',
    'RUE' => '81200024',
    'fecha_creacion' => '1990-11-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'PABLO ZARATE WILLKA',
    'departamento' => 'Oruro',
    'provincia' => 'Sajama',
    'direccion' => 'CAPITAN MORALES Y EDUARDO ABAROA',
    'RUE' => '81130013',
    'fecha_creacion' => '1990-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAGRADO CORAZON DE JESUS',
    'departamento' => 'Oruro',
    'provincia' => 'Sabaya',
    'direccion' => 'CALLE FLORIDA ENTRE BOLIVAR Y AMERICA',
    'RUE' => '81190009',
    'fecha_creacion' => '1990-09-09'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'VIDA Y ESPERANZA',
    'departamento' => 'Oruro',
    'provincia' => 'Sabaya',
    'direccion' => 'SUCRE Y Q\'ARA ZAPATO S/N',
    'RUE' => '81170032',
    'fecha_creacion' => '1995-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'NUEVA ESPERANZA',
    'departamento' => 'Oruro',
    'provincia' => 'Sabaya',
    'direccion' => 'FRONTANILLA S/N OBLITAS Y RODRIGUEZ',
    'RUE' => '81180019',
    'fecha_creacion' => '1992-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'RENE ZAVALETA MERCADO',
    'departamento' => 'Oruro',
    'provincia' => 'Sabaya',
    'direccion' => 'LOA - AVAROA - PANAMERICANA',
    'RUE' => '71170013',
    'fecha_creacion' => '1993-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TUPAC KATARI',
    'departamento' => 'Oruro',
    'provincia' => 'Sajama',
    'direccion' => 'JUNTA VECINAL CALA CAJA CRISTO SALVADOR',
    'RUE' => '81230322',
    'fecha_creacion' => '1995-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ALCIRA CARDONA TORRICO 2',
    'departamento' => 'Oruro',
    'provincia' => 'Sajama',
    'direccion' => 'CALLE AUTONOMISTA S/N, PROLONGACION PEDRO FERRARI Y VICUÑA, PARADA DEL MINI BUS 104 ROJO',
    'RUE' => '81230274',
    'fecha_creacion' => '1992-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUAN EVO MORALES AYMA',
    'departamento' => 'Oruro',
    'provincia' => 'San Pedro de Totora',
    'direccion' => 'AVENIDA COCA, ENTRE PABLO ZARATE VILLCA Y 1RO. DE MARZO',
    'RUE' => '81230359',
    'fecha_creacion' => '1994-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FRANZ TAMAYO',
    'departamento' => 'Oruro',
    'provincia' => 'San Pedro de Totora',
    'direccion' => 'Calle XXXV entre 102-103',
    'RUE' => '81230125',
    'fecha_creacion' => '1991-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MINEROS HUANUNI SECUNDARIA',
    'departamento' => 'Oruro',
    'provincia' => 'San Pedro de Totora',
    'direccion' => 'URBANIZACIÓN PLAN 2000 MINEROS HUANUNI',
    'RUE' => '81230393',
    'fecha_creacion' => '1998-09-03'
]);

// Potosí

Colegio::firstOrCreate([
    'nombreColegio' => 'OCURI',
    'departamento' => 'Potosi',
    'provincia' => 'Tomás Frías',
    'direccion' => 'CALLE POTOSI S/N',
    'RUE' => '51450049',
     'fecha_creacion' => '1998-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ARAMPAMPA',
    'departamento' => 'Potosi',
    'provincia' => 'Tomás Frías',
    'direccion' => 'ARAMPAMPA',
    'RUE' => '81360034',
    'fecha_creacion' => '1998-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CANTON POTOBAMBA 26 DE JUNIO',
    'departamento' => 'Potosi',
    'provincia' => 'Sur Lipez',
    'direccion' => 'VILA VILA',
    'RUE' => '81460121',
     'fecha_creacion' => '1998-02-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BETANZOS',
    'departamento' => 'Potosi',
    'provincia' => 'Sur Lipez',
    'direccion' => 'HERMANOS PEREIRA',
    'RUE' => '81460112',
     'fecha_creacion' => '1998-06-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN CRISTÓBAL',
    'departamento' => 'Potosi',
    'provincia' => 'Nor Chichas',
    'direccion' => 'CALLE COMERCIO ENTRE COPACABANA S/N',
    'RUE' => '81400074',
     'fecha_creacion' => '1998-07-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'COLQUECHACA',
    'departamento' => 'Potosi',
    'provincia' => 'Nor Chichas',
    'direccion' => 'PLAZA 10 DE NOVIEMBRE',
    'RUE' => '81450114',
     'fecha_creacion' => '1998-09-06'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CONRADO MOSCOSO VARGAS',
    'departamento' => 'Potosi',
    'provincia' => 'Sur Chichas',
    'direccion' => 'CALLE MEDINACELLI S/N',
    'RUE' => '81430140',
    'fecha_creacion' => '1994-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LAYTAPI',
    'departamento' => 'Potosi',
    'provincia' => 'Sur Chichas',
    'direccion' => 'LAYTAPI',
    'RUE' => '81430143',
     'fecha_creacion' => '1998-09-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LLICA',
    'departamento' => 'Potosi',
    'provincia' => 'Rafael Bustillos',
    'direccion' => 'CALLE DANIEL CAMPOS ENTRE COMERCIO Y PANDO',
    'RUE' => '81350042',
     'fecha_creacion' => '1992-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TOMAS FRIAS A',
    'departamento' => 'Potosi',
    'provincia' => 'Rafael Bustillos',
    'direccion' => 'PREDIOS GRANJA UNIVERSITARIA',
    'RUE' => '81380159',
     'fecha_creacion' => '1991-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'OCURI',
    'departamento' => 'Potosi',
    'provincia' => 'Nor Lipez',
    'direccion' => 'CALLE POTOSI S/N',
    'RUE' => '51450049',
    'fecha_creacion' => '1993-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ARAMPAMPA',
    'departamento' => 'Potosi',
    'provincia' => 'Nor Lipez',
    'direccion' => 'ARAMPAMPA',
    'RUE' => '81360034',
     'fecha_creacion' => '1995-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CANTON POTOBAMBA 26 DE JUNIO',
    'departamento' => 'Potosi',
    'provincia' => 'Modesto Omiste',
    'direccion' => 'VILA VILA',
    'RUE' => '81460121',
     'fecha_creacion' => '1991-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BETANZOS',
    'departamento' => 'Potosi',
    'provincia' => 'Modesto Omiste',
    'direccion' => 'HERMANOS PEREIRA',
    'RUE' => '81460112',
     'fecha_creacion' => '1998-09-01'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN CRISTÓBAL',
    'departamento' => 'Potosi',
    'provincia' => 'Daniel Campos',
    'direccion' => 'CALLE COMERCIO ENTRE COPACABANA S/N',
    'RUE' => '81400074',
     'fecha_creacion' => '1998-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'COLQUECHACA',
    'departamento' => 'Potosi',
    'provincia' => 'Daniel Campos',
    'direccion' => 'PLAZA 10 DE NOVIEMBRE',
    'RUE' => '81450114',
     'fecha_creacion' => '1988-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CONRADO MOSCOSO VARGAS',
    'departamento' => 'Potosi',
    'provincia' => 'José María Linares',
    'direccion' => 'CALLE MEDINACELLI S/N',
    'RUE' => '81430140',
     'fecha_creacion' => '1978-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LAYTAPI',
    'departamento' => 'Potosi',
    'provincia' => 'José María Linares',
    'direccion' => 'LAYTAPI',
    'RUE' => '81430143',
     'fecha_creacion' => '1998-09-25'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LLICA',
    'departamento' => 'Potosi',
    'provincia' => 'Enrrique Baldivieso',
    'direccion' => 'CALLE DANIEL CAMPOS ENTRE COMERCIO Y PANDO',
    'RUE' => '81350042',
     'fecha_creacion' => '1998-09-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TOMAS FRIAS A',
    'departamento' => 'Potosi',
    'provincia' => 'Enrrique Baldivieso',
    'direccion' => 'PREDIOS GRANJA UNIVERSITARIA',
    'RUE' => '81380159',
     'fecha_creacion' => '1998-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LOUIS BRAILLE',
    'departamento' => 'Potosi',
    'provincia' => 'Cornelio Saavedra',
    'direccion' => 'HOYOS Nro 21',
    'RUE' => '81480238',
     'fecha_creacion' => '1998-04-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'WENCESLAO ALBA',
    'departamento' => 'Potosi',
    'provincia' => 'Cornelio Saavedra',
    'direccion' => 'CALLE HOYOS Nº 64',
    'RUE' => '81480197',
     'fecha_creacion' => '1998-01-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'POTOSI',
    'departamento' => 'Potosi',
    'provincia' => 'Chayanta',
    'direccion' => 'TARAPAYA',
    'RUE' => '81480257',
     'fecha_creacion' => '1998-02-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUANCITO PINTO',
    'departamento' => 'Potosi',
    'provincia' => 'Chayanta',
    'direccion' => 'CALLE CORSINO RODRIGUEZ S/N',
    'RUE' => '81480239',
     'fecha_creacion' => '1998-04-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUAN EVO MORALES AYMA I',
    'departamento' => 'Potosi',
    'provincia' => 'Charcas',
    'direccion' => 'AVENIDA ANTOFAGASTA S/N',
    'RUE' => '81480196',
     'fecha_creacion' => '1998-06-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN BARTOLOME',
    'departamento' => 'Potosi',
    'provincia' => 'Charcas',
    'direccion' => 'CALLE COCHABAMBA',
    'RUE' => '81460124',
     'fecha_creacion' => '1998-11-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'LA CLAUDINA',
    'departamento' => 'Potosi',
    'provincia' => 'Bernardino Bilbao',
    'direccion' => 'CALLE MEDINACELLI S/N',
    'RUE' => '81430146',
     'fecha_creacion' => '1992-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CORAZON DE JESUS',
    'departamento' => 'Potosi',
    'provincia' => 'Bernardino Bilbao',
    'direccion' => 'LITORAL ESQUINA JOSE MARIA LINARES',
    'RUE' => '81380165',
     'fecha_creacion' => '1992-05-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'UKCHARIKUNA',
    'departamento' => 'Potosi',
    'provincia' => 'Antonio Quijarro',
    'direccion' => 'TINGUIPAYA',
    'RUE' => '71480146',
     'fecha_creacion' => '1997-09-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MARÍA JOSEFA MUJÍA',
    'departamento' => 'Potosi',
    'provincia' => 'Antonio Quijarro',
    'direccion' => 'CALLE COCHABAMBA NRO 205 GREGORIO PACHECO',
    'RUE' => '81410158',
     'fecha_creacion' => '1994-09-03'
]);

//Chuquisaca

Colegio::firstOrCreate([
    'nombreColegio' => 'MARTHA MENDOZA',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Oropeza',
    'direccion' => 'MISISIPI S/N',
    'RUE' => '80480187',
    'fecha_creacion' => '1998-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JORGE CABRERA ACUÑA',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Oropeza',
    'direccion' => 'DESTACAMENTO 317 Nro 345',
    'RUE' => '80480256',
    'fecha_creacion' => '1998-12-02'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '8 DE SEPTIEMBRE',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Zudáñez',
    'direccion' => 'CALLE HERMANN GMEINER S/N',
    'RUE' => '80480246',
    'fecha_creacion' => '1998-12-01'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ANTONIO GAUSSET C',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Zudáñez',
    'direccion' => 'ARENALES Nro 119',
    'RUE' => '80480247',
    'fecha_creacion' => '1992-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'PNP CHUQUISACA 1',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Tomina',
    'direccion' => 'AV. DEL MAESTRO NO. 343',
    'RUE' => '80480300',
    'fecha_creacion' => '1991-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN ROQUE',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Tomina',
    'direccion' => 'BOLIVAR Nº 992',
    'RUE' => '80480303',
    'fecha_creacion' => '1998-12-13'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CARDENAL MAURER A',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Belisario Boeto',
    'direccion' => 'BOLIVAR Nro 982',
    'RUE' => '80480251',
    'fecha_creacion' => '1998-11-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'VILLA ARMONIA',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Belisario Boeto',
    'direccion' => 'VILLA ARMONIA',
    'RUE' => '80480270',
    'fecha_creacion' => '1998-12-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'GASTON VILAR CASSO C',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Hernandos Siles',
    'direccion' => 'WASHINGTON S/N',
    'RUE' => '80480299',
    'fecha_creacion' => '1992-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MARTHA MENDOZA B',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Hernandos Siles',
    'direccion' => 'MISISIPI S/N',
    'RUE' => '80480358',
    'fecha_creacion' => '1993-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'AZARI',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Jaime Zudañez',
    'direccion' => 'AZARI BARRIO EN FORMACION',
    'RUE' => '80480286',
    'fecha_creacion' => '1991-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ACCION SOCIAL C',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Jaime Zudañez',
    'direccion' => 'RAUL OTERO S/N',
    'RUE' => '80480271',
    'fecha_creacion' => '1988-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'FLORA QUIROGA DE ORTUZTE A',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Jose Maria Avilés',
    'direccion' => 'AVENIDA DEL MAESTRO N º 361',
    'RUE' => '80480301',
    'fecha_creacion' => '1978-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'JUANA AZURDUY DE PADILLA',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Jose Maria Avilés',
    'direccion' => 'DALENCE Nro 376',
    'RUE' => '80480272',
    'fecha_creacion' => '1998-12-13'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '9 DE MARZO "A"',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Luis Calvo',
    'direccion' => 'COMUNIDAD KHULLKU TAMBO',
    'RUE' => '80480369',
    'fecha_creacion' => '1998-10-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'EL CHACO',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Luis Calvo',
    'direccion' => 'EL CHACO',
    'RUE' => '80480362',
    'fecha_creacion' => '1998-12-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ICLA',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Nor Cinti',
    'direccion' => 'ICLA',
    'RUE' => '50460028',
    'fecha_creacion' => '1998-11-23'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'PALACIO TAMBO',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Nor Cinti',
    'direccion' => 'PALACIO TAMBO',
    'RUE' => '70420123',
    'fecha_creacion' => '1998-02-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ITALY',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Sud Cinti',
    'direccion' => 'YAPUSIRI',
    'RUE' => '70420113',
    'fecha_creacion' => '1995-12-03'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'VILLA ORIAS',
    'departamento' => 'Chuquisaca',
    'provincia' => 'Sud Cinti',
    'direccion' => 'TARVITA CALLE CALVARIO S/N',
    'RUE' => '70470053',
    'fecha_creacion' => '1998-12-04'
]);

// Tarija

Colegio::firstOrCreate([
    'nombreColegio' => 'SANTA RITA',
    'departamento' => 'Tarija',
    'provincia' => 'Gran Chaco',
    'direccion' => 'CALLE RECREO',
    'RUE' => '81700053',
    'fecha_creacion' => '1998-12-24'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'NIÑO JESUS',
    'departamento' => 'Tarija',
    'provincia' => 'Gran Chaco',
    'direccion' => 'CALLE ABAROA 2',
    'RUE' => '81710072',
    'fecha_creacion' => '1998-10-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN JOSÉ DE CARAPARI',
    'departamento' => 'Tarija',
    'provincia' => 'Aniceto Arce',
    'direccion' => 'ESQUINA CALLE SUCRE Y BOLIVAR S/N',
    'RUE' => '71710057',
    'fecha_creacion' => '1992-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SUPITIN',
    'departamento' => 'Tarija',
    'provincia' => 'Aniceto Arce',
    'direccion' => 'SUPITIN',
    'RUE' => '81680066',
    'fecha_creacion' => '1990-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SANTA LUCIA DE AÑARENDA',
    'departamento' => 'Tarija',
    'provincia' => 'José María Avilés',
    'direccion' => 'MORTERITO',
    'RUE' => '81680081',
    'fecha_creacion' => '1994-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ÑAURENDA',
    'departamento' => 'Tarija',
    'provincia' => 'José María Avilés',
    'direccion' => 'ÑAURENDA',
    'RUE' => '81680034',
    'fecha_creacion' => '1998-11-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'YUKIMBIA',
    'departamento' => 'Tarija',
    'provincia' => 'Burnet O’Connor',
    'direccion' => 'YUKIMBIA',
    'RUE' => '81680071',
    'fecha_creacion' => '1998-02-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TOMATIRENDA',
    'departamento' => 'Tarija',
    'provincia' => 'Burnet O’Connor',
    'direccion' => 'CMD. TOMATIRENDA',
    'RUE' => '81680027',
    'fecha_creacion' => '1999-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TIMBOY',
    'departamento' => 'Tarija',
    'provincia' => 'Eustaquio Méndez',
    'direccion' => 'TIMBOY',
    'RUE' => '81680070',
    'fecha_creacion' => '1998-12-24'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TENTAPIAU',
    'departamento' => 'Tarija',
    'provincia' => 'Eustaquio Méndez',
    'direccion' => 'TENTAPIAU',
    'RUE' => '81680069',
    'fecha_creacion' => '1998-05-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'ÑAGUANAURENDA',
    'departamento' => 'Tarija',
    'provincia' => 'Cercado',
    'direccion' => 'COMUNIDAD ÑAGUANAURENDA',
    'RUE' => '81680095',
    'fecha_creacion' => '1998-10-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TENTAGUASU',
    'departamento' => 'Tarija',
    'provincia' => 'Cercado',
    'direccion' => 'TENTAGUASU',
    'RUE' => '81680068',
    'fecha_creacion' => '1998-02-04'
]);

//Beni 


Colegio::firstOrCreate([
    'nombreColegio' => 'NUEVOS HORIZONTES',
    'departamento' => 'Beni',
    'provincia' => 'Moxos',
    'direccion' => 'URBANIZACION BELLO HORIZONTE',
    'RUE' => '82230137',
    'fecha_creacion' => '1998-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'TECNOLOGICO INDUSTRIAL BENI',
    'departamento' => 'Beni',
    'provincia' => 'Moxos',
    'direccion' => 'AV. SAN IGNACIO ESQ. PEREQUIJE S/N AL LADO DE LA UE SANTA MARÍA FE Y ALEGRÍA',
    'RUE' => '82230129',
    'fecha_creacion' => '1998-12-26'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BOLIVIANO ALEMAN',
    'departamento' => 'Beni',
    'provincia' => 'Yacuma',
    'direccion' => 'CALLE LUIS FERNANDO PELLICIOLI',
    'RUE' => '52210037',
    'fecha_creacion' => '1998-11-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SIMON BOLIVAR',
    'departamento' => 'Beni',
    'provincia' => 'Yacuma',
    'direccion' => 'CALLE GERMAN BUSCH',
    'RUE' => '52210031',
    'fecha_creacion' => '1990-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'MAGDALENA',
    'departamento' => 'Beni',
    'provincia' => 'General José Ballivián',
    'direccion' => 'CALLE LUIS SUAREZ Y WALTER HORRUN',
    'RUE' => '82160092',
    'fecha_creacion' => '1978-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CONSUELO GONZALES GONZALES',
    'departamento' => 'Beni',
    'provincia' => 'General José Ballivián',
    'direccion' => 'CALLE SANTA CRUZ',
    'RUE' => '82210038',
    'fecha_creacion' => '1992-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => '6 DE ENERO',
    'departamento' => 'Beni',
    'provincia' => 'Marbán',
    'direccion' => 'CMD. EL COZAR',
    'RUE' => '82210037',
    'fecha_creacion' => '1991-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'CIRO MENDIZABAL APARICIO',
    'departamento' => 'Beni',
    'provincia' => 'Marbán',
    'direccion' => 'AV. GABRIEL RENE MORENO N° 1274',
    'RUE' => '82220134',
    'fecha_creacion' => '1994-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BENJAMIN BOWLES',
    'departamento' => 'Beni',
    'provincia' => 'Mamoré',
    'direccion' => 'AV. HEROES DEL CHACO Y PETROLERA',
    'RUE' => '82220186',
    'fecha_creacion' => '1998-12-10'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'PROF. JULIO SATONAKA RUIZ',
    'departamento' => 'Beni',
    'provincia' => 'Mamoré',
    'direccion' => 'AV. HEROES DEL CHACO Y PETROLERA',
    'RUE' => '82220218',
    'fecha_creacion' => '1998-12-31'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'BARBARITA PAZ YAMANE',
    'departamento' => 'Beni',
    'provincia' => 'Iténez',
    'direccion' => 'CALLE 11 DE OCTUBRE Y ANTONIO PEREZ',
    'RUE' => '82220200',
    'fecha_creacion' => '1988-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'OROMOMO DEL SECURE II',
    'departamento' => 'Beni',
    'provincia' => 'Iténez',
    'direccion' => 'OROMOMO',
    'RUE' => '82190177',
    'fecha_creacion' => '1982-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => 'SAN IGNACIO DE LOYOLA',
    'departamento' => 'Beni',
    'provincia' => 'Ballivián',
    'direccion' => 'CALLE SANTIESTEBAN ESQUINA BOLIVAR',
    'RUE' => '82190144',
    'fecha_creacion' => '1990-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "VIKARAWA 'U VIMUTU",
    'departamento' => 'Beni',
    'provincia' => 'Cercado',
    'direccion' => 'CENTRAL',
    'RUE' => '82190165',
'fecha_creacion' => '1998-10-04'
]);

//pando


Colegio::firstOrCreate([
    'nombreColegio' => "PROF. GUEISA VACA TORREZ",
    'departamento' => 'Pando',
    'provincia' => 'Abuná',
    'direccion' => 'MIRAFLORES',
    'RUE' => '82460033',
    'fecha_creacion' => '1983-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "PROF. RODOLFO YUBANERA DURY",
    'departamento' => 'Pando',
    'provincia' => 'Abuná',
    'direccion' => 'AV. 18 DE MAYO S/N',
    'RUE' => '82470071',
    'fecha_creacion' => '1998-12-13'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "SIMON BOLIVAR",
    'departamento' => 'Pando',
    'provincia' => 'Manuripi',
    'direccion' => 'SIN URBANIZACION',
    'RUE' => '82450014',
    'fecha_creacion' => '1991-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "PROF. RONALDO PARADA JIMENEZ",
    'departamento' => 'Pando',
    'provincia' => 'Manuripi',
    'direccion' => 'CMD. NAREUDA',
    'RUE' => '62480023',
    'fecha_creacion' => '1978-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "15 DE ABRIL",
    'departamento' => 'Pando',
    'provincia' => 'Nicolás Suárez',
    'direccion' => 'CMO. SAN PEDRO DE BOLPEBRA',
    'RUE' => '62480014',
    'fecha_creacion' => '1998-12-04'
]);


Colegio::firstOrCreate([
    'nombreColegio' => "21 DE MARZO",
    'departamento' => 'Pando',
    'provincia' => 'Nicolás Suárez',
    'direccion' => 'CENTRAL SANTA TERESA',
    'RUE' => '62440032',
    'fecha_creacion' => '1998-10-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "CASTAÑAL",
    'departamento' => 'Pando',
    'provincia' => 'Madre de Dios',
    'direccion' => 'CASTAÑAL BARRIO CASTAÑAL',
    'RUE' => '82480069',
    'fecha_creacion' => '1998-12-14'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "MANUELA ROJAS DE DOMINGUEZ",
    'departamento' => 'Pando',
    'provincia' => 'Madre de Dios',
    'direccion' => 'BARRIO CACIQUE',
    'RUE' => '82480048',
    'fecha_creacion' => '1998-11-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "SIMON BOLIVAR",
    'departamento' => 'Pando',
    'provincia' => 'Federico Roman',
    'direccion' => 'BARRIO PERLA DEL ACRE PERLA DEL ACRE S/N',
    'RUE' => '82480053',
    'fecha_creacion' => '1999-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "MARCELO QUIROGA SANTA CRUZ",
    'departamento' => 'Pando',
    'provincia' => 'Federico Roman',
    'direccion' => 'BARRIO PERLA DEL ACRE PERLA DEL ACRE S/N',
    'RUE' => '82480060',
    'fecha_creacion' => '1992-12-04'
]);

Colegio::firstOrCreate([
    'nombreColegio' => "MARIANO BAPTISTA",
    'departamento' => 'Pando',
    'provincia' => 'Federico Roman',
    'direccion' => 'CENTRAL AV. 9 DE FEBRERO Y ALEMANIA',
    'RUE' => '82480002',
    'fecha_creacion' => '1995-12-04'
])
;
    }
}
