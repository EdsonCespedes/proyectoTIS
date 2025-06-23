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
            CREATE OR REPLACE FUNCTION fn_habilitar_postulante() RETURNS trigger AS $$
            BEGIN
                IF NEW.cancelado AND NEW.recibido THEN
                    UPDATE postulante
                    SET habilitado = TRUE
                    WHERE idPostulante = (
                        SELECT p.idPostulante
                        FROM pagodetalle pd
                        JOIN postulacion p ON pd.idPostulacion = p.idPostulacion
                        WHERE pd.idOrdenPago = NEW.idOrdenPago
                        LIMIT 1
                    );
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_habilitar_postulante ON ordenpago;
            CREATE TRIGGER trigger_habilitar_postulante
            AFTER UPDATE ON ordenpago
            FOR EACH ROW
            EXECUTE FUNCTION fn_habilitar_postulante();
        ");
    }

    public function down(): void
    {
        DB::unprepared("
            DROP TRIGGER IF EXISTS trigger_habilitar_postulante ON ordenpago;
            DROP FUNCTION IF EXISTS fn_habilitar_postulante();
        ");
    }
}
