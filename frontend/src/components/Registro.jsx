import React, { useState } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia";

const departamentos = {
  "La Paz": ["Abel Iturralde", "Aroma", "Bautista Saavedra", "Camacho", "Caranavi"],
  "Cochabamba": ["Arani", "Arque", "Ayopaya", "Bolívar", "Capinota"],
  "Santa Cruz": ["Andres Ibañez", "Ángel Sandoval", "Chiquitos", "Cordillera"],
  "Chuquisaca": ["Belisario Boeto", "Hernando Siles", "Jaime Zudañez"],
  "Oruro": ["Abaroa", "Carangas", "Cercado", "Eduardo Avaroa"],
  "Potosi": ["Alonso de Ibáñez", "Antonio Quijarro", "Bernardino Bilbao"],
  "Tarija": ["Aniceto Arce", "Burnet O'Connor", "Cercado"],
  "Beni": ["Cercado", "Itenéz", "José Ballivián"],
  "Pando": ["Abuná", "Federico Román", "Madre de Dios"],
};
// Expresiones regulares para las validaciones
const nombreApellidoRegex =  /^[A-Za-z\s]+$/; // Solo letras y espacios
const carnetRegex = /^[0-9]+$/; // Solo números

const Registro = ({ areasSeleccionadas, setAreasSeleccionadas, categoriasSeleccionadas, setCategoriasSeleccionadas, handleRegistrar }) => {
  const [mostrarArea, setMostrarArea] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]); 
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
    const { name, value } = e.target;

    // Validación de nombre y apellido
    if ((name === "nombre" || name === "apellidos") && !nombreApellidoRegex.test(value) && value !== "") {
      alert("El nombre y apellido solo pueden contener letras.");
      return;
    }

    // Validación de carnet (solo números)
    if (name === "carnet" && value !== "" && !carnetRegex.test(value)) {
      alert("El carnet solo puede contener números.");
      return;
    }
    
    // Actualizar el estado del formulario
    if (name === "departamento") {
      setForm({ ...form, departamento: value, provincia: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAceptar = () => {
    if (!form.nombre || !form.apellidos || !form.carnet || !form.correo || !form.fechaNacimiento || !form.colegio || !form.curso || !form.departamento || !form.provincia || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
      alert("Por favor completa todos los campos y selecciona un área de competencia.");
      return;
    }
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

            {/* Departamento */}
            <select name="departamento" onChange={handleChange} value={form.departamento}>
              <option value="">Selecciona un departamento</option>
              {Object.keys(departamentos).map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>

            {/* Provincia */}
            <select name="provincia" onChange={handleChange} value={form.provincia} disabled={!form.departamento}>
              <option value="">Selecciona una provincia</option>
              {form.departamento && departamentos[form.departamento].map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>

            {areasSeleccionadas.length > 0 && (
              <div className="areas-seleccionadas">
                <h3>Áreas Seleccionadas:</h3>
                <ul>
                  {areasSeleccionadas.map(({ idArea, tituloArea }) => (
                    <div key={idArea}>
                      {categoriasSeleccionadas.filter((categoria) => categoria.idArea === idArea).map(({ idCategoria, nombreCategoria }) => (
                        <li key={idCategoria}>{tituloArea} - {nombreCategoria}</li>
                      ))}   
                    </div>                                     
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botón para mostrar/ocultar área de competencia */}
      <button className="boton btn-competencia" onClick={() => setMostrarArea(!mostrarArea)}>
        {mostrarArea ? "Ocultar Áreas de Competencia" : "Seleccionar Áreas de Competencia"}
      </button>

      {/* Mostrar Área de Competencia si está activado */}
      {mostrarArea && (
        <div className="area-competencia-container">
          <AreaCompetencia
            areasSeleccionadas={areasSeleccionadas}
            setAreasSeleccionadas={setAreasSeleccionadas} 
            categoriasSeleccionadas={categoriasSeleccionadas}
            setCategoriasSeleccionadas={setCategoriasSeleccionadas} 
          />
        </div>
      )}

      <div className="seccion-container">
        <div className="botones">
          <button className="boton btn-blue" onClick={handleAceptar}>Registrar</button>
          <button className="boton btn-red">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;


