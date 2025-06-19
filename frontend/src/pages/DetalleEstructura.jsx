import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/DetalleEstructura.css";

const apiUrl = import.meta.env.VITE_API_URL;

const DetalleEstructura = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [convocatoria, setConvocatoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConvocatoria = async () => {
      try {
        const res = await fetch(`${apiUrl}/veridconvocatorias/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar la convocatoria");
        const data = await res.json();
        setConvocatoria(data);
      } catch (err) {
        console.error("Error al cargar:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchConvocatoria();
  }, [id]);

  const handleInscribirse = () => {
    navigate(`/convocatoria/${id}/tipo-inscripcion`);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (!convocatoria) return <div className="error">No se encontró la convocatoria.</div>;

  return (
    <div className="estructura-container">
      <h2 className="tituloConv">{convocatoria.tituloConvocatoria}</h2>
      <p className="descripcionConv">{convocatoria.descripcion}</p>

      <div className="tabla-wrapper">
        <table className="tabla-estructura">
          <thead>
            <tr>
              <th>Área</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Monto (Bs.)</th>
              <th>Cursos</th>
              <th>Máx. Postulantes</th>
            </tr>
          </thead>
          <tbody>
            {convocatoria.areas?.length > 0 ? (
              convocatoria.areas.map((area) =>
                area.categorias?.map((cat, idx) => (
                  <tr key={cat.idCategoria}>
                    {idx === 0 && (
                      <>
                        <td rowSpan={area.categorias.length}>{area.tituloArea}</td>
                        <td rowSpan={area.categorias.length}>{area.descArea}</td>
                      </>
                    )}
                    <td>{cat.nombreCategoria}</td>
                    <td>{Number(cat.montoCate).toFixed(2)}</td>
                    <td>{cat.descCategoria}</td>
                    <td>{cat.maxPost}</td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No hay estructura registrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="btn-inscribirse" onClick={handleInscribirse}>
        Inscribirse
      </button>
    </div>
  );
};

export default DetalleEstructura;
