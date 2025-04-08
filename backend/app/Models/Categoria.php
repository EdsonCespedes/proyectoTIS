<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categoria'; 
    protected $primaryKey = 'idCategoria'; 

    public $timestamps = false;

    protected $fillable = [
        'nombreCategoria',
        'descCategoria',
        'idArea'
    ];

    public function area()
    {
        return $this->belongsTo(Area::class, 'idArea');
    }
}
