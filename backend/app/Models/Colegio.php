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
    ];

    public static function obtenerDatosColegio()
    {
        return self::all();
    }
}
