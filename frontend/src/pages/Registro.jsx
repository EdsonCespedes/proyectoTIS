import React, { useState } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia"; // Importamos el modal

import { useNavigate } from "react-router-dom";

const Registro = ({ setVista, setEstudiantes, estudiantes }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    carnet: "",
    correo: "",
    fechaNacimiento: "",
    colegio: "",
    curso: "",
    departamento: "",
    provincia: "",
    categoria: "",
    area: "",
  });
  const navigate = useNavigate();

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar estudiante
  const handleAceptar = () => {
    if (!form.nombre || !form.apellidos || !form.carnet || !form.correo || !form.fechaNacimiento || !form.colegio || !form.curso || !form.departamento || !form.provincia || !form.categoria) {
      alert("Por favor completa todos los campos");
      return;
    }

    setEstudiantes([...estudiantes, form]); // Agregar al estado global
    navigate("/detalle-inscripcion"); // Ir a la tabla
  };

  // Cancelar
  const handleCancelar = () => {
    if (estudiantes.length > 0) {
      navigate("/detalle-inscripcion");
    } else {
      navigate("/");
    }
  };


  return (
    <div className="registro-container">
      {/*Postulante*/}
      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Postulante</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" onChange={handleChange}/>
            <input type="text" placeholder="Apellido(s)" onChange={handleChange}/>
            <input type="text" placeholder="Carnet de Identidad" onChange={handleChange}/>
            <input type="email" placeholder="Correo Electrónico" onChange={handleChange}/>
            <input type="date" onChange={handleChange}/>
            <input type="text" placeholder="Colegio" onChange={handleChange}/>
            <select onChange={handleChange}>
              <option>Curso</option>
              <option value="Curso 1">Curso 1</option>
            </select>
            <select onChange={handleChange}>
              <option>Departamento</option>
              <option value="Departamento 1">Departamento 1</option>
            </select>
            <select onChange={handleChange}>
              <option>Provincia</option>
              <option value="Provincia 1">Provincia 1</option>
            </select>
            <select onChange={handleChange}>
              <option>Categoría</option>
              <option value="Categoría 1">Provincia 1</option>
            </select>

            {/* Botón para abrir el modal */}
            <button className="boton btn-competencia" onClick={() => setModalVisible(true)}>
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
          <button
            className="boton btn-blue"
            // onClick={() => setVista("detalle")}
            onClick={handleAceptar}
          >
            Registrar
          </button>
          <button className="boton btn-red" onClick={handleCancelar}>Cancelar</button>
        </div>

      </div>
    </div>
  );
};

export default Registro;