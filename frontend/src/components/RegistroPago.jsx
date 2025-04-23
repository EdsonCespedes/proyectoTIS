import React, { useState } from 'react';
import './styles/RegistroPago.css';

const tutores = [
  {
    nombre: 'Juan Perez',
    ordenes: [
      { nombre: 'Orden de Pago 1', idIngresado: '1234', idOCR: '1234' },
      { nombre: 'Orden de Pago 2', idIngresado: '5670', idOCR: '5670' }
    ]
  },
  {
    nombre: 'Maria Lopez',
    ordenes: [
      { nombre: 'Orden de Pago 3', idIngresado: '8888', idOCR: '8888' },
      { nombre: 'Orden de Pago 4', idIngresado: '4444', idOCR: '4444' },
      { nombre: 'Orden de Pago 5', idIngresado: '9999', idOCR: '9991' },
      { nombre: 'Orden de Pago 6', idIngresado: '0000', idOCR: '0001' }
    ]
  },
  
];

const RegistroPago = () => {
  const [searchText, setSearchText] = useState('');
  const [tutorEncontrado, setTutorEncontrado] = useState(null);
  const [mensaje, setMensaje] = useState('');

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
            onKeyDown={(e) => e.key === 'Enter' && buscarTutor()}
          />
          <span className="search-icon" onClick={buscarTutor}>
            🔍
          </span>
        </div>

        {mensaje && <p style={{ textAlign: 'center', color: 'red' }}>{mensaje}</p>}

        {tutorEncontrado && (
          <>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {tutorEncontrado.nombre} tiene {tutorEncontrado.ordenes.length} orden(es) de pago.
            </p>

            <table className="tabla-pago">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Id ingresado</th>
                  <th>Id OcR</th>
                  <th>Verificado</th>
                </tr>
              </thead>
              <tbody>
                {tutorEncontrado.ordenes.map((orden, index) => (
                  <tr key={index}>
                    <td>{orden.nombre}</td>
                    <td>
                      <input type="text" value={orden.idIngresado} disabled className="input-disabled" />
                    </td>
                    <td>
                      <input type="text" value={orden.idOCR} disabled className="input-disabled" />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={orden.idIngresado === orden.idOCR}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="formulario-botones">
          <button className="guardar-btn">Guardar</button>
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



