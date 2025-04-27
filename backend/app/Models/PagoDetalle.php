<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagoDetalle extends Model
{
    use HasFactory;
    protected $table = 'pagodetalle';
    protected $primaryKey = 'idPagoDet';
    protected $fillable = ['idOrdenPago','idPostulacion','descripcion','monto'];
}
