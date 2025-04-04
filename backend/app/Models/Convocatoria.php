<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Convocatoria extends Model
{
    use HasFactory;
    protected $primaryKey = 'idConvocatoria';
    protected $fillable = [
        'idConvocatoria',
        'fechaPublicacion',
        'fechaInicioInsc',
        'fechaFinInsc',
        'activo',
        'fechaInicioOlimp',
        'fechaFinOlimp',
        'maximoPostPorArea'
    ];
}
