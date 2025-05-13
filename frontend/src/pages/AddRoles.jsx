import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRoles = () => {
  const [nombreRol, setNombreRol] = useState('');
  const [funciones, setFunciones] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indexEditar, setIndexEditar] = useState(null);
  const navigate = useNavigate();

  const opcionesFunciones = [
    "Gestion de Convocatoria",
    "Gestion de Colegios",
    "Login, Registrar",
    "Orden Pago (OCR)",
    "Orden Pago (Vereficar)"
  ];

  useEffect(() => {
    const rolEditar = JSON.parse(localStorage.getItem("rolEditar"));
    if (rolEditar) {
      setNombreRol(rolEditar.nombreRol);
      setFunciones(rolEditar.funciones);
      setModoEdicion(true);
      setIndexEditar(rolEditar.index);
    }
  }, []);

  const handleCheckboxChange = (funcion) => {
    setFunciones(prev =>
      prev.includes(funcion)
        ? prev.filter(f => f !== funcion)
        : [...prev, funcion]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rolesExistentes = JSON.parse(localStorage.getItem("rolesAsignados")) || [];
    const nuevoRol = { nombreRol, funciones };

    let actualizados;

    if (modoEdicion && indexEditar !== null) {
      rolesExistentes[indexEditar] = nuevoRol;
      actualizados = [...rolesExistentes];
      localStorage.removeItem("rolEditar");
    } else {
      actualizados = [...rolesExistentes, nuevoRol];
    }

    localStorage.setItem("rolesAsignados", JSON.stringify(actualizados));
    navigate("/tablaRoles");
  };

  const handleCancel = () => {
    localStorage.removeItem("rolEditar");
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{modoEdicion ? "Editar Rol" : "Añadir Rol"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreRol">Nombre Rol:</label>
        <input
          type="text"
          id="nombreRol"
          value={nombreRol}
          onChange={(e) => setNombreRol(e.target.value)}
        />

        <label>Funciones:</label>
        <div className="funciones">
          {opcionesFunciones.map((funcion, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`funcion-${index}`}
                checked={funciones.includes(funcion)}
                onChange={() => handleCheckboxChange(funcion)}
              />
              <label htmlFor={`funcion-${index}`}>{funcion}</label>
            </div>
          ))}
        </div>

        <button type="submit">{modoEdicion ? "Guardar Cambios" : "Registrar"}</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddRoles;



