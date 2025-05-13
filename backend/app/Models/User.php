<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use app\Models\Convocatoria;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'apellido',
        'email',
        'password',
        'eliminado'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function tutor()
    {
        return $this->hasOne(Tutor::class, 'idUser');
    }

    public function convocatorias()
    {
        return $this->belongsToMany(
            Convocatoria::class,
            'convocatoria_user_role',
            'user_id',
            'convocatoria_id'
        )
        ->withPivot('role_id')
        ->withTimestamps();
    }

    public function convocatoriaRoles()
    {
        return $this->belongsToMany(
            Role::class,
            'convocatoria_user_role',
            'user_id',
            'role_id'
        )->withPivot('convocatoria_id')
         ->withTimestamps();
    }
}
