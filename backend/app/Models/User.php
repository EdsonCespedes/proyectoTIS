<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use App\Models\Convocatoria;
use App\Models\Tutor;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Activitylog\Traits\LogsActivity;


use Illuminate\Contracts\Auth\CanResetPassword;
use App\Notifications\CustomResetPasswordNotification; // Agregar la importación


class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, LogsActivity;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected static $logAttributes = ['name', 'apellido', 'email'];
    protected static $logName       = 'user_log';
    protected static $logOnlyDirty  = true;
    protected static $submitEmptyLogs = false;

    public function getDescriptionForEvent(string $eventName): string
    {
        return "Usuario fue {$eventName}";
    }

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

    public function tutor(): HasOne
    {
        return $this->hasOne(Tutor::class, 'idUser');
    }

    public function convocatorias(): BelongsToMany
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

    public function convocatoriaRoles(): BelongsToMany
    {
        return $this->belongsToMany(
            Role::class,
            'convocatoria_user_role',
            'user_id',
            'role_id'
        )->withPivot('convocatoria_id')
         ->withTimestamps();
        }

    /**
     * Sobrescribir la notificación para el restablecimiento de contraseña.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPasswordNotification($token)); // Usar la notificación personalizada

    }
}
