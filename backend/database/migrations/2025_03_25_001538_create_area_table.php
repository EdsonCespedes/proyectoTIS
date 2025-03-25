<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('area', function (Blueprint $table) {
            $table->increments('idArea');
            $table->string('tituloArea', 45)->nullable();
            $table->string('descArea', 45)->nullable();
            $table->boolean('activo')->default(false);
            $table->unsignedInteger('idConvocatoria');
            $table->foreign('idConvocatoria')->references('idConvocatoria')->on('convocatoria')->onDelete('cascade');
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
        Schema::dropIfExists('area');
    }
}
