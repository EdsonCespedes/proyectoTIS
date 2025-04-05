<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{
    public $timestamps = false;

    
    protected $table = 'colegio';
    protected $primaryKey = 'idColegio';
    protected $fillable = ['nombreColegio', 'departamento', 'provincia'];
    public static function obtenerDatosColegio()
    {
        return self::all();
    }
    
}
