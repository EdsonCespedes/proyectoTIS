<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrdenPagoCorrecto extends Notification
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Orden de Pago Completada')
            ->greeting('Hola ' . $notifiable->nombreTutor)
            ->line('Tu orden de pago ha sido procesada correctamente.')
            ->line('Gracias por usar nuestra plataforma.');
    }
}
