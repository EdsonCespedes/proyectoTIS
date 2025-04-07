<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Convocatoria extends Model
{
<<<<<<< HEAD
=======
    // protected $table = 'convocatoria';
>>>>>>> 407c01855f01ed9f35c681dd7555977822c4ec2f
    protected $table = 'convocatoria';
    protected $primaryKey = 'idConvocatoria';
    public $timestamps = false;

    protected $fillable = [
        'fechaPublicacion',
        'fechaInicioInsc',
        'fechaFinInsc',
        'portada',
        'habilitada',
        'fechaInicioOlimp',
        'fechaFinOlimp',
        'maximoPostPorArea'
    ];
}
