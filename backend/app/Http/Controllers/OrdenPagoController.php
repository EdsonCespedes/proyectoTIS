<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutor;
use App\Models\OrdenPago;
use App\Notifications\OrdenPagoCorrecto;
use App\Notifications\OrdenPagoDenegado;

use Illuminate\Support\Facades\Notification;

//use App\Models\Pago;
use App\Models\PagoDetalle;
use Illuminate\Support\Facades\DB;


class OrdenPagoController extends Controller
{


    public function buscar(Request $request)
    {
        $query = $request->input('query'); // Puede ser idTutor o "nombre apellido"

        $resultados = Tutor::with('ordenesPago')
            ->where('idTutor', $query)
            ->orWhereRaw("CONCAT(nombreTutor, ' ', apellidoTutor) LIKE ?", ["%{$query}%"])
            ->get();

        return response()->json($resultados);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'idTutor'      => 'required|integer|exists:tutor,idTutor',
            'montoTotal'   => 'required|numeric|min:0',
            'vigencia'     => 'required|date',
            'cancelado'    => 'required|boolean',
            'recibido'     => 'required|boolean',
            'detalles'     => 'required|array|min:1',
            'detalles.*.idPostulacion' => 'required|integer|exists:postulacion,idPostulacion',
            'detalles.*.descripcion'   => 'required|string|max:255',
            'detalles.*.monto'         => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            //Crea la orden
            $orden = OrdenPago::create([
                'idTutor'     => $data['idTutor'],
                'montoTotal'  => $data['montoTotal'],
                'cancelado'   => $data['cancelado'],
                'vigencia'    => $data['vigencia'],
                'recibido'    => $data['recibido'],
            ]);

            //Crea el registro en pago
            // $pago = Pago::create([
            //     'idOrdenPago' => $orden->idOrdenPago,
            // ]);

            //Crea cada línea en pagodetalle
            $detallesCreados = [];
            foreach ($data['detalles'] as $d) {
                $det = PagoDetalle::create([
                    'idOrdenPago'   => $orden->idOrdenPago,
                    'idPostulacion' => $d['idPostulacion'],
                    'descripcion'   => $d['descripcion'],
                    'monto'         => $d['monto'],
                ]);
                $detallesCreados[] = $det;
            }

            DB::commit();

            activity()
            ->causedBy(Auth::user())
            ->performedOn($orden)
            ->withProperties([
                'orden'   => $orden->toArray(),
                'detalles'=> $detallesCreados->map->toArray()
            ])
            ->log('orden_pago_created');

            return response()->json([
                'idOrdenPago' => $orden->idOrdenPago,
                //'idPago'      => $pago->idPago,
                'detalles'    => $detallesCreados
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
 public function update(Request $request, $idOrdenPago)
{
    $request->validate([
        'montoTotal' => 'required|numeric',
        'cancelado' => 'required|boolean',
        'vigencia' => 'required|date',
        'recibido' => 'required|boolean',
        'idTutor' => 'required|exists:tutor,idTutor',
    ]);

    $orden = OrdenPago::where('idOrdenPago', $idOrdenPago)->first();

    if (!$orden) {
        return response()->json(['message' => 'Orden de pago no encontrada'], 404);
    }

    // Actualiza los campos
    $orden->montoTotal = $request->montoTotal;
    $orden->cancelado = $request->cancelado;
    $orden->vigencia = $request->vigencia;
    $orden->recibido = $request->recibido;
    $orden->idTutor = $request->idTutor;
    $orden->save();

    // Buscar postulante relacionado
    $postulante = DB::table('ordenpago')
        ->join('pagodetalle', 'ordenpago.idOrdenPago', '=', 'pagodetalle.idOrdenPago')
        ->join('postulacion', 'pagodetalle.idPostulacion', '=', 'postulacion.idPostulacion')
        ->join('postulante', 'postulacion.idPostulante', '=', 'postulante.idPostulante')
        ->where('ordenpago.idOrdenPago', $orden->idOrdenPago)
        ->select('postulante.idPostulante')
        ->first();

    $tutor = $orden->tutor;

    if ($orden->recibido && $orden->cancelado) {
        // Aprobado: habilitar y enviar correo
        if ($postulante) {
            DB::table('postulante')
                ->where('idPostulante', $postulante->idPostulante)
                ->update(['habilitado' => 1]);
        }

        if ($tutor && !empty($tutor->correoTutor)) {
            try {
                $tutor->notify(new OrdenPagoCorrecto());
            } catch (\Exception $e) {
                \Log::error('Error al enviar correo correcto: ' . $e->getMessage());
            }
        }

    } elseif (!$orden->recibido && !$orden->cancelado) {
        // Denegado: deshabilitar y enviar correo
        if ($postulante) {
            DB::table('postulante')
                ->where('idPostulante', $postulante->idPostulante)
                ->update(['habilitado' => 0]);
        }

        if ($tutor && !empty($tutor->correoTutor)) {
            try {
                $tutor->notify(new OrdenPagoDenegado());
            } catch (\Exception $e) {
                \Log::error('Error al enviar correo denegado: ' . $e->getMessage());
            }
        }

    }

    return response()->json([
        'message' => 'Orden de pago actualizada correctamente',
        'orden' => $orden
    ]);
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
