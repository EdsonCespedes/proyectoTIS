<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Postulacion extends Model
{
    protected $table = 'postulacion';
    protected $primaryKey = 'idPostulacion';
    public $timestamps = false;

    protected $fillable = [
        'idCategoria',
        'idPostulante'
    ];

    public function postulante()
    {
        return $this->belongsTo(Postulante::class, 'idPostulante');
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'idCategoria');
    }
}
