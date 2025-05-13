<?php
namespace Spatie\Permission\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    // …
    public function convocatorias()
    {
        return $this->belongsToMany(
            \App\Models\Convocatoria::class,
            'convocatoria_role',
            'role_id',
            'convocatoria_id'
        )->withTimestamps();
    }
}