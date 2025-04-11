import React, { useState, useEffect } from "react";
import "./styles/DetalleConv.css";
import { Link } from "react-router-dom";
import Header from "../layout/Header";

const DetalleConv = () => {
  const data = [
    // { id: 1, area: "Matemáticas", categoria: "Segundo Nivel", inscripcion: "01/04/2025 - 15/04/2025", olimpiada: "15/05/2025 - 20/05/2025", estado: "Activo" },
    // { id: 2, area: "Física", categoria: "5_Secundaria", inscripcion: "05/04/2025 - 10/04/2025", olimpiada: "20/05/2025 - 25/05/2025", estado: "Activo" },
    // { id: 3, area: "Química", categoria: "4_Secundaria", inscripcion: "10/04/2025 - 15/04/2025", olimpiada: "25/05/2025 - 30/05/2025", estado: "Activo" },
    // { id: 4, area: "Informática", categoria: "Londra", inscripcion: "12/04/2025 - 17/04/2025", olimpiada: "30/05/2025 - 05/06/2025", estado: "Activo" },
    { titulo: "Olimpiadas 1-2023", inscripcion: "01/04/2025 - 15/04/2025", olimpiada: "15/05/2025 - 20/05/2025", estado: "Inactivo" },
    { titulo: "Olimpiadas 2-2023", inscripcion: "05/04/2025 - 10/04/2025", olimpiada: "20/05/2025 - 25/05/2025", estado: "Inactivo" },
    { titulo: "Olimpiadas 1-2024", inscripcion: "10/04/2025 - 15/04/2025", olimpiada: "25/05/2025 - 30/05/2025", estado: "Inactivo" },
    { titulo: "Olimpiadas 2-2024", inscripcion: "12/04/2025 - 17/04/2025", olimpiada: "30/05/2025 - 05/06/2025", estado: "Activo" },
  ];

  const [convocatorias, setConvocatorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/convocatorias")
      .then(response => response.json())
      .then(data => setConvocatorias(data))
      .catch(error => console.error("Error al obtener colegios:", error));
  }, []);

  return (
    <div className="container">
      <h2>DETALLE DE CONVOCATORIAS</h2>
      <table className="convocatoria-table">
        <thead>
          <tr>
            {/* <th>N°</th>
            <th>ÁREA DE COMPETENCIA</th>
            <th>CATEGORIA</th> */}
            <th>TÍTULO</th>
            <th>FECHA DE INSCRIPCIONES</th>
            <th>FECHA DE OLIMPIADAS</th>
            <th>ESTADO</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item) => (
            <tr key={item.id}> */}
              {/* <td>{index + 1}</td>
              <td>{item.area}</td>
              <td>{item.categoria}</td> */}
              {/* <td>{item.titulo}</td>
              <td>{item.inscripcion}</td>
              <td>{item.olimpiada}</td>
              <td>
                <span className={`estado ${item.estado === "Inactivo" ? "rojo" : "verde"}`}>
                  {item.estado}
                </span>
              </td>
              <td>
                <button className="btn editar">Editar</button>
                <button className="btn eliminar">Retirar</button>
              </td>
            </tr>
          ))} */}
          {convocatorias.map((convocatoria) => (
            <tr key={convocatoria.idConvocatoria}>
              <td>Titulo {convocatoria.titulo == null ? convocatoria.idConvocatoria : convocatoria.titulo}</td>
              <td>{convocatoria.fechaInicioInsc} - {convocatoria.fechaFinInsc}</td>
              <td>{convocatoria.fechaInicioOlimp} - {convocatoria.fechaFinOlimp}</td>
              <td>
                <span className={`estado ${convocatoria.activo === 0 ? "rojo" : "verde"}`}>
                  {convocatoria.activo === 0 ? "Inactivo" : "Activo"}
                </span>
              </td>
              <td>
                <button className="btn editar">Editar</button>
                <button className="btn eliminar">Retirar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn agregar"><Link to="/crear-convocatoria" className="text-button">AÑADIR NUEVO</Link></button>
      <button className="btn agregar"><Link to="/" className="text-button">SALIR</Link></button>
    </div>
  );
};

export default DetalleConv;
