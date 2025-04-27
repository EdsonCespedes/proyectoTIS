import React, { useState } from 'react';
import './styles/RegistroPago.css';
import Recibo from './Recibo';

const tutores = [
  { nombre: 'Juan Perez', ordenes: ['Orden de Pago 1', 'Orden de Pago 2'] },
  { nombre: 'Maria Lopez', ordenes: ['Orden de Pago 3', 'Orden de Pago 4', 'Orden de Pago 5', 'Orden de Pago 6'] },
  { nombre: 'Luis Sanchez', ordenes: ['Orden de Pago 7', 'Orden de Pago 8', 'Orden de Pago 9'] },
];

const RegistroPago = () => {
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

  return (
    <div className="formulario-pago-container">
      <div className="formulario-card">
        <div className="formulario-header">
          Formulario de Registro de Pago
        </div>

        <div className="formulario-search">
          <span className="menu-icon">☰</span>
          <input
            type="text"
            placeholder="Buscar por nombre del tutor"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span
            className="search-icon"
            onClick={buscarTutor}
            style={{ cursor: 'pointer' }}
          >
            🔍
          </span>
        </div>

        {mensaje && (
          <p style={{ textAlign: 'center', color: 'red' }}>{mensaje}</p>
        )}

        {tutorEncontrado && (
          <>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {tutorEncontrado.nombre} tiene {tutorEncontrado.ordenes.length} orden(es) de pago.
            </p>

            <div className="formulario-inputs">
              {tutorEncontrado.ordenes.map((orden, index) => (
                <div className="formulario-row" key={index}>
                  <input type="text" defaultValue={orden} />
                  <input type="checkbox" />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="formulario-botones">
          <button 
            className="guardar-btn" 
            // onClick={handleGuardar}
          >Guardar</button>
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

export default RegistroPago;

