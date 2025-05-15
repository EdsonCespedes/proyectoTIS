<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPasswordNotification extends Notification
{
    private $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        \Log::info('Enviando correo a: ' . $notifiable->email);

        $url = config('app.url') . '/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        \Log::info('URL en notificación: ' . $url);

        return (new MailMessage)
            ->greeting('Hola,')
            ->line('Hemos recibido una solicitud para restablecer tu contraseña.')
            ->action('Restablecer mi contraseña', $url)
            ->line('Este enlace expirará en 60 minutos.')
            ->line('Si no solicitaste un restablecimiento, ignora este correo.')
            ->salutation('Saludos, El equipo de soporte');
    }
}

