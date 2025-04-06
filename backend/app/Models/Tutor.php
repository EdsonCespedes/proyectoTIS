<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    
    protected $table = 'tutor';
    protected $primaryKey = 'idTutor';
    public $timestamps = false;

    protected $fillable = [
        'nombreTutor',
        'apellidoTutor',
        'correoTutor',
        'telefonoTutor',
        'fechaNaciTutor'
    ];

    public function postulantes()
    {
        return $this->hasMany(Postulante::class, 'idTutor');
    }
}
