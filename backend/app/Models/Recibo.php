<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recibo extends Model
{
    use HasFactory;

    // Como el ID es string manual (no autoincremental)
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'idOrdenPago',
        'imagen_comprobante'
    ];

    public function ordenPago()
    {
        return $this->belongsTo(OrdenPago::class, 'idOrdenPago', 'idOrdenPago');
    }
}
