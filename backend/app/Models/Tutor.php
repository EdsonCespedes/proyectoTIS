<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;  // Importa Notifiable

class Tutor extends Model
{
    use Notifiable; // Usa el trait Notifiable

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

    public function ordenesPago()
    {
        return $this->hasMany(OrdenPago::class, 'idTutor', 'idTutor');
    }

    // Esto indica que para enviar email use el campo correoTutor
    public function routeNotificationForMail()
    {
        return $this->correoTutor;
    }
}
