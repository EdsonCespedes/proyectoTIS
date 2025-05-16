<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutor;
use App\Notifications\NewConvocationNotification;

class TutorNotificationController extends Controller
{
    public function notifyAllTutors(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $message = $request->message;

        $tutores = Tutor::all();

        foreach ($tutores as $tutor) {
            $tutor->notify(new NewConvocationNotification($message));
        }

        return response()->json(['message' => 'Notificación enviada a todos los tutores'], 200);
    }
}
