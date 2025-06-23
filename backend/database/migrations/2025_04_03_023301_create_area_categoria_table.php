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

        Schema::create('area_categoria', function (Blueprint $table) {
            $table->id('idAreaCat');
            $table->foreignId('idArea')
                ->constrained('area')
                ->cascadeOnDelete();
            $table->foreignId('idCategoria')
                ->constrained('categoria')
                ->cascadeOnDelete();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('area_categoria');
    }
};
