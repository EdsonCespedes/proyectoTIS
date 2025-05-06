import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ListaRoles.css";

const ListaRoles = () => {
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("rolesAsignados")) || [];
    setDatos(datosGuardados);
  }, []);

  const eliminarFila = (index) => {
    const nuevosDatos = [...datos];
    nuevosDatos.splice(index, 1);
    setDatos(nuevosDatos);
    localStorage.setItem("rolesAsignados", JSON.stringify(nuevosDatos));
  };

  const iniciarEdicion = (index) => {
    localStorage.setItem("rolEditar", JSON.stringify(datos[index]));
    navigate("/asignarRoles");
  };

  // Navegar a /asignarRoles para agregar un nuevo rol
  const irASignarRoles = () => {
    navigate("/asignarRoles");
  };

  return (
    <div className="lista-container">
      <h2>Lista de Roles Asignados</h2>
      
      {/* Botón para agregar un nuevo rol */}
      <button className="btn-agregar" onClick={irASignarRoles}>
        Agregar +
      </button>

      {datos.length === 0 ? (
        <p>No hay datos guardados.</p>
      ) : (
        <table className="lista-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Convocatoria</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.convocatoria}</td>
                <td>{item.rol}</td>
                <td>
                  <button onClick={() => iniciarEdicion(index)}>✏️</button>
                  <button onClick={() => eliminarFila(index)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaRoles;


