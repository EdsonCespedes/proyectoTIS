<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{    protected $table = 'provincia';
    protected $fillable = ['nombre', 'idDepartamento'];

    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'idDepartamento');
    }
}
