import React, { useEffect, useState } from 'react';
import './styles/RegistroPago.css';
import Recibo from './Recibo';
import { useNavigate } from 'react-router-dom';

const tutores = [
  { nombre: 'Juan Perez', ordenes: ['orden001', 'orden002'] },
  { nombre: 'Maria Lopez', ordenes: ['orden001', 'orden004', 'orden005', 'orden006'] },
  { nombre: 'Luis Sanchez', ordenes: ['orden004', 'orden005', 'orden006'] },
];

const ordenesPago = [
  { idOrdenPago: 1, montoTotal: 150, cancelado: false, recibido: false, vigencia: "28-04-2025", idTutor: 2, },
  { idOrdenPago: 2, montoTotal: 50, cancelado: false, recibido: true, vigencia: "28-04-2025", idTutor: 2, },
  { idOrdenPago: 3, montoTotal: 1050, cancelado: true, recibido: true, vigencia: "28-04-2025", idTutor: 2, },
  { idOrdenPago: 4, montoTotal: 230, cancelado: true, recibido: true, vigencia: "28-04-2025", idTutor: 2, },
  { idOrdenPago: 5, montoTotal: 190, cancelado: true, recibido: true, vigencia: "28-04-2025", idTutor: 2, },
  { idOrdenPago: 6, montoTotal: 560, cancelado: true, recibido: true, vigencia: "28-04-2025", idTutor: 2, },
  { idOrdenPago: 7, montoTotal: 720, cancelado: true, recibido: true, vigencia: "28-04-2025", idTutor: 2, },
  { idOrdenPago: 8, montoTotal: 1230, cancelado: true, recibido: true, vigencia: "28-04-2025", idTutor: 2, },
];

const Historial = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [tutorEncontrado, setTutorEncontrado] = useState(null);
  const [mostrarRecibo, setMostrarRecibo] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [reciboData, setReciboData] = useState(null);

  const buscarTutor = () => {
    const resultado = tutores.find(tutor =>
      tutor.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    if (resultado) {
      setTutorEncontrado(resultado);
      setMensaje('');
    } else {
      setTutorEncontrado(null);
      setMensaje('Tutor no encontrado.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      buscarTutor();
    }
  };

  const handleGuardar = () => {
    if (tutorEncontrado) {
      const nuevoRecibo = {
        idRecibo: `R-${Math.floor(Math.random() * 10000)}`,
        nombreTutor: tutorEncontrado.nombre,
        ciTutor: '12345678',
        monto: tutorEncontrado.ordenes.length * 50 + ',00',
        fecha: new Date().toLocaleDateString(),
        detalle: `Pago de ${tutorEncontrado.ordenes.length} orden(es) de matrícula.`,
      };
      setReciboData(nuevoRecibo);
      setMostrarRecibo(true);
    }
  };

  const handleVolver = () => {
    setMostrarRecibo(false);
    setSearchText('');
    setTutorEncontrado(null);
    setReciboData(null);
  };

  if (mostrarRecibo && reciboData) {
    return <Recibo reciboData={reciboData} onVolver={handleVolver} />;
  }

  const handlePagar = (orden) => {
    navigate("/Recibo", {
      state: { orden },
    });
  }

  return (
    <div className="formulario-pago-container">
      <div className="formulario-card">
        <div className="formulario-header">
          Ordenes de Pago
        </div>


        {/* <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Usted tiene {ordenesPago.length} orden(es) de pago.
        </p> */}

        <div className="formulario-inputs">
          {ordenesPago.map((orden, index) => (
            <div className="formulario-row" key={orden.idOrdenPago}>
              <input type="text" disabled defaultValue={orden.montoTotal} />
              {!orden.cancelado ? (
                <button onClick={handlePagar(orden)}>Subir Recibo</button>
              ) : (
                <button disabled>Pagado</button>
              )}
            </div>
          ))}
        </div>



        <div className="formulario-botones">
          <button className="guardar-btn" onClick={handleGuardar}>Guardar</button>
          <button
            className="cancelar-btn"
            onClick={() => {
              setSearchText('');
              setTutorEncontrado(null);
              setMensaje('');
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Historial;

