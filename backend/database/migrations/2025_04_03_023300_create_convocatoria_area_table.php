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
        Schema::disableForeignKeyConstraints();

        Schema::create('convocatoria_area', function (Blueprint $table) {
            $table->increments('idConvArea');
            $table->unsignedInteger('idConvocatoria');
            $table->foreign('idConvocatoria')->references('idConvocatoria')->on('convocatoria');
            $table->unsignedInteger('idArea');
            $table->foreign('idArea')->references('idArea')->on('area');
        });
 
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convocatoria_area');
    }
};
