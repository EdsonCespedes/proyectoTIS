# Proyecto TIS

Este proyecto esta dividido en dos partes:

- **Backend:** Laravel 8 (PHP 7.4.22)
- **Frontend:** React

## 🔧 Pre-requisitos

| Software | Versión | Descripción |
|----------|---------|-------------|
| PHP | 7.4.22 | [Descargar PHP 7.4.22](https://windows.php.net/downloads/releases/archives/php-7.4.22-Win32-vc15-x64.zip) |
| Composer | Última | Gestor de dependencias de PHP |
| Node.js | 20.10.0 | Entorno de ejecución para JavaScript |
| npm | Incluido con Node.js | Gestor de paquetes de Node.js |

### Configuración de PHP

1. Después de instalar PHP, localiza el archivo `php.ini`
2. Habilita la extensión `fileinfo` descomentando la línea:
   ```ini
   extension=fileinfo
   ```

### Verificación del Entorno

Ejecuta estos comandos para verificar que todo está instalado:

```bash
php -v
composer --version
node -v
npm -v
```

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/EdsonCespedes/proyectoTIS.git
cd proyectoTIS
```

### 2. Configurar Backend

```bash
# Navegar al directorio del backend
cd backend

composer install

# Configurar el archivo .env
cp .env.example .env
php artisan key:generate

# Iniciar el servidor
php artisan serve
```
El backend se ejecutará en http://127.0.0.1:8000

### 3. Configurar Frontend

```bash
# Navegar al directorio del frontend
cd ../frontend

npm install

# Iniciar la aplicación
npm start
```
El frontend se ejecutará en http://127.0.0.1:3000