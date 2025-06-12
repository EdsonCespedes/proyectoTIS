<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHabilitadoToPostulanteTable extends Migration
{
    public function up(): void
    {
        Schema::table('postulante', function (Blueprint $table) {
            $table->boolean('habilitado')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('postulante', function (Blueprint $table) {
            $table->dropColumn('habilitado');
        });
    }
}
