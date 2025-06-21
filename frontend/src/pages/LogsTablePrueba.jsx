import React, { useEffect, useState } from 'react';
import './styles/LogsTablePrueba.css';

const apiUrl = import.meta.env.VITE_API_URL;

const LogsTablePrueba = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const token = localStorage.getItem('token');

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const json = await res.json();

      const logs = Array.isArray(json.data)
        ? json.data.map((log) => ({
            ...log,
            causer_name: log.causer_id ? `Usuario #${log.causer_id}` : 'Sistema',
          }))
        : [];

      setAllLogs(logs);
      setCurrentPage(1);
    } catch (e) {
      console.error(e);
      setError('No se pudo cargar la lista de logs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${apiUrl}/logs`;
      if (filterUser) {
        url = `${apiUrl}/logs/user/${filterUser}`;
      } else if (filterAction) {
        url = `${apiUrl}/logs/event/${filterAction}`;
      } else if (dateFrom && dateTo) {
        url = `${apiUrl}/logs/date-range?from=${dateFrom}&to=${dateTo}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const json = await res.json();

      const logs = Array.isArray(json.data)
        ? json.data.map((log) => ({
            ...log,
            causer_name: log.causer_id ? `Usuario #${log.causer_id}` : 'Sistema',
          }))
        : [];

      setAllLogs(logs);
      setCurrentPage(1);
    } catch (e) {
      console.error(e);
      setError('No se pudo cargar la lista filtrada.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLogDetail = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/logs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      data.causer_name = data.causer_id ? `Usuario #${data.causer_id}` : 'Sistema';
      setSelectedLog(data);
    } catch (e) {
      console.error(e);
      alert('No se pudo cargar el detalle de la bitácora.');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = allLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allLogs.length / logsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="logs-container">
      <div className="Titulo">
        <h2>Historial de Actividad (activity_log)</h2>
      </div>

      {/* Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por ID de usuario"
          value={filterUser}
          onChange={(e) => {
            const value = e.target.value;
            setFilterUser(value);
            if (value.trim() === '') {
              setFilterAction('');
              setDateFrom('');
              setDateTo('');
              fetchLogs();
            }
          }}
        />
        <input
          type="text"
          placeholder="Filtrar por acción"
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
        />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <button onClick={fetchFilteredLogs}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && currentLogs.length === 0 && (
        <p>No hay entradas en la bitácora.</p>
      )}

      {!loading && currentLogs.length > 0 && (
        <>
          {/* Tabla escritorio */}
          <table className="logs-table desktop-view">
            <thead>
              <tr>
                <th>Fecha / Hora</th>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Modelo</th>
                <th>Identificación</th>
                <th>Detalle</th>
                <th>Ver</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => {
                const modelName = log.subject_type?.split('\\').pop() || '';
                const fecha = new Date(log.created_at).toLocaleString();
                let detalle = '';
                if (log.properties) {
                  const { old, attributes } = log.properties;
                  if (old && attributes) {
                    detalle = `Antes: ${JSON.stringify(old)}\nDespués: ${JSON.stringify(attributes)}`;
                  } else if (attributes) {
                    detalle = `Creado: ${JSON.stringify(attributes)}`;
                  } else {
                    detalle = JSON.stringify(log.properties);
                  }
                }
                return (
                  <tr key={log.id}>
                    <td>{fecha}</td>
                    <td>{log.causer_name}</td>
                    <td>{log.description}</td>
                    <td>{modelName}</td>
                    <td>{log.subject_id}</td>
                    <td className="detalle-col">{detalle}</td>
                    <td>
                      <button onClick={() => fetchLogDetail(log.id)}>Ver Detalle</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Vista móvil */}
          <div className="mobile-cards">
            {currentLogs.map((log) => {
              const modelName = log.subject_type?.split('\\').pop() || '';
              const fecha = new Date(log.created_at).toLocaleString();
              let detalle = '';
              if (log.properties) {
                const { old, attributes } = log.properties;
                if (old && attributes) {
                  detalle = `Antes: ${JSON.stringify(old)}\nDespués: ${JSON.stringify(attributes)}`;
                } else if (attributes) {
                  detalle = `Creado: ${JSON.stringify(attributes)}`;
                } else {
                  detalle = JSON.stringify(log.properties);
                }
              }
              const isExpanded = expandedIds.includes(log.id);

              return (
                <div className="user-card" key={log.id}>
                  <div className="user-header" onClick={() => toggleExpand(log.id)}>
                    <span>{log.description}</span>
                    <span>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                  {isExpanded && (
                    <div className="user-details">
                      <p><strong>Usuario:</strong> {log.causer_name}</p>
                      <p><strong>Modelo:</strong> {modelName}</p>
                      <p><strong>ID:</strong> {log.subject_id}</p>
                      <p><strong>Detalle:</strong></p>
                      <pre style={{ whiteSpace: 'pre-wrap' }}>{detalle}</pre>
                      <button onClick={() => fetchLogDetail(log.id)}>Ver detalle</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              ← Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Siguiente →
            </button>
          </div>
        </>
      )}

      {/* Modal detalle */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle de Bitácora #{selectedLog.id}</h3>
            <p><strong>Usuario:</strong> {selectedLog.causer_name}</p>
            <p><strong>Acción:</strong> {selectedLog.description}</p>
            <p><strong>Fecha:</strong> {new Date(selectedLog.created_at).toLocaleString()}</p>
            <p><strong>Modelo:</strong> {selectedLog.subject_type?.split('\\').pop()}</p>
            <p><strong>ID:</strong> {selectedLog.subject_id}</p>
            <pre>{JSON.stringify(selectedLog.properties, null, 2)}</pre>
            <button onClick={() => setSelectedLog(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsTablePrueba;

