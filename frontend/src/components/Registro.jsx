import React, { useState, useEffect } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia";
import { useNavigate } from "react-router-dom";

const nombreApellidoRegex = /^[A-Za-z\s]+$/; // Solo letras y espacios
const carnetRegex = /^[0-9]+$/; // Solo números

const Registro = ({ areasSeleccionadas, setAreasSeleccionadas, categoriasSeleccionadas, setCategoriasSeleccionadas, handleRegistrar, setRegistro }) => {
  const [mostrarArea, setMostrarArea] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // ✅ agregado
  const navigate = useNavigate();

  const [departamentos, setDepartamentos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [colegiosDisponibles, setColegiosDisponibles] = useState([]);

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
    departamentoNacimiento: "",
    provinciaNacimiento: "",
    areas: [],
    categorias: [],
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/verdepartamentos")
      .then(response => response.json())
      .then(data => setDepartamentos(data))
      .catch(error => console.error("Error al obtener departamentos:", error));

    fetch("http://localhost:8000/api/vercursos")
      .then(response => response.json())
      .then(data => setCursos(data))
      .catch(error => console.error("Error al obtener cursos:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "nombre" || name === "apellidos") && !nombreApellidoRegex.test(value) && value !== "") {
      alert("El nombre y apellido solo pueden contener letras.");
      return;
    }

    if (name === "carnet" && value !== "" && !carnetRegex.test(value)) {
      alert("El carnet solo puede contener números.");
      return;
    }

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
    if (!form.nombre || !form.apellidos || !form.carnet || !form.correo || !form.fechaNacimiento || !form.colegio || !form.curso || !form.departamento || !form.provincia || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
      alert("Por favor completa todos los campos y selecciona un área de competencia.");
      return;
    }

    console.log("Antes de actualizar form:");
    console.log("Áreas seleccionadas:", areasSeleccionadas);
    console.log("Categorías seleccionadas:", categoriasSeleccionadas);

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

        {areasSeleccionadas.length > 0 && (
          <div className="areas-seleccionadas">
            <h3>Áreas Seleccionadas:</h3>
            <ul>
              {areasSeleccionadas.map(({ idArea, tituloArea }) => (
                <div key={idArea}>
                  {categoriasSeleccionadas
                    .filter((categoria) => categoria.idArea === idArea)
                    .map(({ idCategoria, nombreCategoria }) => (
                      <li key={idCategoria}>{tituloArea} - {nombreCategoria}</li>
                    ))}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button className="boton btn-competencia" onClick={() => setMostrarArea(!mostrarArea)}>
        {mostrarArea ? "Ocultar Áreas de Competencia" : "Seleccionar Áreas de Competencia"}
      </button>

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
            <input type="date" />
          </div>
        </div>

        <div className="botones">
          <button className="boton btn-blue" onClick={handleAceptar}>Registrar</button>
          <button type="button" className="boton btn-red" onClick={() => setRegistro(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
