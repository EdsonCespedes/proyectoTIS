import React, { useState, useEffect } from "react";
import "./styles/Registro.css";
import AreaCompetencia from "./AreaCompetencia";
import { useNavigate } from "react-router-dom";

const nombreApellidoRegex = /^[A-Za-z\s]+$/;
const carnetRegex = /^[0-9]+$/;

const Registro = ({ idConvocatoria, areasSeleccionadas, setAreasSeleccionadas, categoriasSeleccionadas, setCategoriasSeleccionadas, handleRegistrar, setRegistro }) => {
  const [mostrarArea, setMostrarArea] = useState(false);
  const [provinciasColegio, setProvinciasColegio] = useState([]);

  const [areas, setAreas] = useState([]);

  const navigate = useNavigate();

  const [departamentos, setDepartamentos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [provincias, setProvincias] = useState([]);

  const [form, setForm] = useState({
    nombrePost: "",
    apellidoPost: "",
    carnet: "",
    fechaNaciPost: "",
    correoPost: "",
    telefonoPost: "",
    departamento: "",
    provincia: "",
    idColegio: "", // puede ser string o id real
    idCurso: "",     // igual
    idTutor: null,           // si es nuevo tutor
    delegacion: "", // opcional
    departamentoColegio: "",
    provinciaColegio: "",
    tutor: {
      nombreTutor: "",
      apellidoTutor: "",
      correoTutor: "",
      telefonoTutor: "",
      fechaNaciTutor: ""
    },
    areas: [],
    categorias: [],
  });
  const [colegiosDisponibles, setColegiosDisponibles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/vercursos")
      .then(response => response.json())
      .then(data => setCursos(data))
      .catch(error => console.error("Error al obtener cursos:", error));

    fetch("http://localhost:8000/api/verdepartamentos")
      .then(response => response.json())
      .then(data => setDepartamentos(data))
      .catch(error => console.error("Error al obtener cursos:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones personalizadas
    if ((name === "nombrePost" || name === "apellidoPost") && value && !nombreApellidoRegex.test(value)) {
      alert("El nombre y apellido solo pueden contener letras.");
      return;
    }

    if (name === "carnet" && value && !carnetRegex.test(value)) {
      alert("El carnet solo puede contener números.");
      return;
    }

    setForm((prevForm) => {
      // Si el name tiene puntos, significa que es un campo anidado (ej. tutor.nombreTutor)
      if (name.includes(".")) {
        const [parent, child] = name.split(".");

        return {
          ...prevForm,
          [parent]: {
            ...prevForm[parent],
            [child]: value,
          },
        };
      }

      // Para campos simples
      return {
        ...prevForm,
        [name]: value,
      };
    });

    // Fetchs condicionales, que deben venir después del setForm
    if (name === "departamentoColegio") {
      fetch(`http://localhost:8000/api/verprovincias/departamento/${value}`)
        .then(response => response.json())
        .then(data => setProvincias(data))
        .catch(error => console.error("Error al obtener provincias:", error));
      setColegiosDisponibles([]);
    }

    if (name === "provinciaColegio") {
      const departamentoActual = form.departamentoColegio;
      fetch(`http://localhost:8000/api/departamentos/${departamentoActual}/provincias/${value}/colegios`)
        .then(response => response.json())
        .then(data => setColegiosDisponibles(data))
        .catch(error => console.error("Error al obtener colegios:", error));
    }

    if (name === "departamento") {
      fetch(`http://localhost:8000/api/verprovincias/departamento/${value}`)
        .then(response => response.json())
        .then(data => setProvincias(data))
        .catch(error => console.error("Error al obtener provincias:", error));
    }
  };

  const handleAceptar = () => {
    console.log(form);

    console.log(form.tutor);

    const camposRequeridos = [
      "nombrePost", "apellidoPost", "carnet", "correoPost", "fechaNaciPost",
      "idCurso", "departamento", "provincia",
      "tutor.nombreTutor", "tutor.apellidoTutor",
      "tutor.telefonoTutor", "tutor.correoTutor", "tutor.fechaNaciTutor"
    ];

    // Función para acceder a campos anidados
    const getValorCampo = (obj, path) => {
      return path.split('.').reduce((acc, parte) => {
        if (acc && acc[parte] !== undefined) return acc[parte];
        return undefined;
      }, obj);
    };

    // Para detectar cuál campo está vacío (debug)
    const camposVacios = camposRequeridos.filter((campo) => {
      const valor = getValorCampo(form, campo);
      return valor === null || valor === undefined || valor === "";
    });

    if (camposVacios.length > 0 || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
      console.warn("Campos vacíos:", camposVacios);
      alert("Por favor completa todos los campos requeridos y selecciona al menos un área y una categoría.");
      return;
    }

    const colegioSeleccionado = colegiosDisponibles[form.idColegio];
    form.delegacion = colegioSeleccionado;
    handleRegistrar(form);
  };

  const showModal = () => {
    console.log("ID:", idConvocatoria);
    console.log(form.idCurso);

    const cursoSeleccionado = cursos.find((curso) => curso.idCurso == form.idCurso);
    console.log(typeof cursoSeleccionado?.Curso);

    if (!idConvocatoria) {
      console.error("El parámetro 'id' es undefined.");
      return;
    }

    if (!form.idCurso) {
      alert("Debes seleccionar un curso antes de continuar.");
      return;
    }

    fetch(`http://localhost:8000/api/convocatoria/${idConvocatoria}/curso/${cursoSeleccionado.Curso}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const areasTransformadas = data.estructura.map(item => ({
          id: item.area.id,
          nombre: item.area.nombre,
          categorias: item.categorias
        }));
        console.log(areasTransformadas);
        setAreas(areasTransformadas);
      })
      .catch(error => console.error("Error al obtener cursos:", error));

    setMostrarArea(!mostrarArea);
  }

  const handleCheckboxChange = (area) => {
    setAreasSeleccionadas((prev) =>
      prev.some((a) => a.id === area.id)
        ? prev.filter((a) => a.id !== area.id)
        : [...prev, { ...area }]
    );

    categoriasSeleccionadas
      .filter((categoria) =>
        area.categorias.some((c) => c.id === categoria.id)
      )
      .forEach((categoria) => handleCategoriaChange(categoria));

  };

  const handleCategoriaChange = (categoria, area) => {
    setCategoriasSeleccionadas((prev) => {
      const yaSeleccionada = prev.some((a) => a.id === categoria.id);
      const categoriasMismaArea = area.categorias.map((c) => c.id);

      if (yaSeleccionada) {
        // Si ya está seleccionada, la quitamos
        return prev.filter((a) => a.id !== categoria.id);
      } else {
        // Si ya hay una categoría seleccionada de esta área, la reemplazamos
        const sinMismaArea = prev.filter((a) => !categoriasMismaArea.includes(a.id));
        return [...sinMismaArea, { ...categoria }];
      }
    });
    console.log(areasSeleccionadas);
    console.log(categoriasSeleccionadas);
  };

  return (
    <div className="registro-container">
      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Postulante</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" name="nombrePost" onChange={handleChange} />
            <input type="text" placeholder="Apellido(s)" name="apellidoPost" onChange={handleChange} />
            <input type="text" placeholder="Carnet de Identidad" name="carnet" onChange={handleChange} />
            <input type="email" placeholder="Correo Electrónico" name="correoPost" onChange={handleChange} />
            <input type="date" name="fechaNaciPost" onChange={handleChange} />

            <select name="idCurso" onChange={handleChange} value={form.idCurso}>
              <option value="">Selecciona un curso</option>
              {cursos.map((curso) => (
                <option key={curso.idCurso} value={curso.idCurso}>{curso.Curso}</option>
              ))}
            </select>

            <select name="departamento" onChange={handleChange} value={form.departamento}>
              <option value="">Selecciona un departamento </option>
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
          </div>
        </div>

        <div className="recuadro-container">
          <h3> </h3>
          <h3> Datos del Colegio </h3>
          <select name="departamentoColegio" onChange={handleChange} value={form.departamentoColegio}>
            <option value="">Selecciona un departamento</option>
            {departamentos.map((dep) => (
              <option key={dep.idDepartamento} value={dep.nombreDepartamento}>{dep.nombreDepartamento}</option>
            ))}
          </select>

          <select name="provinciaColegio" onChange={handleChange} value={form.provinciaColegio} disabled={!form.departamentoColegio}>
            <option value="">Selecciona una provincia</option>
            {provincias.map((prov) => (
              <option key={prov.idProvincia} value={prov.nombreProvincia}>{prov.nombreProvincia}</option>
            ))}
          </select>

          <select name="idColegio" onChange={handleChange} value={form.idColegio} disabled={!form.provinciaColegio}>
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
              {areasSeleccionadas.length > 0 && categoriasSeleccionadas.length > 0 &&
                areasSeleccionadas.map((area) => (
                  <div key={area.id}>
                    {area?.nombre || "Sin Area"} - {
                      (
                        categoriasSeleccionadas.find((categoria) =>
                          area.categorias.some((c) => c.id === categoria.id)
                        )?.nombre || "Sin categoría"
                      )
                    }
                  </div>
                ))
              }
            </ul>
          </div>
        )}
      </div>

      {/* Botón para mostrar/ocultar área de competencia */}
      <button className="boton btn-competencia" onClick={showModal}>
        {mostrarArea ? "Ocultar Áreas de Competencia" : "Seleccionar Áreas de Competencia"}
      </button>

      {/* Mostrar Área de Competencia si está activado */}
      {mostrarArea && (
        <div className="seccion-container">
          <div className="competencias">
            {areas.map((area) => (
              <div key={area.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={areasSeleccionadas.some((a) => a.id === area.id)}
                    onChange={() => handleCheckboxChange(area)}
                    disabled={areasSeleccionadas.length === 2 && !areasSeleccionadas.some((a) => a.id === area.id)}
                  />
                  {area.nombre}
                </label>
                {areasSeleccionadas.some((a) => a.id === area.id) && (
                  <div>
                    {area.categorias.map((categoria) => (
                      <label>
                        <input
                          type="checkbox"
                          checked={categoriasSeleccionadas.some((a) => a.id === categoria.id)}
                          onChange={() => handleCategoriaChange(categoria, area)}
                          disabled={
                            area.categorias.some((c) =>
                              categoriasSeleccionadas.some((a) => a.id === c.id && a.id !== categoria.id)
                            ) ||
                            (categoriasSeleccionadas.length === 2 &&
                              !categoriasSeleccionadas.some((a) => a.id === categoria.id))
                          }
                        />
                        {categoria.nombre}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Botones de acción */}
      <div className="seccion-container">
        <div className="seccion">
          <h2 className="subtitulo">Tutor</h2>
          <div className="grid-container">
            <input type="text" placeholder="Nombre(s)" name="tutor.nombreTutor" onChange={handleChange} />
            <input type="text" placeholder="Apellido(s)" name="tutor.apellidoTutor" onChange={handleChange} />
            <input type="text" placeholder="Teléfono" name="tutor.telefonoTutor" onChange={handleChange} />
            <input type="email" placeholder="Correo Electrónico" name="tutor.correoTutor" onChange={handleChange} />
            <input type="date" name="tutor.fechaNaciTutor" onChange={handleChange} />
          </div>
        </div>

        <div className="botones">
          <button className="boton btn-blue" onClick={handleAceptar}>Registrar</button>
          <button type="button" className="boton btn-red" onClick={() => setRegistro(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Registro;








