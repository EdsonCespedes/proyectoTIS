<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->integer('idPago')->primary(); // clave primaria personalizada
            $table->integer('idAdmin'); // clave foránea
            $table->integer('idOrden')->nullable();
            $table->timestamps();

            $table->foreign('idAdmin')
                ->references('idAdmin')
                ->on('administradors')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pagos');
    }
}
