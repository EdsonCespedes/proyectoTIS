import React from "react";
import { useNavigate } from "react-router-dom";  // Importa useNavigate
import "./styles/AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();  // Inicializa el hook useNavigate

  // Función para manejar la redirección al cancelar
  const handleCancelar = () => {
    navigate("/asignarRoles");  // Redirige a la ruta de AsignarRoles
  };

  return (
    <div className="form-container">
      <div className="form-title">Add USUARIOS</div>
      <div className="form-body">
        <div className="form-group">
          <label>Nombre Completo :</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>password :</label>
          <input type="password" />
        </div>
        <div className="form-group">
          <label>email :</label>
          <input type="email" />
        </div>
        <div className="form-buttons">
          <button className="btn-agregar">AGREGAR</button>
          {/* Cambia el evento onClick del botón Cancelar */}
          <button className="btn-cancelar" onClick={handleCancelar}>CANCELAR</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

