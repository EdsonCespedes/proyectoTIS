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
        'idPostulante',
        'nombrePost',
        'apellidoPost',
        'carnet',
        'fechaNacPost',
        'correoPost',
        'telefonoPost',
        'departamento',
        'provincia',
        'curso',
        'idColegio',
        'idDelegacion',
        'idTutor',
        'idColegio',
        'colegio',
        'idDelegacion',
        'idTutor',
        'tutor'
    ];

}
