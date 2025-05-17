<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permisos = [
            'Gestion de Convocatoria',
            'Gestion de Colegios',
            'Login, Registrar',
            'Orden Pago (OCR)',
            'Orden Pago (Vereficar)'
        ];
        
        foreach ($permisos as $p) {
            Permission::firstOrCreate(['name' => $p, 'guard_name' => 'sanctum']);
        }
    }
}
