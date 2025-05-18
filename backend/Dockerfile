# backend/Dockerfile

FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy backend files
COPY . .

# Install PHP dependencies
# RUN composer install --no-interaction --prefer-dist --optimize-autoloader
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && php artisan config:clear \
    && php artisan optimize
# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

# Expose port
EXPOSE 8000

CMD php artisan config:cache && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000
