<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrdenPagoDenegado extends Notification
{
    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Orden de Pago Denegada')
            ->greeting('Hola ' . $notifiable->nombreTutor)
            ->line('Tu orden de pago ha sido denegada.')
            ->salutation('Saludos.');
    }
}
