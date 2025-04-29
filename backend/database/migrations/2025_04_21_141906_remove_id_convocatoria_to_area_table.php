<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveIdConvocatoriaToAreaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('area', function (Blueprint $table) {
            $table->dropColumn('idConvocatoria');  // Eliminar la columna 'idConvocatoria'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('area', function (Blueprint $table) {
            //
        });
    }
}
