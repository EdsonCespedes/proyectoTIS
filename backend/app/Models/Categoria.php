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
        return $this->belongsTo(Area::class, 'idArea'); // relacion d uno a muchos //uno
    }
    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'categoria_curso', 'idCategoria', 'idCurso');
    }
}
