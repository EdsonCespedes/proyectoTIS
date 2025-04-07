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

    public function colegio()
    {
        return $this->belongsTo(Colegio::class, 'idColegio');
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'idTutor');
    }

    public function delegacion()
    {
        return $this->belongsTo(Delegacion::class, 'idDelegacion');
    }

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'idCurso');
    }

    public function postulaciones()
    {
        return $this->hasMany(Postulacion::class, 'idPostulante');
    }
}