import React, { useState } from 'react';
import './styles/TablaNotificaciones.css';

const TablaNotificaciones = () => {
  const [usuarios, setUsuarios] = useState({
    usuario1: { correo: 'persona1@example.com', seleccionado: false },
    usuario2: { correo: 'persona2@example.com', seleccionado: false },
    usuario3: { correo: 'persona3@example.com', seleccionado: false }
  });
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);
  const [convocatoria, setConvocatoria] = useState({ id: '', nombre: '' });

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

      <div className="convocatoria-selector">
        <label>Seleccionar Convocatoria: </label>
        <select value={convocatoria.id} onChange={(e) => setConvocatoria({ id: e.target.value, nombre: e.target.options[e.target.selectedIndex].text })}>
          <option value="">Seleccione una convocatoria</option>
          <option value="convocatoria1">Convocatoria 1</option>
          <option value="convocatoria2">Convocatoria 2</option>
        </select>
      </div>

      <table className="tabla-notificaciones">
        <thead>
          <tr>
            <th>Selecciona Todo<input type="checkbox" checked={seleccionarTodo} onChange={handleSeleccionarTodo} /></th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(usuarios).map(([key, usuario]) => (
            <tr key={key} className={usuario.seleccionado ? 'seleccionado' : ''}>
              <td><input type="checkbox" checked={usuario.seleccionado} onChange={() => handleSeleccionarUsuario(key)} /></td>
              <td>{usuario.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-enviar">Enviar Notificación</button>
    </div>
  );
};

export default TablaNotificaciones;

