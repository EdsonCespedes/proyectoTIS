<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class NewConvocationNotification extends Notification
{
    private $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    // Define que se enviará por correo
    public function via($notifiable)
    {
        return ['mail'];
    }

    // Construye el correo que recibirá el tutor
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Nueva convocatoria publicada')
                    ->greeting('Hola ' . $notifiable->nombreTutor . ',')
                    ->line($this->message)
                    ->line('Gracias por estar atento a nuestras convocatorias.')
                    ->salutation('Saludos, El equipo de soporte');
    }
}
