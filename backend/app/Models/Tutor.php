<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use App\Models\Postulante;
use App\Models\User;
use App\Models\OrdenPago;
use Illuminate\Notifications\Notifiable;  // Importa Notifiable

class Tutor extends Model
{
    use HasFactory, Notifiable, LogsActivity;

    protected $table = 'tutor';
    protected $primaryKey = 'idTutor';
    public $timestamps = false;

    protected $fillable = [
        'idUser',

        'nombreTutor',
        'apellidoTutor',
        'correoTutor',
        'telefonoTutor',
        'fechaNaciTutor'
    ];

    protected static $logAttributes = [
        'idUser',
        'nombreTutor',
        'apellidoTutor',
        'correoTutor',
        'telefonoTutor',
        'fechaNaciTutor',
    ];

    protected static $logOnlyDirty = true;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('tutores')            
            ->logOnly($this->fillable)       
            ->logOnlyDirty()         
            ->dontSubmitEmptyLogs();               
    }

    public function getDescriptionForEvent(string $eventName): string
    {
        return "Tutor fue {$eventName}";
    }

    public function postulantes()
    {
        return $this->hasMany(Postulante::class, 'idTutor');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser', 'id');
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
