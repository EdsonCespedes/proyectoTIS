import React, { useState, useEffect } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia";
import { useNavigate } from "react-router-dom";

const nombreApellidoRegex = /^[A-Za-z\s]+$/; // Solo letras y espacios
const carnetRegex = /^[0-9]+$/; // Solo números

const Registro = ({ areasSeleccionadas, setAreasSeleccionadas, categoriasSeleccionadas, setCategoriasSeleccionadas, handleRegistrar, setRegistro }) => {
  const [mostrarArea, setMostrarArea] = useState(false);
  const navigate = useNavigate();

  const [departamentos, setDepartamentos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [provincias, setProvincias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/verdepartamentos")
      .then(response => response.json())
      .then(data => setDepartamentos(data))
      .catch(error => console.error("Error al obtener colegios:", error));

    fetch("http://localhost:8000/api/vercursos")
      .then(response => response.json())
      .then(data => setCursos(data))
      .catch(error => console.error("Error al obtener colegios:", error));
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    carnet: "",
    correo: "",
    fechaNacimiento: "",
    colegio: "",
    curso: "",
    departamentoNacimiento: "", // Nuevo campo para departamento de nacimiento
    provinciaNacimiento: "", // Nuevo campo para provincia de nacimiento
    departamento: "",
    provincia: "",
    areas: [],
    categorias: [],
  });

  const [colegiosDisponibles, setColegiosDisponibles] = useState([]);

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
      setForm({ ...form, departamento: value, provincia: "", colegio: "" });
      fetch(`http://localhost:8000/api/verprovincias/departamento/${value}`)
        .then(response => response.json())
        .then(data => setProvincias(data))
        .catch(error => console.error("Error al obtener provincias:", error));
      setColegiosDisponibles([]);
    } else if (name === "provincia") {
      const nuevaProvincia = value;
      const departamentoActual = form.departamento;

      setForm({ ...form, provincia: nuevaProvincia, colegio: "" });

      fetch(`http://localhost:8000/api/departamentos/${departamentoActual}/provincias/${nuevaProvincia}/colegios`)
        .then(response => response.json())
        .then(data => {
          console.log("Colegios cargados:", data);
          setColegiosDisponibles(data);
        })
        .catch(error => console.error("Error al obtener colegios:", error));

    } else if (name === "departamentoNacimiento") {
      setForm({ ...form, departamentoNacimiento: value, provinciaNacimiento: "" });
      fetch(`http://localhost:8000/api/verprovincias/departamento/${value}`)
        .then(response => response.json())
        .then(data => setProvincias(data))
        .catch(error => console.error("Error al obtener provincias:", error));
    } else if (name === "provinciaNacimiento") {
      setForm({ ...form, provinciaNacimiento: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAceptar = () => {
    if (!form.nombre || !form.apellidos || !form.carnet || !form.correo || !form.fechaNacimiento || !form.curso || !form.departamento || !form.provincia || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
      alert("Por favor completa todos los campos y selecciona un área de competencia.");
      return;
    }
    handleRegistrar(form);
  };

  return (
    <div className="registro-container">
      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Datos del Estudiante</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" name="nombre" onChange={handleChange} />
            <input type="text" placeholder="Apellido(s)" name="apellidos" onChange={handleChange} />
            <input type="text" placeholder="Carnet de Identidad" name="carnet" onChange={handleChange} />
            <input type="email" placeholder="Correo Electrónico" name="correo" onChange={handleChange} />
            <input type="date" name="fechaNacimiento" onChange={handleChange} />

            <select name="curso" onChange={handleChange} value={form.curso}>
              <option value="">Selecciona un curso</option>
              {cursos.map((curso) => (
                <option key={curso.idCurso} value={curso.Curso}>{curso.Curso}</option>
              ))}
            </select>

            <select name="departamentoNacimiento" onChange={handleChange} value={form.departamentoNacimiento}>
              <option value="">Selecciona un departamento </option>
              {departamentos.map((dep) => (
                <option key={dep.idDepartamento} value={dep.nombreDepartamento}>{dep.nombreDepartamento}</option>
              ))}
            </select>

            <select name="provinciaNacimiento" onChange={handleChange} value={form.provinciaNacimiento} disabled={!form.departamentoNacimiento}>
              <option value="">Selecciona una provincia</option>
              {provincias.map((prov) => (
                <option key={prov.idProvincia} value={prov.nombreProvincia}>{prov.nombreProvincia}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Recuadro para Departamento, Provincia y Colegio */}
        <div className="recuadro-container">
          <h3> </h3>
          <h3> Datos del Colegio </h3>
          <select name="departamento" onChange={handleChange} value={form.departamento}>
            <option value="">Selecciona un departamento</option>
            {departamentos.map((dep) => (
              <option key={dep.idDepartamento} value={dep.nombreDepartamento}>{dep.nombreDepartamento}</option>
            ))}
          </select>

          <select name="provincia" onChange={handleChange} value={form.provincia} disabled={!form.departamento}>
            <option value="">Selecciona una provincia</option>
            {provincias.map((prov) => (
              <option key={prov.idProvincia} value={prov.nombreProvincia}>{prov.nombreProvincia}</option>
            ))}
          </select>

          <select name="colegio" onChange={handleChange} value={form.colegio} disabled={!form.provincia}>
            <option value="">Selecciona un colegio</option>
            {Object.entries(colegiosDisponibles).map(([id, nombre]) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}

          </select>
        </div>

        {/* Áreas seleccionadas */}
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
            cursoSeleccionado={form.curso}
          />
        </div>
      )}

      {/* Botones de acción */}
      <div className="seccion-container">
        <div className="botones">
          <button className="boton btn-blue" onClick={handleAceptar}>Registrar</button>
          <button type="button" className="boton btn-red" onClick={() => setRegistro(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
export default Registro;


