<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use App\Models\Colegio;
use App\Models\Tutor;
use App\Models\Delegacion;
use App\Models\Curso;
use App\Models\Postulacion;

class Postulante extends Model
{
    use HasFactory, LogsActivity;

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
        'delegacion',
        'idCurso',
    ];

    protected static $logName = 'postulante';
    protected static $logAttributes = [
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
        'delegacion',
        'idCurso',
    ];
    protected static $logOnlyDirty = true;

    public function getDescriptionForEvent(string $eventName): string
    {
        return "Postulante fue {$eventName}";
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('postulantes')
            ->logOnly($this->fillable)
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

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
        return $this->belongsTo(Delegacion::class, 'delegacion');
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