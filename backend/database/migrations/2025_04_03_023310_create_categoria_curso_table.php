<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('categoria_curso', function (Blueprint $table) {
            $table->increments('idCatCurso');
            $table->unsignedInteger ('idCategoria');
            $table->foreign('idCategoria')->references('idCategoria')->on('categoria');
            $table->unsignedInteger ('idCurso');
            $table->foreign('idCurso')->references('idCurso')->on('curso');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categoria_curso');
    }
};
