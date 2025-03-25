<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDelegacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delegacion', function (Blueprint $table) {
            $table->increments('idDelegacion');
            $table->string('nombreDelegacion', 45)->nullable();
            $table->unsignedInteger('idColegio');
            $table->foreign('idColegio')->references('idColegio')->on('colegio')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('delegacion');
    }
}
