import React, { useState } from 'react';
import './styles/RegistroPago.css';
<<<<<<< HEAD

const tutores = [
  { nombre: 'Juan Perez', ordenes: ['orden001', 'orden002'] },
  { nombre: 'Maria Lopez', ordenes: ['orden003', 'orden004', 'orden005', 'orden006'] },
  { nombre: 'Luis Sanchez', ordenes: ['orden007', 'orden008'] },
];

const ordenesPago = [
  { idOrdenPago: 'orden001', idIngresado: '1234', idOCR: '1234', idTutor: 1 },
  { idOrdenPago: 'orden002', idIngresado: '5678', idOCR: '5678', idTutor: 1 },
  { idOrdenPago: 'orden003', idIngresado: '9999', idOCR: '9999', idTutor: 2 },
  { idOrdenPago: 'orden004', idIngresado: '1122', idOCR: '1122', idTutor: 2 },
  { idOrdenPago: 'orden005', idIngresado: '3333', idOCR: '3333', idTutor: 2 },
  { idOrdenPago: 'orden006', idIngresado: '4444', idOCR: '4444', idTutor: 2 },
  { idOrdenPago: 'orden007', idIngresado: '5555', idOCR: '5551', idTutor: 3 },
  { idOrdenPago: 'orden008', idIngresado: '6666', idOCR: '6666', idTutor: 3 },
];

// Función para normalizar textos (quita tildes y hace minúscula)
const normalizeText = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const RegistroPago = () => {
  const [searchText, setSearchText] = useState('');
  const [tutorEncontrado, setTutorEncontrado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [verificaciones, setVerificaciones] = useState({});

  const buscarTutor = () => {
    const textoBuscado = normalizeText(searchText);
    const resultado = tutores.find(tutor =>
      normalizeText(tutor.nombre).includes(textoBuscado)
    );

    if (resultado) {
      const ordenes = resultado.ordenes.map(ordenId => {
        const orden = ordenesPago.find(orden => orden.idOrdenPago === ordenId);
        return {
          idOrdenPago: orden.idOrdenPago,
          idIngresado: orden.idIngresado,
          idOCR: orden.idOCR,
        };
      });
      setTutorEncontrado({ ...resultado, ordenes });
      setMensaje('');
      setVerificaciones({});
=======
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
>>>>>>> origin/develop
    } else {
      setTutorEncontrado(null);
      setMensaje('Tutor no encontrado.');
    }
  };

<<<<<<< HEAD
  const handleVerificacionChange = (ordenId, isChecked) => {
    setVerificaciones(prevState => ({
      ...prevState,
      [ordenId]: isChecked
    }));
  };

  const handleSeleccionarTodos = (isChecked) => {
    if (tutorEncontrado) {
      const nuevasVerificaciones = {};
      tutorEncontrado.ordenes.forEach(orden => {
        nuevasVerificaciones[orden.idOrdenPago] = isChecked;
      });
      setVerificaciones(nuevasVerificaciones);
    }
  };

=======
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

>>>>>>> origin/develop
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
<<<<<<< HEAD
            onKeyDown={(e) => e.key === 'Enter' && buscarTutor()}
          />
          <span className="search-icon" onClick={buscarTutor}>
=======
            onKeyDown={handleKeyDown}
          />
          <span
            className="search-icon"
            onClick={buscarTutor}
            style={{ cursor: 'pointer' }}
          >
>>>>>>> origin/develop
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

<<<<<<< HEAD
            {/* Seleccionar todo completamente al lado derecho */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 5px', marginBottom: '5px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '100px' }}>
              <span></span>
              <span></span>
              <span></span>
                <span>Seleccionar todo</span>
                <input
                  type="checkbox"
                  onChange={(e) => handleSeleccionarTodos(e.target.checked)}
                />
              </label>
            </div>

            <table className="tabla-pago">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Id Ingresado</th>
                  <th>Identificación OCR</th>
                  <th>Verificar</th>
                </tr>
              </thead>
              <tbody>
                {tutorEncontrado.ordenes.map((orden, index) => (
                  <tr key={index}>
                    <td>{orden.idOrdenPago}</td>
                    <td>
                      <input type="text" value={orden.idIngresado} disabled className="input-disabled" />
                    </td>
                    <td>
                      <input type="text" value={orden.idOCR} disabled className="input-disabled" />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={verificaciones[orden.idOrdenPago] || false}
                        onChange={(e) => handleVerificacionChange(orden.idOrdenPago, e.target.checked)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
=======
            <div className="formulario-inputs">
              {tutorEncontrado.ordenes.map((orden, index) => (
                <div className="formulario-row" key={index}>
                  <input type="text" defaultValue={orden} />
                  <input type="checkbox" />
                </div>
              ))}
            </div>
>>>>>>> origin/develop
          </>
        )}

        <div className="formulario-botones">
<<<<<<< HEAD
          <button className="guardar-btn">Guardar</button>
=======
          <button 
            className="guardar-btn" 
            // onClick={handleGuardar}
          >Guardar</button>
>>>>>>> origin/develop
          <button
            className="cancelar-btn"
            onClick={() => {
              setSearchText('');
              setTutorEncontrado(null);
              setMensaje('');
<<<<<<< HEAD
              setVerificaciones({});
=======
>>>>>>> origin/develop
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

<<<<<<< HEAD




=======
>>>>>>> origin/develop
