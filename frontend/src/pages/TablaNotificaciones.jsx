import React, { useState } from 'react';
import './styles/TablaNotificaciones.css';

const TablaNotificaciones = () => {
  const [usuarios, setUsuarios] = useState({
    operador: { correo: 'operador@example.com', funciones: ['Gestión de Convocatoria', 'Gestión de Colegios'], seleccionado: false },
    tutor: { correo: 'tutor@example.com', funciones: ['Gestión de Convocatoria', 'Orden Pago (Verificar)'], seleccionado: false },
    auxiliar: { correo: 'auxiliar@example.com', funciones: ['Gestión de Convocatoria', 'Gestión de Colegios'], seleccionado: false }
  });
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);

  const handleSeleccionarTodo = () => {
    const nuevoEstado = !seleccionarTodo;
    setSeleccionarTodo(nuevoEstado);
    setUsuarios(
      Object.fromEntries(
        Object.entries(usuarios).map(([key, usuario]) => [key, { ...usuario, seleccionado: nuevoEstado }])
      )
    );
  };

  const handleSeleccionarUsuario = (key) => {
    setUsuarios({
      ...usuarios,
      [key]: {
        ...usuarios[key],
        seleccionado: !usuarios[key].seleccionado
      }
    });
  };

  return (
    <div className="tabla-container">
      <h2>Enviar Notificaciones</h2>
      <table className="tabla-notificaciones">
        <thead>
          <tr>
            <th><input type="checkbox" checked={seleccionarTodo} onChange={handleSeleccionarTodo} /></th>
            <th>Correo</th>
            <th>Funciones</th>
            <th>Seleccionar Convocatoria</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(usuarios).map(([key, usuario]) => (
            <tr key={key} className={usuario.seleccionado ? 'seleccionado' : ''}>
              <td><input type="checkbox" checked={usuario.seleccionado} onChange={() => handleSeleccionarUsuario(key)} /></td>
              <td>{usuario.correo}</td>
              <td>{usuario.funciones.join(', ')}</td>
              <td>
                <select>
                  <option value="">Seleccionar Convocatoria</option>
                  <option value="convocatoria1">Convocatoria 1</option>
                  <option value="convocatoria2">Convocatoria 2</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-enviar">Enviar Notificación</button>
    </div>
  );
};

export default TablaNotificaciones;
