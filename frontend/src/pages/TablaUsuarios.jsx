import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TablaUsuarios.css";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    const datosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(datosGuardados);
  };

  const handleEditar = (id) => {
    navigate(`/addUser/${id}`);
  };

  const handleEliminar = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmacion) {
      const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
      const nuevosUsuarios = usuariosGuardados.filter((u) => u.id !== id);
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
      setUsuarios(nuevosUsuarios);
    }
  };

  const handleAsignarRol = (nombre) => {
    localStorage.setItem("rolEditar", JSON.stringify({ nombre }));
    navigate("/asignarRoles");
  };

  const handleRegistrar = () => {
    navigate("/addUser");
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>

      <div className="acciones-superiores">
        <button className="btn-registrar" onClick={handleRegistrar}>
          Registrar +
        </button>
        <button className="btn-cancelar" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </div>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => handleEditar(usuario.id)}>✍️</button>
                  <button onClick={() => handleAsignarRol(usuario.nombre)}>🎯Rol</button>
                  <button onClick={() => handleEliminar(usuario.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaUsuarios;
