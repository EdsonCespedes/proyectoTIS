import React, { useEffect, useState } from "react";
import "./styles/Area.css";

function Area() {
  const [areasAPI, setAreasAPI] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [nombreArea, setNombreArea] = useState("");
  const [lemaArea, setLemaArea] = useState("");
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [indiceAreaSeleccionada, setIndiceAreaSeleccionada] = useState(null);
  const [mostrarFormularioArea, setMostrarFormularioArea] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/vercursos")
      .then((res) => res.json())
      .then(setCursos)
      .catch((err) => console.error("Error al obtener cursos:", err));

    fetch("http://localhost:8000/api/todasAreas")
      .then((res) => res.json())
      .then((data) => {
        const areasFormateadas = data.map((area) => ({
          nombre: area.tituloArea,
          lema: area.descArea,
          categorias: [], // Aquí puedes adaptar si tienes categorías reales
        }));
        setAreasAPI(areasFormateadas);
      })
      .catch((err) => console.error("Error al obtener áreas:", err));
  }, []);

  const guardarAreaYCategoria = () => {
    if (!nombreArea || !lemaArea || cursosSeleccionados.length === 0) return;

    const cursosElegidos = cursos
      .filter((c) => cursosSeleccionados.includes(c.idCurso))
      .map((c) => c.Curso);

    const nuevaCategoria = { grados: cursosElegidos };

    const nuevasAreas = [...areasAPI];

    if (indiceAreaSeleccionada !== null) {
      // Reemplazar las categorías de la área seleccionada
      nuevasAreas[indiceAreaSeleccionada].categorias = [nuevaCategoria];
    } else {
      // Agregar una nueva área si no estamos editando una
      nuevasAreas.push({
        nombre: nombreArea,
        lema: lemaArea,
        categorias: [nuevaCategoria],
      });
    }

    setAreasAPI(nuevasAreas);
    setNombreArea("");
    setLemaArea("");
    setCursosSeleccionados([]);
    setMostrarFormularioArea(false);
  };

  const eliminarArea = (index) => {
    const nuevasAreas = areasAPI.filter((_, i) => i !== index);
    setAreasAPI(nuevasAreas);
    setIndiceAreaSeleccionada(null);
  };


  const editarArea = () => {
    const area = areasAPI[indiceAreaSeleccionada];
    setNombreArea(area.nombre);
    setLemaArea(area.lema);
    setCursosSeleccionados(
      area.categorias?.flatMap((cat) => cat.grados).map((g) => cursos.find((c) => c.Curso === g)?.idCurso) || []
    );
    setMostrarFormularioArea(true);
  };

  const publicar = () => {
    const jsonFinal = {
      convocatoria: {},
      areas: areasAPI,
    };
    console.log("JSON final:", JSON.stringify(jsonFinal, null, 2));
    alert("JSON generado, revisa la consola.");
  };

  const cerrarAreaSeleccionada = () => {
    setIndiceAreaSeleccionada(null);
  };

  return (
    <div className="contenedor">
      <h2>Áreas de competencia</h2>

      {/* Selector de áreas */}
      <div>
        <label>Selecciona un área:</label>
        <select
          value={indiceAreaSeleccionada ?? ""}
          onChange={(e) => setIndiceAreaSeleccionada(parseInt(e.target.value))}
        >
          <option value="">-- Selecciona un área --</option>
          {areasAPI.map((a, i) => (
            <option key={i} value={i}>
              {a.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar área seleccionada */}
      {indiceAreaSeleccionada !== null && (
        <div className="area-box">
          <div className="area-header">
            <strong>
              Área: {areasAPI[indiceAreaSeleccionada].nombre}
            </strong>
            <button onClick={editarArea}>✏️</button>
            <button onClick={() => eliminarArea(indiceAreaSeleccionada)}>🗑️</button>
            <button onClick={cerrarAreaSeleccionada}>❌</button> {/* Botón de Cerrar */}
          </div>
          <p>{areasAPI[indiceAreaSeleccionada].lema}</p>

          {areasAPI[indiceAreaSeleccionada].categorias?.map((cat, j) => (
            <div key={j} className="categoria-box">
              <strong>Categoría {j + 1}</strong>
              <p>{cat.grados.join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {/* Formulario para agregar nueva área o categoría */}
      <div style={{ marginTop: "10px" }}>
        {!mostrarFormularioArea ? (
          <button onClick={() => setMostrarFormularioArea(true)}>+ Área y Categoría</button>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Nombre del área"
              value={nombreArea}
              onChange={(e) => setNombreArea(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripción del área"
              value={lemaArea}
              onChange={(e) => setLemaArea(e.target.value)}
            />

            <p><strong>Categorías:</strong></p>
            {cursos.map((curso) => (
              <div key={curso.idCurso}>
                <label>
                  <input
                    type="checkbox"
                    value={curso.idCurso}
                    checked={cursosSeleccionados.includes(curso.idCurso)}
                    onChange={(e) => {
                      const seleccionado = e.target.checked;
                      if (seleccionado) {
                        setCursosSeleccionados([...cursosSeleccionados, curso.idCurso]);
                      } else {
                        setCursosSeleccionados(
                          cursosSeleccionados.filter((c) => c !== curso.idCurso)
                        );
                      }
                    }}
                  />
                  {curso.Curso}
                </label>
              </div>
            ))}

            <button onClick={guardarAreaYCategoria}>Guardar</button>
            <button onClick={() => setMostrarFormularioArea(false)}>Cancelar</button>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button onClick={publicar}>Publicar</button>
        <button onClick={() => setAreasAPI([])}>Cancelar</button>
      </div>
    </div>
  );
}

export default Area;

