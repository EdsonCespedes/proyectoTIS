<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('convocatoria', function (Blueprint $table) {
            $table->increments('idConvocatoria');
            $table->date('fechaPublicacion');
            $table->date('fechaInicioInsc');
            $table->date('fechaFinInsc');
            $table->string('portada');
            $table->boolean('habilitada');
            $table->date('fechaInicioOlimp');
            $table->date('fechaFinOlimp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convocatoria');
    }
};
