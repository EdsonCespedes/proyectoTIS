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
        Schema::disableForeignKeyConstraints(); // Desactivar restricciones de clave foránea para evitar problemas durante la modificación

        // Modificar la tabla 'categoria'
        Schema::table('categoria', function (Blueprint $table) {
            $table->string('descCategoria')->nullable()->change();  // Hacer nullable el campo 'descCategoria'
        });

        // Modificar la tabla 'area'
        Schema::table('area', function (Blueprint $table) {
            $table->string('descArea')->nullable()->change(); // Hacer nullable el campo 'descArea'
            $table->boolean('habilitada')->nullable()->change();  // Hacer nullable el campo 'habilitada'
        });

        // Modificar la tabla 'colegio'
        Schema::table('colegio', function (Blueprint $table) {
            $table->string('departamento')->nullable()->change();  // Hacer nullable el campo 'departamento'
            $table->string('provincia')->nullable()->change();  // Hacer nullable el campo 'provincia'
        });

        // Modificar la tabla 'postulante'
        Schema::table('postulante', function (Blueprint $table) {
            $table->string('telefonoPost')->nullable()->change();  // Hacer nullable el campo 'telefonoPost'
        });

        // Modificar la tabla 'tutor'
        Schema::table('tutor', function (Blueprint $table) {
            $table->string('telefonoTutor')->nullable()->change();  // Hacer nullable el campo 'telefonoTutor'
        });

        Schema::enableForeignKeyConstraints(); // Reactivar las restricciones de clave foránea
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        // Revertir los cambios en la tabla 'categoria'
        Schema::table('categoria', function (Blueprint $table) {
            $table->string('descCategoria')->nullable(false)->change(); // Volver a no nullable
        });

        // Revertir los cambios en la tabla 'area'
        Schema::table('area', function (Blueprint $table) {
            $table->string('descArea')->nullable(false)->change(); // Volver a no nullable
            $table->boolean('habilitada')->nullable(false)->change(); // Volver a no nullable
        });

        // Revertir los cambios en la tabla 'colegio'
        Schema::table('colegio', function (Blueprint $table) {
            $table->string('departamento')->nullable(false)->change(); // Volver a no nullable
            $table->string('provincia')->nullable(false)->change(); // Volver a no nullable
        });

        // Revertir los cambios en la tabla 'postulante'
        Schema::table('postulante', function (Blueprint $table) {
            $table->string('telefonoPost')->nullable(false)->change(); // Volver a no nullable
        });

        // Revertir los cambios en la tabla 'tutor'
        Schema::table('tutor', function (Blueprint $table) {
            $table->string('telefonoTutor')->nullable(false)->change(); // Volver a no nullable
        });

        Schema::enableForeignKeyConstraints();
    }
};
