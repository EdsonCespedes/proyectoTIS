<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use App\Models\Area;
use App\Models\Curso;
use App\Models\Categoria;
use App\Models\User;
use Spatie\Permission\Models\Role;

class Convocatoria extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'convocatoria';
    protected $primaryKey = 'idConvocatoria';
    public $timestamps = false;

    protected $fillable = [
        'tituloConvocatoria',
        'descripcion',
        'fechaPublicacion',
        'fechaInicioInsc',
        'fechaFinInsc',
        'portada',
        'habilitada',
        'fechaInicioOlimp',
        'fechaFinOlimp',
        'maximoPostPorArea',
        'eliminado'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('convocatorias')
            ->logOnly($this->fillable)
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function eliminarConvocatoria()
    {
        $this->eliminado = true;
        $this->save();
    }

    public function scopeNoEliminado($query)
    {
        return $query->where('eliminado', true);
    }




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

    public function categorias()
    {
        return $this->hasMany(Categoria::class, 'idConvocatoria'); //relacion d uno a muchos //muchos
    }

    public function usersRoles()
    {
        return $this->belongsToMany(
            User::class,
            'convocatoria_user_role',
            'convocatoria_id',
            'user_id'
        )->withPivot('role_id')->withTimestamps();
    }

    public function roles()
    {
        return $this->belongsToMany(
            Role::class,
            'convocatoria_role',
            'convocatoria_id',
            'role_id'
        )->withTimestamps();
    }

    public function users()
    {
        return $this->belongsToMany(
            \App\Models\User::class,
            'convocatoria_user_role',
            'convocatoria_id',
            'user_id'
        )
        ->withPivot('role_id')
        ->withTimestamps();
    }

}