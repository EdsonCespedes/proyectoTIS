<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CategoriaCurso extends Pivot
{
    protected $table = 'categoria_curso';
    public $timestamps = false;

    protected $fillable = [
        'idCategoria',
        'idCurso'
    ];
}
