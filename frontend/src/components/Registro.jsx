import React, { useState, useEffect } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia";
import { useNavigate } from "react-router-dom";

const nombreApellidoRegex = /^[A-Za-z\s]+$/; // Solo letras y espacios
const carnetRegex = /^[0-9]+$/; // Solo números

const Registro = ({ areasSeleccionadas, setAreasSeleccionadas, categoriasSeleccionadas, setCategoriasSeleccionadas, setRegistro }) => {
  const [mostrarArea, setMostrarArea] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    carnet: "",
    correo: "",
    fechaNacimiento: "",
    colegio: "",
    curso: "",
    departamentoNacimiento: "",
    provinciaNacimiento: "",
    departamento: "",
    provincia: "",
    areas: [],
    categorias: [],
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [provinciasNacimiento, setProvinciasNacimiento] = useState([]);
  const [provinciasColegio, setProvinciasColegio] = useState([]);
  const [colegiosDisponibles, setColegiosDisponibles] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchDepartamentosNacimiento = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/verdepartamentos");
        const data = await response.json();
        console.log(data);
        setDepartamentos(data);
      } catch (error) {
        console.error("Hubo un error al obtener los departamentos de nacimiento:", error);
      }
    };

    const fetchDepartamentosColegio = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/departamentos");
        const data = await response.json();
        console.log(data);
        setDepartamentos(data);
      } catch (error) {
        console.error("Hubo un error al obtener los departamentos de colegio:", error);
      }
    };

    const fetchCursos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/vercursos");
        const data = await response.json();
        console.log(data);
        setCursos(data);
      } catch (error) {
        console.error("Hubo un error al obtener los cursos:", error);
      }
    };

    fetchDepartamentosNacimiento();
    fetchDepartamentosColegio();
    fetchCursos();
  }, []);

  const obtenerProvinciasNacimiento = async (departamento) => {
    try {
      const response = await fetch(`http://localhost:8000/api/verprovincias/departamento/${departamento}`);
      const data = await response.json();
      console.log(data);
      setProvinciasNacimiento(data);
    } catch (error) {
      console.error("Hubo un error al obtener las provincias de nacimiento:", error);
    }
  };

  const obtenerProvinciasColegio = async (departamento) => {
    try {
      const response = await fetch(`http://localhost:8000/api/departamentos/${departamento}/provincias`);
      const data = await response.json();
      console.log(data);
      setProvinciasColegio(data);
    } catch (error) {
      console.error("Hubo un error al obtener las provincias del colegio:", error);
    }
  };

  const obtenerColegios = async (departamento, provincia) => {
    try {
      const response = await fetch(`http://localhost:8000/api/departamentos/${departamento}/provincias/${provincia}/colegios`);
      const data = await response.json();
      console.log(data);
      setColegiosDisponibles(data);
    } catch (error) {
      console.error("Hubo un error al obtener los colegios:", error);
    }
  };

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

    if (name === "departamentoNacimiento") {
      setForm({ ...form, departamentoNacimiento: value, provinciaNacimiento: "" });
      obtenerProvinciasNacimiento(value);
    } else if (name === "departamento") {
      setForm({ ...form, departamento: value, provincia: "", colegio: "" });
      obtenerProvinciasColegio(value);
      setColegiosDisponibles([]);
    } else if (name === "provinciaNacimiento") {
      setForm({ ...form, provinciaNacimiento: value });
    } else if (name === "provincia") {
      setForm({ ...form, provincia: value, colegio: "" });
      obtenerColegios(form.departamento, value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegistrarPostulante = async () => {
    if (!form.nombre || !form.apellidos || !form.carnet || !form.correo || !form.fechaNacimiento || !form.curso || !form.departamento || !form.provincia || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
      alert("Por favor completa todos los campos y selecciona un área de competencia.");
      return;
    }

    const postulanteData = {
      nombre: form.nombre,
      apellidos: form.apellidos,
      carnet: form.carnet,
      correo: form.correo,
      fechaNacimiento: form.fechaNacimiento,
      colegio: form.colegio,
      curso: form.curso,
      departamentoNacimiento: form.departamentoNacimiento,
      provinciaNacimiento: form.provinciaNacimiento,
      departamento: form.departamento,
      provincia: form.provincia,
      areas: areasSeleccionadas,
      categorias: categoriasSeleccionadas,
    };

    try {
      const response = await fetch("http://localhost:8000/api/registrar-postulante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postulanteData),
      });

      if (response.ok) {
        alert("Postulante registrado correctamente.");
        setRegistro(false);  // Cerrar el formulario después del registro exitoso
      } else {
        const errorData = await response.json();
        alert(`Error al registrar postulante: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Hubo un error al registrar el postulante:", error);
      alert("Hubo un error en el registro. Intenta de nuevo.");
    }
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
            
            <select name="departamentoNacimiento" onChange={handleChange} value={form.departamentoNacimiento}>
              <option value="">Selecciona un departamento </option>
              {departamentos.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>

            <select name="provinciaNacimiento" onChange={handleChange} value={form.provinciaNacimiento} disabled={!form.departamentoNacimiento}>
              <option value="">Selecciona una provincia</option>
              {form.departamentoNacimiento && provinciasNacimiento.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
        </div>
  
        <div className="recuadro-container">
          <h3>Datos del Colegio</h3>
          <select name="departamento" onChange={handleChange} value={form.departamento}>
            <option value="">Selecciona un departamento</option>
            {departamentos.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
  
          <select name="provincia" onChange={handleChange} value={form.provincia} disabled={!form.departamento}>
            <option value="">Selecciona una provincia</option>
            {form.departamento && provinciasColegio.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
  
          <select name="colegio" onChange={handleChange} value={form.colegio} disabled={!form.provincia}>
            <option value="">Selecciona un colegio</option>
            {colegiosDisponibles.length > 0 && colegiosDisponibles.map((colegio) => (
              <option key={colegio} value={colegio}>{colegio}</option>
            ))}
          </select>

          <select name="curso" onChange={handleChange} value={form.curso} disabled={!form.colegio}>
            <option value="">Selecciona un curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>{curso.nombre}</option>
            ))}
          </select>
        </div>

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

      <div className="seccion-container">
        <div className="botones">
          <button className="boton btn-blue" onClick={handleRegistrarPostulante}>Registrar</button>
          <button type="button" className="boton btn-red" onClick={() => setRegistro(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;



