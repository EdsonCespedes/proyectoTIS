<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Tutor;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // Crear el usuario Admin, el superusuario
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrador',
                'apellido' => 'General',
                'password' => Hash::make('admin123'), // Cambia la contraseña segura
                'email_verified_at' => now(),
                'eliminado' => true,
                'rol' => 'Admin',
            ]
        );

        // Asignar el rol
        $admin->assignRole('Admin');

        //crea el tutor asociado al superusuario
        Tutor::create([
            'idUser' => $admin->id,
            'nombreTutor' => $admin->name,
            'apellidoTutor' => $admin->apellido, 
            'correoTutor' => $admin->email,
            'telefonoTutor' => "",
            'fechaNaciTutor' => '1970-01-01',
        ]);
    }
}
