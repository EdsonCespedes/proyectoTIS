import React, { useState, useEffect } from "react";
import "./styles/DetalleConv.css";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const DetalleConv = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/convocatorias/activas`)
      .then((response) => response.json())
      .then((data) => setConvocatorias(data))
      .catch((error) => console.error("Error al obtener colegios:", error));
  }, [refresh]);

  const handleEdit = (id) => {
    navigate(`/editar-convocatoria/${id}`);
  };

  const handleDelete = async (id) => {
    // (dejas tu código actual para eliminar aquí)
    // ...
  };

  return (
    <div className="container-detalleConv lista-usuarios">
      <h2 className="title-detalleConv">Detalle de convocatorias</h2>

      {/* Vista escritorio */}
      <div className="desktop tabla-contenedor">
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
                <td>
                  {convocatoria.fechaInicioInsc} - {convocatoria.fechaFinInsc}
                </td>
                <td>
                  {convocatoria.fechaInicioOlimp} - {convocatoria.fechaFinOlimp}
                </td>
                <td>
                  <span
                    className={`estado ${
                      convocatoria.habilitada === 0 ? "rojo" : "verde"
                    }`}
                  >
                    {convocatoria.habilitada === 0 ? "Inactivo" : "Activo"}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(convocatoria.idConvocatoria)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(convocatoria.idConvocatoria)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="mobile-cards">
        {convocatorias.map((convocatoria) => (
          <div key={convocatoria.idConvocatoria} className="user-card">
            <div className="user-header">
              <span>{convocatoria.tituloConvocatoria}</span>
              <span
                className={`estado ${
                  convocatoria.habilitada === 0 ? "rojo" : "verde"
                }`}
              >
                {convocatoria.habilitada === 0 ? "Inactivo" : "Activo"}
              </span>
            </div>
            <div className="user-details">
              <p>
                <strong>Inscripciones:</strong>{" "}
                {convocatoria.fechaInicioInsc} - {convocatoria.fechaFinInsc}
              </p>
              <p>
                <strong>Olimpiadas:</strong>{" "}
                {convocatoria.fechaInicioOlimp} - {convocatoria.fechaFinOlimp}
              </p>
              <div className="card-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(convocatoria.idConvocatoria)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(convocatoria.idConvocatoria)}
                >
                  ❌ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn agregar">
        <Link to="/crear-convocatoria" className="text-button">
          + Agregar
        </Link>
      </button>
      <button className="btn-ir">
        <Link to="/" className="text-button">
          Salir
        </Link>
      </button>
    </div>
  );
};

export default DetalleConv;
