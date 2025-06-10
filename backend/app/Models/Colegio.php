<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{

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
        'estado',
    ];

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
