<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postulante extends Model
{
    use HasFactory;

    protected $table = 'postulante';

    protected $primaryKey = 'idPostulante';

    protected $fillable = [
        'nombrePost',
        'apellidoPost',
        'carnet',
        'fechaNaciPost',
        'correoPost',
        'telefonoPost',
        'departamento',
        'provincia',
        'idTutor',
        'idColegio',
        'idDelegacion',
        'idCurso',
    ];
}
