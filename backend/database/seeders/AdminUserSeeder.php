<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
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
        // Crear el usuario
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrador',
                'apellido' => 'General',
                'password' => Hash::make('admin123'), // Cambia la contraseña segura
                'email_verified_at' => now(),
                'eliminado' => true,
                'rol' => 'admin',
            ]
        );

        // Asignar el rol
        $admin->assignRole('admin');
    }
}
