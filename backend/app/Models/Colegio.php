<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Support\Facades\DB;

class Colegio extends Model
{
    use HasFactory, LogsActivity;
    
    protected $table = 'colegio';
    protected $primaryKey = 'idColegio';
    public $timestamps = false;

    protected $fillable = [
        'nombreColegio',
        'departamento',
        'provincia',
        'RUE',
        'direccion',
        'fecha_creacion',
    ];

     protected static $logName = 'colegio';
    protected static $logAttributes = [
        'nombreColegio',
        'departamento',
        'provincia',
        'RUE',
        'direccion',
        'fecha_creacion',
    ];
    protected static $logOnlyDirty = true;

    public function getDescriptionForEvent(string $eventName): string
    {
        return "Colegio fue {$eventName}";
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('colegios')
            ->logOnly($this->fillable)
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public static function obtenerDatosColegio()
    {
        return self::all();
    }

    public static function buscarOCrearPorNombre($nombre)
    {
        $colegio = DB::table('colegio')->where('nombreColegio', $nombre)->first();
        if ($colegio) {
            return $colegio->idColegio;
        }
        return DB::table('colegio')->insertGetId([
            'nombreColegio' => $nombre,
            'departamento'  => 'Sin definir',
            'provincia'     => 'Sin definir',
            'RUE'           => 'Sin definir',
            'direccion'     => 'Sin definir',
            'fecha_creacion' => date('Y-m-d') // fecha actual
        ]);
    }
}
