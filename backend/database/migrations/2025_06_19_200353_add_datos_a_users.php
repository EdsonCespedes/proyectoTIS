<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDatosAUsers extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('apellido')->nullable()->change();
            $table->boolean('eliminado')->nullable()->default(false)->change();
            $table->string('rol')->nullable()->default(null)->change();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('apellido')->nullable(false)->change();
            $table->boolean('eliminado')->default(false)->nullable(false)->change();
            $table->string('rol')->default('tutor')->nullable(false)->change();
        });
    }
}

