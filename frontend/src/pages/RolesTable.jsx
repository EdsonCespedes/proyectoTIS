import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/RolesTable.css';

const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("rolesAsignados")) || [];
    
    const datosValidados = datosGuardados.map((rol) => ({
      nombreRol: rol.nombreRol || 'Sin nombre',
      funciones: Array.isArray(rol.funciones) ? rol.funciones : [],
    }));

    setRoles(datosValidados);
  }, []);

  const handleEdit = (index) => {
    const rolParaEditar = roles[index];

    // Guardar el rol a editar en localStorage (temporal)
    localStorage.setItem("rolEditar", JSON.stringify({ ...rolParaEditar, index }));
    navigate("/addRoles");
  };

  const handleDelete = (index) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
    localStorage.setItem("rolesAsignados", JSON.stringify(updatedRoles));
  };

  return (
    <div className="table-container">
      <h2>Roles Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre Rol</th>
            <th>Funciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((rol, index) => (
              <tr key={index}>
                <td>{rol.nombreRol}</td>
                <td>{Array.isArray(rol.funciones) ? rol.funciones.join(', ') : ''}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Editar</button>
                  <button onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay roles registrados.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/addRoles">
        <button className="btn">Añadir nuevo rol</button>
      </Link>
    </div>
  );
};

export default RolesTable;

