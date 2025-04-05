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

        Schema::create('tutor', function (Blueprint $table) {
            $table->increments('idTutor');
            $table->string('nombreTutor');
            $table->string('apellidoTutor');
            $table->string('correoTutor');
            $table->string('telefonoTutor');
            $table->date('fechaNaciTutor');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutor');
    }
};
