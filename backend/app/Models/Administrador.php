<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    use HasFactory;

    protected $table = 'administradors'; // Laravel usa el plural automáticamente
    protected $primaryKey = 'idAdmin';

    protected $fillable = [
        'new_column', // agrega tus columnas aquí
    ];

    public $timestamps = false; // si no usas created_at / updated_at

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'idAdmin', 'idAdmin');
    }
}
