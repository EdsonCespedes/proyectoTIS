<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('convocatoria_area', function (Blueprint $table) {
            $table->increments('idConvArea');

            $table->unsignedInteger('idConvocatoria');
            $table->unsignedInteger('idArea');

            $table->foreign('idConvocatoria')->references('idConvocatoria')->on('convocatoria')->onDelete('cascade');
            $table->foreign('idArea')->references('idArea')->on('area')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('convocatoria_area');
    }
};
