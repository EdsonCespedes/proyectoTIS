<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('convocatoria_area', function (Blueprint $table) {
            $table->id('idConvArea');

            $table->foreignId('idConvocatoria')
                ->constrained('convocatoria')
                ->cascadeOnDelete();
            $table->foreignId('idArea')
                ->constrained('area')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('convocatoria_area');
    }
};
