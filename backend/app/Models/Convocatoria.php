<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Convocatoria extends Model
{
    protected $table = 'convocatoria';
    protected $primaryKey = 'idConvocatoria';
    public $timestamps = false;

    protected $fillable = [
        'titulo',
        'descripcion',
        'fechaPublicacion',
        'fechaInicioInsc',
        'fechaFinInsc',
        'portada',
        'habilitada',
        'fechaInicioOlimp',
        'fechaFinOlimp',
        'maximoPostPorArea'
    ];

    // Relación CORREGIDA (usa belongsToMany si es tabla pivote)
    public function areas()
    {
        return $this->belongsToMany(Area::class, 'convocatoria_area', 'idConvocatoria', 'idArea')
                    ->where('habilitada', true);
    }
    public function cursos()
{
    return $this->hasMany(Curso::class, 'idConvocatoria');
}

}