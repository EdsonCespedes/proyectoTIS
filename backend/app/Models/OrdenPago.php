<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdenPago extends Model
{
    protected $table = 'ordenpago';
    protected $primaryKey = 'idOrdenPago';
    public $timestamps = false;
    protected $fillable = ['idTutor','montoTotal','cancelado','vigencia','recibido'];

    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'idTutor', 'idTutor');
    }

    public function recibo()
    {
        return $this->hasOne(Recibo::class, 'idOrdenPago', 'idOrdenPago');
    }

}
