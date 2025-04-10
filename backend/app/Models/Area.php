<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $table = 'area';
    protected $primaryKey = 'idArea';
    public $timestamps = false;

    protected $fillable = [
        'tituloArea',
        'descArea',
        'habilitada',
        'idConvocatoria'
    ];
    public function categorias()
    {
        return $this->hasMany(Categoria::class, 'idArea'); //relacion d uno a muchos //muchos
    }

}
