<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{

    protected $table = 'curso'; 
    protected $primaryKey = 'idCurso'; 
    public $timestamps = false;

    protected $fillable = [
        'Curso'
    ];
    public function categorias()
{
    return $this->belongsToMany(Categoria::class, 'categoria_curso', 'idCurso', 'idCategoria');
}

}
