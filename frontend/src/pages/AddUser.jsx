import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find((u) => u.id === Number(id));
      if (usuario) {
        setNombre(usuario.nombre);
        setPassword(usuario.password);
        setEmail(usuario.email);
      }
    }
  }, [id]);

  const handleCancelar = () => {
    navigate("/tablaUsuarios");
  };

  const handleGuardar = () => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (id) {
      // Modo edición: actualiza usuario
      const usuariosActualizados = usuariosGuardados.map((u) =>
        u.id === Number(id)
          ? { ...u, nombre, password, email }
          : u
      );
      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    } else {
      // Modo creación: agrega nuevo
      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        password,
        email,
      };
      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    }

    navigate("/tablaUsuarios");
  };

  return (
    <div className="form-container">
      <div className="form-title">{id ? "Editar Usuario" : "Add USUARIOS"}</div>
      <div className="form-body">
        <div className="form-group">
          <label>Nombre Completo :</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="form-group">
          <label>password :</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-buttons">
          <button className="btn-agregar" onClick={handleGuardar}>
            {id ? "✍️" : "💾"}
          </button>
          <button className="btn-cancelar" onClick={handleCancelar}>❌</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
