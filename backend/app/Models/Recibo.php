<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use App\Models\OrdenPago;

class Recibo extends Model
{
    use HasFactory, LogsActivity;

    // Como el ID es string manual (no autoincremental)
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'idOrdenPago',
        'imagen_comprobante'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('recibos')
            ->logOnly($this->fillable)
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function ordenPago()
    {
        return $this->belongsTo(OrdenPago::class, 'idOrdenPago', 'idOrdenPago');
    }
}
