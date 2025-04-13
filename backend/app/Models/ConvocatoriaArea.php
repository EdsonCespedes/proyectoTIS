<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ConvocatoriaArea extends Pivot
{
    protected $table = 'convocatoria_area';
    public $timestamps = false;

    protected $fillable = [
        'idConvocatoria',
        'idArea'
    ];
}