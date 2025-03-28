import React from "react";
import "./styles/DetalleConv.css";
import Header from "../layout/Header";

const DetalleConv = () => {
  const data = [
    { id: 1, area: "Matemáticas", categoria: "Segundo Nivel", inscripcion: "01/04/2025 - 15/04/2025", olimpiada: "15/05/2025 - 20/05/2025", estado: "Activo" },
    { id: 2, area: "Física", categoria: "5_Secundaria", inscripcion: "05/04/2025 - 10/04/2025", olimpiada: "20/05/2025 - 25/05/2025", estado: "Activo" },
    { id: 3, area: "Química", categoria: "4_Secundaria", inscripcion: "10/04/2025 - 15/04/2025", olimpiada: "25/05/2025 - 30/05/2025", estado: "Activo" },
    { id: 4, area: "Informática", categoria: "Londra", inscripcion: "12/04/2025 - 17/04/2025", olimpiada: "30/05/2025 - 05/06/2025", estado: "Activo" },
  ];

  return (
    <div className="container">
      <h2>DETALLE DE CONVOCATORIAS</h2>
      <table className="convocatoria-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>ÁREA DE COMPETENCIA</th>
            <th>CATEGORIA</th>
            <th>FECHA DE INSCRIPCIONES</th>
            <th>FECHA DE OLIMPIADAS</th>
            <th>ESTADO</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.area}</td>
              <td>{item.categoria}</td>
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
          ))}
        </tbody>
      </table>
      <button className="btn agregar">AÑADIR NUEVO</button>
    </div>
  );
};

export default DetalleConv;
