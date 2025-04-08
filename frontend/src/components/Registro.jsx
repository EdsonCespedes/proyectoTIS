import React, { useState, useEffect } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia";
import { useNavigate } from "react-router-dom";

const nombreApellidoRegex = /^[A-Za-z\s]+$/;
const carnetRegex = /^[0-9]+$/;

const Registro = ({
  areasSeleccionadas,
  setAreasSeleccionadas,
  categoriasSeleccionadas,
  setCategoriasSeleccionadas,
  handleRegistrar,
  setRegistro,
}) => {
  const [mostrarArea, setMostrarArea] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [provinciasColegio, setProvinciasColegio] = useState([]);
  const [colegiosDisponibles, setColegiosDisponibles] = useState([]);

  const navigate = useNavigate();

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
    departamentoColegio: "",
    provinciaColegio: "",
    areas: [],
    categorias: [],
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/verdepartamentos")
      .then((res) => res.json())
      .then((data) => setDepartamentos(data))
      .catch((err) => console.error("Error al obtener departamentos:", err));
  }, []);

  const handleDepartamentoChange = (e) => {
    const nuevoDepartamento = e.target.value;
    console.log("Departamento seleccionado:", nuevoDepartamento);
    setForm({ ...form, departamento: nuevoDepartamento, provincia: "" });

    if (!nuevoDepartamento) return;

    fetch(`http://localhost:8000/api/departamentos/${nuevoDepartamento}/provincias`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Provincias cargadas (Nacimiento):", data); // Verifica en consola
        setProvincias(data);
      })
      .catch((err) => console.error("Error al obtener provincias:", err));
  };

  const handleProvinciaChange = (e) => {
    setForm({ ...form, provincia: e.target.value });
  };

  const handleDepartamentoColegioChange = (e) => {
    const nuevoDepartamentoColegio = e.target.value;
    setForm({
      ...form,
      departamentoColegio: nuevoDepartamentoColegio,
      provinciaColegio: "",
      colegio: "",
    });

    if (!nuevoDepartamentoColegio) return;

    fetch(`http://localhost:8000/api/departamentos/${nuevoDepartamentoColegio}/provincias`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Provincias cargadas (Colegio):", data); // Verifica en consola
        setProvinciasColegio(data);
      })
      .catch((err) => console.error("Error al obtener provincias de colegio:", err));
  };

  const handleProvinciaColegioChange = (e) => {
    const nuevaProvinciaColegio = e.target.value;
    setForm({ ...form, provinciaColegio: nuevaProvinciaColegio, colegio: "" });

    if (!form.departamentoColegio || !nuevaProvinciaColegio) return;

    fetch(
      `http://localhost:8000/api/departamentos/${form.departamentoColegio}/provincias/${nuevaProvinciaColegio}/colegios`
    )
      .then((res) => res.json())
      .then((data) => setColegiosDisponibles(data))
      .catch((err) => console.error("Error al obtener colegios:", err));
  };

  useEffect(() => {
    console.log("Provincias cargadas Colegio:", provinciasColegio);
  }, [provinciasColegio]);
  
  useEffect(() => {
    console.log("Provincias cargadas (Nacimiento):", provincias);
  }, [provincias]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "nombre" || name === "apellidos") && value && !nombreApellidoRegex.test(value)) {
      alert("El nombre y apellido solo pueden contener letras.");
      return;
    }

    if (name === "carnet" && value && !carnetRegex.test(value)) {
      alert("El carnet solo puede contener números.");
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleAceptar = () => {
    const camposRequeridos = [
      "nombre", "apellidos", "carnet", "correo", "fechaNacimiento",
      "curso", "departamento", "provincia"
    ];

    const camposVacios = camposRequeridos.some((campo) => !form[campo]);

    if (camposVacios || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
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
            <input type="text" placeholder="Nombre(s)" name="nombre" value={form.nombre} onChange={handleChange} />
            <input type="text" placeholder="Apellido(s)" name="apellidos" value={form.apellidos} onChange={handleChange} />
            <input type="text" placeholder="Carnet de Identidad" name="carnet" value={form.carnet} onChange={handleChange} />
            <input type="email" placeholder="Correo Electrónico" name="correo" value={form.correo} onChange={handleChange} />
            <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />

            <select value={form.departamento} onChange={handleDepartamentoChange}>
              <option value="">Seleccionar Departamento (Nacimiento)</option>
              {departamentos.map((dep) => (
                <option key={dep.idDepartamento} value={dep.nombreDepartamento}>
                  {dep.nombreDepartamento}
                </option>
              ))}
            </select>

            <select value={form.provincia} onChange={handleProvinciaChange} disabled={!form.departamento}>
            <option value="">Seleccionar Provincia (Nacimiento)</option>
            {provincias
              .filter((prov) => prov.idProvincia && prov.nombreProvincia) // Asegúrate de que haya valores válidos
              .map((prov) => (
                <option key={prov.idProvincia} value={prov.idProvincia}>
                {prov.nombreProvincia}
                 </option>
            ))}

          </select>
          </div>
        </div>

        <div className="recuadro-container">
          <h3>Datos del Colegio</h3>

          <select name="departamentoColegio" onChange={handleDepartamentoColegioChange} value={form.departamentoColegio}>
            <option value="">Seleccionar Departamento (Colegio)</option>
            {departamentos.map((dep) => (
              <option key={dep.idDepartamento} value={dep.nombreDepartamento}>
                {dep.nombreDepartamento}
              </option>
            ))}
          </select>

          <select value={form.provinciaColegio} onChange={handleProvinciaColegioChange} disabled={!form.departamentoColegio}>
            <option value="">Seleccionar Provincia (Colegio)</option>
            {provinciasColegio
              .filter((prov) => prov.idProvincia && prov.nombreProvincia) // Asegúrate de que haya valores válidos
              .map((prov) => (
                <option key={prov.idProvincia} value={prov.idProvincia}>
              {prov.nombreProvincia}
               </option>
            ))}
          </select>

          <select name="colegio" onChange={handleChange} value={form.colegio} disabled={colegiosDisponibles.length === 0}>
            <option value="">Seleccionar Colegio</option>
            {colegiosDisponibles.map((col, index) => (
              <option key={index} value={col}>{col}</option>
            ))}
          </select>

          <select name="curso" onChange={handleChange} value={form.curso} disabled={!form.colegio}>
            <option value="">Selecciona un curso</option>
            {[
              "4° Primaria", "5° Primaria", "6° Primaria",
              "1° Secundaria", "2° Secundaria", "3° Secundaria",
              "4° Secundaria", "5° Secundaria", "6° Secundaria"
            ].map((curso, idx) => (
              <option key={idx} value={curso.replace("° ", "_")}>{curso}</option>
            ))}
          </select>
        </div>

        {areasSeleccionadas.length > 0 && (
          <div className="areas-seleccionadas">
            <h3>Áreas Seleccionadas:</h3>
            <ul>
              {areasSeleccionadas.map(({ idArea, tituloArea }) =>
                categoriasSeleccionadas
                  .filter((cat) => cat.idArea === idArea)
                  .map(({ idCategoria, nombreCategoria }) => (
                    <li key={`${idArea}-${idCategoria}`}>
                      {tituloArea} - {nombreCategoria}
                    </li>
                  ))
              )}
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
          <button className="boton btn-blue" onClick={handleAceptar}>Registrar</button>
          <button className="boton btn-red" onClick={() => setRegistro(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;








