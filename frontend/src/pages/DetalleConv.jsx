import React, { useState, useEffect } from "react";
import "./styles/DetalleConv.css";
import { Link, useNavigate } from "react-router-dom";

const DetalleConv = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/todasconvocatorias")
      .then(response => response.json())
      .then(data => setConvocatorias(data))
      .catch(error => console.error("Error al obtener colegios:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-convocatoria/${id}`);
  }

  return (
    <div className="container-detalleCov">
      <h2 className="title-detalleConv">Detalle de convocatorias</h2>
      <table className="convocatoria-table">
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>FECHA DE INSCRIPCIONES</th>
            <th>FECHA DE OLIMPIADAS</th>
            <th>ESTADO</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {convocatorias.map((convocatoria) => (
            <tr key={convocatoria.idConvocatoria}>

              <td>{convocatoria.tituloConvocatoria}</td>

              <td>{convocatoria.fechaInicioInsc} - {convocatoria.fechaFinInsc}</td>
              <td>{convocatoria.fechaInicioOlimp} - {convocatoria.fechaFinOlimp}</td>
              <td>
                <span className={`estado ${convocatoria.habilitada === 0 ? "rojo" : "verde"}`}>
                  {convocatoria.habilitada === 0 ? "Inactivo" : "Activo"}
                </span>
              </td>
              <td>
                <button className="btn editar" onClick={()=>handleEdit(convocatoria.idConvocatoria)}>Editar</button>
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
