<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Postulante extends Model
{
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
        'idCurso'
    ];

    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'idTutor');
    }

    public function postulaciones()
    {
        return $this->hasMany(Postulacion::class, 'idPostulante');
    }
}
