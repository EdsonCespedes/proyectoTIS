<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTriggerHabilitarPostulanteV2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */public function up(): void
    {
        DB::unprepared("
            CREATE TRIGGER trigger_habilitar_postulante
            AFTER UPDATE ON ordenpago
            FOR EACH ROW
            BEGIN
                IF NEW.cancelado = 1 AND NEW.recibido = 1 THEN
                    UPDATE postulante
                    SET habilitado = 1
                    WHERE idPostulante = (
                        SELECT p.idPostulante
                        FROM pagodetalle pd
                        JOIN postulacion p ON pd.idPostulacion = p.idPostulacion
                        WHERE pd.idOrdenPago = NEW.idOrdenPago
                        LIMIT 1
                    );
                END IF;
            END
        ");
    }

    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS trigger_habilitar_postulante');
    }
}
