<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'pagos';
    protected $primaryKey = 'idPago';

    protected $fillable = [
        'idAdmin',
        'idOrden',
    ];

    public $timestamps = false;

    public function administrador()
    {
        return $this->belongsTo(Administrador::class, 'idAdmin', 'idAdmin');
    }
}
