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
        Schema::create('categoria', function (Blueprint $table) {
            $table->increments('idCategoria');
            $table->string('nombreCategoria');
            $table->string('descCategoria')->nullable();
            $table->integer('maxPost')->nullable();
            $table->unsignedInteger  ('idArea');
            $table->foreign('idArea')->references('idArea')->on('area');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categoria');
    }
};
