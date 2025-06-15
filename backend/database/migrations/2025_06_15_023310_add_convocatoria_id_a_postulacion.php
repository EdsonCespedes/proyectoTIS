<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddConvocatoriaIdAPostulacion extends Migration
{
    public function up(): void
    {
        Schema::table('postulacion', function (Blueprint $table) {
            $table->unsignedInteger('idConvocatoria')->nullable()->after('idPostulante');
            $table->foreign('idConvocatoria')
                  ->references('idConvocatoria')
                  ->on('convocatoria')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('postulacion', function (Blueprint $table) {
            $table->dropForeign(['idConvocatoria']);
            $table->dropColumn('idConvocatoria');
        });
    }
}
