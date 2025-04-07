import React from "react";
import "./styles/AreaCompetencia.css";

const AreaCompetencia = ({
  areasSeleccionadas,
  setAreasSeleccionadas,
  categoriasSeleccionadas,
  setCategoriasSeleccionadas,
  cursoSeleccionado // nuevo prop
}) => {
  // Las áreas disponibles
  const areasDisponibles = [
    { idArea: 1, tituloArea: "Matemáticas" },
    { idArea: 2, tituloArea: "Física" },
    { idArea: 3, tituloArea: "Química" },
    { idArea: 4, tituloArea: "Biología" },
    { idArea: 5, tituloArea: "Astronomía y Astrofísica" },
    { idArea: 6, tituloArea: "Informática" },
    { idArea: 7, tituloArea: "Robótica" },
  ];

  const categoriasDisponibles = [
    { idCategoria: 1, nombreCategoria: "Primer Nivel", idArea: 1 },
    { idCategoria: 2, nombreCategoria: "Segundo Nivel", idArea: 1 },
    { idCategoria: 3, nombreCategoria: "Tercer Nivel", idArea: 1 },
    { idCategoria: 4, nombreCategoria: "Cuarto Nivel", idArea: 1 },
    { idCategoria: 5, nombreCategoria: "Quinto Nivel", idArea: 1 },
    { idCategoria: 6, nombreCategoria: "Sexto Nivel", idArea: 1 },
    { idCategoria: 7, nombreCategoria: "4_Secundaria", idArea: 2 },
    { idCategoria: 8, nombreCategoria: "5_Secundaria", idArea: 2 },
    { idCategoria: 9, nombreCategoria: "6_Secundaria", idArea: 2 },
    { idCategoria: 10, nombreCategoria: "2_S", idArea: 3 },
    { idCategoria: 11, nombreCategoria: "3_S", idArea: 3 },
    { idCategoria: 1, nombreCategoria: "4_S", idArea: 3 },
    { idCategoria: 2, nombreCategoria: "5_S", idArea: 3 },
    { idCategoria: 3, nombreCategoria: "2_S", idArea: 4 },
    { idCategoria: 4, nombreCategoria: "3_S", idArea: 4 },
    { idCategoria: 5, nombreCategoria: "4_S", idArea: 4 },
    { idCategoria: 6, nombreCategoria: "5_S", idArea: 4},
    { idCategoria: 7, nombreCategoria: "6_S", idArea: 4 },
    { idCategoria: 8, nombreCategoria: "5_Secundaria", idArea: 5 },
    { idCategoria: 9, nombreCategoria: "6_Secundaria", idArea: 5 },
    { idCategoria: 10, nombreCategoria: "2_S", idArea: 6 },
    { idCategoria: 11, nombreCategoria: "3_S", idArea: 6 },
  ];

  // Mapeo de áreas que se deben mostrar por curso
  const areasPorCurso = {
    "4_Primaria": [5],
    "5_Primaria": [6, 5, 7],
    "6_Primaria": [5, 6, 7],
    "1_Secundaria": [1, 5, 6, 7],
    "2_Secundaria": [1, 3, 4, 5, 6, 7],
    "3_Secundaria": [1, 3, 4, 5, 6, 7],
    "4_Secundaria": [1, 2, 3, 4, 5, 7],
    "5_Secundaria": [1, 2, 3, 4, 5, 7],
    "6_Secundaria": [1, 2, 3, 4, 5, 7],
  };

  const handleCheckboxChange = (area) => {
    setAreasSeleccionadas((prev) =>
      prev.some((a) => a.idArea === area.idArea)
        ? prev.filter((a) => a.idArea !== area.idArea)
        : [...prev, { ...area }]
    );
  };

  const handleCategoriaChange = (categoria) => {
    setCategoriasSeleccionadas((prev) =>
      prev.some((a) => a.idCategoria === categoria.idCategoria)
        ? prev.filter((a) => a.idCategoria !== categoria.idCategoria)
        : [...prev, { ...categoria }]
    );
  };

  const areasFiltradas = cursoSeleccionado && areasPorCurso[cursoSeleccionado]
    ? areasDisponibles.filter((area) =>
        areasPorCurso[cursoSeleccionado].includes(area.idArea)
      )
      
    : [];
    console.log('Curso seleccionado:', cursoSeleccionado);
    console.log('Áreas filtradas:', areasFiltradas);


  return (
    <div className="area-competencia">
      <h2>Áreas de Competencia</h2>

      <div className="competencias">
        {areasFiltradas.map((area) => (
          <div key={area.idArea} className="area-item">
            <label>
              <input
                type="checkbox"
                checked={areasSeleccionadas.some((a) => a.idArea === area.idArea)}
                onChange={() => handleCheckboxChange(area)}
              />
              {area.tituloArea}
            </label>

            {areasSeleccionadas.some((a) => a.idArea === area.idArea) && (
              <div className="categorias">
                {categoriasDisponibles
                  .filter((categoria) => categoria.idArea === area.idArea)
                  .map((categoria) => (
                    <label key={categoria.idCategoria} className="categoria-item">
                      <input
                        type="checkbox"
                        checked={categoriasSeleccionadas.some((a) => a.idCategoria === categoria.idCategoria)}
                        onChange={() => handleCategoriaChange(categoria)}
                      />
                      {categoria.nombreCategoria}
                    </label>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaCompetencia;
