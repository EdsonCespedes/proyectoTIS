import React, { useState } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia"; // Importamos el modal

const Registro = ({ setVista }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="registro-container">
      {/*Postulante*/}
      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Postulante</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" />
            <input type="text" placeholder="Apellido(s)" />
            <input type="text" placeholder="Carnet de Identidad" />
            <input type="email" placeholder="Correo Electrónico" />
            <input type="date" />
            <input type="text" placeholder="Colegio" />
            <select><option>Curso</option></select>
            <select><option>Departamento</option></select>
            <select><option>Provincia</option></select>
            <select><option>Categoría</option></select>

            {/* Botón para abrir el modal */}
            <button className="btn btn-competencia" onClick={() => setModalVisible(true)}>
              Área de Competencia
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar modal si modalVisible es true */}
      {modalVisible && <AreaCompetencia setModalVisible={setModalVisible} />}

      {/* Sección de Tutor */}
      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Tutor</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" />
            <input type="text" placeholder="Apellido(s)" />
            <input type="text" placeholder="Teléfono" />
            <input type="email" placeholder="Correo Electrónico" />
          </div>
        </div>

      <div className="botones">
        <button className="btn btn-registrar" onClick={() => setVista("detalle")}>Registrar</button>
        <button className="btn btn-cancelar">Cancelar</button>
      </div>
       
      </div>
    </div>
  );
};

export default Registro;