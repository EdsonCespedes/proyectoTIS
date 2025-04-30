import React, { useState } from 'react';
import './styles/AddRoles.css';

const AddRoles = () => {
  const [nombreRol, setNombreRol] = useState('');
  const [funciones, setFunciones] = useState([]);

  const opcionesFunciones = [
    "Gestion de Convocatoria",
    "Gestion de Colegios",
    "Login, Registrar",
    "Orden Pago (OCR)",
    "Orden Pago (Vereficar)"
  ];

  const handleCheckboxChange = (funcion) => {
    setFunciones(prev =>
      prev.includes(funcion)
        ? prev.filter(f => f !== funcion)
        : [...prev, funcion]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rol:', nombreRol);
    console.log('Funciones seleccionadas:', funciones);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add ROLES</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreRol">Nombre Rol :</label>
          <input
            type="text"
            id="nombreRol"
            value={nombreRol}
            onChange={(e) => setNombreRol(e.target.value)}
            className="input-rol"
          />
        </div>

        <div className="form-group funciones">
          <label>Funciones :</label>
          {opcionesFunciones.map((funcion, index) => (
            <div key={index} className="checkbox-item">
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

        <div className="form-buttons">
          <button type="submit" className="btn btn-registrar">REGISTRAR</button>
        </div>
      </form>
    </div>
  );
};

export default AddRoles;
