<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('convocatoria', function (Blueprint $table) {
            $table->increments('idConvocatoria');
            $table->dateTime('fechaPublicacion')->nullable();
            $table->dateTime('fechaInicioInsc')->nullable();
            $table->dateTime('fechaFinInsc')->nullable();
            $table->string('portada', 255)->nullable();
            $table->boolean('habilitada')->default(false);
            $table->dateTime('fechaInicioOlimp')->nullable();
            $table->dateTime('fechaFinOlimp')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('convocatoria');
    }
};
