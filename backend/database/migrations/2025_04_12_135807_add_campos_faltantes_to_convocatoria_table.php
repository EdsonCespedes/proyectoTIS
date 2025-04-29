<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCamposFaltantesToConvocatoriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::table('convocatoria', function (Blueprint $table) {
        $table->string('tituloConvocatoria')->after('idConvocatoria');
        $table->text('descripcion')->nullable()->after('tituloConvocatoria');
        $table->integer('maximoPostPorArea')->after('fechaFinOlimp');
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('convocatoria', function (Blueprint $table) {
            //
        });
    }
}
