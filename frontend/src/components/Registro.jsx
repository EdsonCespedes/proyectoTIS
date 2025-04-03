import React, { useState } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia";

const Registro = ({ areasSeleccionadas, setAreasSeleccionadas, categoriasSeleccionadas, setCategoriasSeleccionadas, handleRegistrar }) => {
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
    areas: [],
    categorias: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAceptar = () => {
    if (!form.nombre || !form.apellidos || !form.carnet || !form.correo || !form.fechaNacimiento || !form.colegio || !form.curso || !form.departamento || !form.provincia || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
      alert("Por favor completa todos los campos y selecciona un área de competencia.");
      return;
    }

    console.log("Antes de actualizar form:");
    console.log("Áreas seleccionadas:", areasSeleccionadas);
    console.log("Categorías seleccionadas:", categoriasSeleccionadas);

    // setRegistro(false);
    handleRegistrar(form);
  };

  return (
    <div className="registro-container">
      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Postulante</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" name="nombre" onChange={handleChange} />
            <input type="text" placeholder="Apellido(s)" name="apellidos" onChange={handleChange} />
            <input type="text" placeholder="Carnet de Identidad" name="carnet" onChange={handleChange} />
            <input type="email" placeholder="Correo Electrónico" name="correo" onChange={handleChange} />
            <input type="date" name="fechaNacimiento" onChange={handleChange} />
            <input type="text" placeholder="Colegio" name="colegio" onChange={handleChange} />
            <select name="curso" onChange={handleChange}>
              <option>Curso</option>
              <option value="Curso 1">Curso 1</option>
            </select>
            <select name="departamento" onChange={handleChange}>
              <option>Departamento</option>
              <option value="Departamento 1">Departamento 1</option>
            </select>
            <select name="provincia" onChange={handleChange}>
              <option>Provincia</option>
              <option value="Provincia 1">Provincia 1</option>
            </select>

            <button className="boton btn-competencia" onClick={() => setModalVisible(true)}>
              Área de Competencia
            </button>

            {areasSeleccionadas.length > 0 && (
              <div className="areas-seleccionadas">
                <h3>Áreas Seleccionadas:</h3>
                <ul>
                  {areasSeleccionadas.map(({ idArea, tituloArea }) => (
                    <div key={idArea}>
                      {categoriasSeleccionadas.filter((categoria) => categoria.idArea === idArea).map(({ idCategoria, nombreCategoria })=>(<li key={idCategoria}>{tituloArea} - {nombreCategoria}</li>))}   
                    </div>                                     
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalVisible && (
        <AreaCompetencia
          setModalVisible={setModalVisible}
          areasSeleccionadas={areasSeleccionadas}
          setAreasSeleccionadas={setAreasSeleccionadas} 
          categoriasSeleccionadas={categoriasSeleccionadas}
          setCategoriasSeleccionadas={setCategoriasSeleccionadas} 
        />
      )}

      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Tutor</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" />
            <input type="text" placeholder="Apellido(s)" />
            <input type="text" placeholder="Teléfono" />
            <input type="email" placeholder="Correo Electrónico" />
            <input type="date"/>
          </div>
        </div>

        <div className="botones">
          <button className="boton btn-blue" onClick={handleAceptar}>Registrar</button>
          <button className="boton btn-red" >Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;