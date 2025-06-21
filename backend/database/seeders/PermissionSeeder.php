<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // $permisos = [
        //     'Gestion de Convocatoria',
        //     'Gestion de Colegios',
        //     'Login, Registrar',
        //     'Orden Pago (OCR)',
        //     'Orden Pago (Vereficar)'
        // ];

        $permisos = [
            'Gestion de Convocatoria',
            'Gestion de Convocatorias',
            'Gestion de Colegios',
            'Gestion y Registro de Usuarios',
            'Gestion de Ordenes de Pago',
            'Visualizacion de Logs',
            'Hacer Reportes'
        ];
        
        foreach ($permisos as $p) {
            Permission::firstOrCreate(['name' => $p, 'guard_name' => 'sanctum']);
        }
    }
}
