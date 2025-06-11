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
            'La Paz'      => ['Murillo', 'Ingavi', 'Pacajes','Abel Iturralde', 'Larecaja', 'Los Andes', 'Nor Yungas', 'Caranavi', 'Bautista Saavedra','Gualberto Villarroel','José Manuel Pando','Omasuyos','Pedro Domingo Murillo','Sud Yungas','Muñecas','Manco Kapac','Jose Ramon Loaysa','Inquisivi','Franz Tamayo','Eliodoro Camacho','Aroma'],
            'Cochabamba'  => ['Cercado', 'Quillacollo', 'Chapare','Bolivar', 'Tiraque', 'Ayopaya', 'Arani', 'Tapacari', 'Narciso Campero', 'Esteban Arce','Punata','Arque','German Jordán','Capinota','Carrasco','Mizque'],
            'Santa Cruz'  => ['Andrés Ibáñez', 'José Miguel de Velasco', 'Vallegrande','Sara','Obispo Santistevan','Ñuflo de Chávez','Manuel María Caballero','Ignacio Warnes','Ichilo','Guarayos','Germán Busch','Florida','Cordillera','Chiquitos','Ángel Sandóval'],
            'Oruro'       => ['Mejillones', 'Carangas','Tomas Barron','Pataleon Dalence','Poopó','Eduardo Abaroa','Sebastian Pagador','Saucari','Nor Carangas','San Pedro de Totora','Sud Carangas','Ladisalo Cabrera','Litoral','Sajama','Sabaya'],
            'Potosí'      => ['Tomás Frías', 'Sur Lipez', 'Nor Chichas','Sur Chichas','Rafael Bustillos','Nor Lipez','Modesto Omiste','Daniel Campos','José María Linares','Enrrique Baldivieso','Cornelio Saavedra','Chayanta','Charcas','Bernardino Bilbao','Antonio Quijarro'],
            'Chuquisaca'  => ['Oropeza', 'Zudáñez', 'Tomina','Belisario Boeto','Hernandos Siles','Jaime Zudañez','Jose Maria Avilés','Luis Calvo','Nor Cinti','Sud Cinti'],
            'Tarija'      => ['Gran Chaco', 'Aniceto Arce', 'José María Avilés','Burnet O’Connor','Eustaquio Méndez','Cercado'],
            'Beni'        => ['Moxos', 'Yacuma', 'General José Ballivián','Marbán','Mamoré','Iténez','Ballivián','Cercado'],
            'Pando'       => ['Abuná', 'Manuripi', 'Nicolás Suárez','Madre de Dios','Federico Roman'],
        ];

        foreach ($provincias as $departamento => $lista) {
            $idDepto = DB::table('departamento')
                ->where('nombreDepartamento', $departamento)
                ->value('idDepartamento');

            if (!$idDepto) {
                echo "❌ Departamento no encontrado: $departamento\n";
                continue; // sigue con el siguiente departamento
            }

            echo "✅ Insertando provincias de: $departamento (ID: $idDepto)\n";

            foreach ($lista as $provincia) {
                try {
                    DB::table('provincia')->insert([
                        'nombreProvincia' => $provincia,
                        'idDepartamento'  => $idDepto,
                    ]);
                    echo "   → Provincia insertada: $provincia\n";
                } catch (\Exception $e) {
                    echo "   ⚠️ Error al insertar $provincia: " . $e->getMessage() . "\n";
                }
            }
        }
    }
}