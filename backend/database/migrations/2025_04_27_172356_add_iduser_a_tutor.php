<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIduserATutor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tutor', function (Blueprint $table) {
            $table->unsignedBigInteger('idUser')->nullable()->after('idTutor'); // después de idTutor
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tutor', function (Blueprint $table) {
            $table->dropForeign(['idUser']);
            $table->dropColumn('idUser');
        });
    }
}
