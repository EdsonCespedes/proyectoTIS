import React, { useState } from "react";
import "./AreaCompetencia.css"; // Archivo de estilos

const AreaCompetencia = ({ setModalVisible }) => {
  const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);

  const competencias = {
    Matemáticas: ["Primer Nivel", "Segundo Nivel", "Tercer Nivel", "Cuarto Nivel", "Quinto Nivel", "Sexto Nivel"],
    Física: ["4_Secundaria", "5_Secundaria", "6_Secundaria"],
    Química: ["2_Secundaria", "3_Secundaria", "4_Secundaria", "5_Secundaria", "6_Secundaria"],
    Biología: ["2_Secundaria", "3_Secundaria", "4_Secundaria", "5_Secundaria", "6_Secundaria"],
    "Astronomía y Astrofísica": ["3_Primaria", "4_Primaria", "5_Primaria", "6_Primaria", "1_Secundaria", "2_Secundaria"],
    Informática: ["Guacamayo", "Guanaco", "Londra", "Jucumari", "Bufeo", "Puma"],
    Robótica: ["Builders P", "Builders S", "Lego P", "Lego S"],
  };

  const handleCheckboxChange = (area) => {
    setAreasSeleccionadas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>ÁREAS DE COMPETENCIAS</h2>
        <button className="close-btn" onClick={() => setModalVisible(false)}>✖</button>

        <div className="competencias">
          {Object.keys(competencias).map((area) => (
            <label key={area}>
              <input
                type="checkbox"
                checked={areasSeleccionadas.includes(area)}
                onChange={() => handleCheckboxChange(area)}
              />
              {area}
            </label>
          ))}
        </div>

        {/* Mostrar los niveles seleccionados en una fila */}
        <div className="niveles-container">
          {areasSeleccionadas.map((area) => (
            <div key={area} className="niveles">
              <h3>{area}</h3>
              {competencias[area].map((nivel) => (
                <label key={nivel}>
                  <input type="radio" name={area} />
                  {nivel}
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="modal-buttons">
          <button className="btn-registrar">Registrar</button>
          <button className="btn-cancelar" onClick={() => setModalVisible(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AreaCompetencia;
