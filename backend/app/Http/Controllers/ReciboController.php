<?php

namespace App\Http\Controllers;

use App\Models\Recibo;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

class ReciboController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|string|unique:recibos,id',
            'idOrdenPago' => 'required|exists:ordenpago,idOrdenPago',
            'imagen_comprobante' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $path = $request->file('imagen_comprobante')->store('recibos', 'public');

        // Crear el recibo
        $recibo = Recibo::create([
            'id' => $request->id,
            'idOrdenPago' => $request->idOrdenPago,
            'imagen_comprobante' => $path,
        ]);

        return response()->json([
            'message' => 'Recibo creado correctamente.',
            'data' => $recibo,
        ], 201);
    }

    public function show($id)
    {
        $recibo = Recibo::findOrFail($id);
        return response()->json($recibo);
    }

    public function getByOrdenPago($idOrdenPago)
    {
        $recibos = Recibo::where('idOrdenPago', $idOrdenPago)->get();

        foreach ($recibos as $r) {
            if ($r->imagen_comprobante) {
                $r->imagen_comprobante = Storage::disk('public')->url($r->imagen_comprobante);
            }
        }

        return response()->json($recibos);
    }

}
