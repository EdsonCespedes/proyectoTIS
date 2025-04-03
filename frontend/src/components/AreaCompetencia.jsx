import React from "react";
import "./styles/AreaCompetencia.css"; 

const AreaCompetencia = ({ areasSeleccionadas, setAreasSeleccionadas, categoriasSeleccionadas, setCategoriasSeleccionadas }) => {
  
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

    { idCategoria: 10, nombreCategoria: "2_Secundaria", idArea: 3 },
    { idCategoria: 11, nombreCategoria: "3_Secundaria", idArea: 3 },
  ];

  const handleCheckboxChange = (area) => {
    setAreasSeleccionadas((prev) =>
      prev.some((a) => a.idArea === area.idArea)
        ? prev.filter((a) => a.idArea !== area.idArea)
        : [...prev, { ...area }]
    );

    categoriasSeleccionadas
      .filter((categoria) => categoria.idArea === area.idArea)
      .map((categoria) => handleCategoriaChange(categoria));
  };

  const handleCategoriaChange = (categoria) => {
    setCategoriasSeleccionadas((prev) =>
      prev.some((a) => a.idCategoria === categoria.idCategoria)
        ? prev.filter((a) => a.idCategoria !== categoria.idCategoria)
        : [...prev, { ...categoria }]
    );
  };

  return (
    <div className="area-competencia">
      <h2>Áreas de Competencia</h2>
      
      <div className="competencias">
        {areasDisponibles.map((area) => (
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


