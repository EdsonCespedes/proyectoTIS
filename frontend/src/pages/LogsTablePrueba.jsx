import React, { useEffect, useState } from 'react';
import './styles/LogsTablePrueba.css';

const apiUrl = import.meta.env.VITE_API_URL;

const LogsTablePrueba = () => {
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const [usuarios, setUsuarios] = useState([]);

  const token = localStorage.getItem('token');

  const fetchLogs = async (usuariosDisponibles, url = `${apiUrl}/logs?page=1`) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
      const json = await res.json();
      const logs = json.data;

      const logsWithNames = logs.map((log) => {
        if (log.causer_id) {
          const usuario = usuariosDisponibles.find(u => u.id === log.causer_id);
          return {
            ...log,
            causer_name: usuario ? `${usuario.name} ${usuario.apellido}` : 'Desconocido',
          };
        } else {
          return {
            ...log,
            causer_name: 'Sistema',
          };
        }
      });
      
      setLogs(logsWithNames);
      console.log(logsWithNames);

      setPagination({
        current_page: json.current_page,
        last_page: json.last_page,
        next_page_url: json.next_page_url,
        prev_page_url: json.prev_page_url,
      });
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

    const query = new URLSearchParams();
    if (filterUser) query.append('user', filterUser);
    if (filterAction) query.append('action', filterAction);

    try {
      const res = await fetch(`${apiUrl}/logs/filter?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const json = await res.json();
      setLogs(json.data);
      setPagination({
        current_page: json.current_page,
        last_page: json.last_page,
        next_page_url: json.next_page_url,
        prev_page_url: json.prev_page_url,
      });
    } catch (e) {
      console.error(e);
      setError('No se pudo cargar la lista filtrada.');
    } finally {
      setLoading(false);
    }
  };

  // const fetchLogDetail = async (id) => {
  //   try {
  //     const res = await fetch(`${apiUrl}/logs/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Error ${res.status}`);
  //     }

  //     const data = await res.json();

  //     // Agrega causer_name si tiene causer_id
  //     if (data.causer_id) {
  //       try {
  //         const userRes = await fetch(`${apiUrl}/especificousers/${data.causer_id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Content-Type': 'application/json',
  //           },
  //         });

  //         if (userRes.ok) {
  //           const userData = await userRes.json();
  //           data.causer_name = `${userData.name} ${userData.apellido}`;
  //         } else {
  //           data.causer_name = 'Desconocido';
  //         }
  //       } catch (err) {
  //         console.error(`Error al obtener usuario para log ${id}`, err);
  //         data.causer_name = 'Desconocido';
  //       }
  //     } else {
  //       data.causer_name = 'Sistema';
  //     }

  //     setSelectedLog(data);
  //   } catch (e) {
  //     console.error(e);
  //     alert('No se pudo cargar el detalle de la bitácora.');
  //   }
  // };
  const fetchLogDetail = async (id) => {
    if (!usuarios.length) {
      alert('Espere a que se carguen los usuarios...');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/logs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const data = await res.json();

      // Buscar el nombre del usuario localmente
      if (data.causer_id) {
        const usuario = usuarios.find(u => u.id === data.causer_id);
        data.causer_name = usuario
          ? `${usuario.name} ${usuario.apellido}`
          : 'Desconocido';
      } else {
        data.causer_name = 'Sistema';
      }

      setSelectedLog(data);
    } catch (e) {
      console.error(e);
      alert('No se pudo cargar el detalle de la bitácora.');
    }
  };


  const fetchUsuarios = async () => {
    try {
      const res = await fetch(`${apiUrl}/todosusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Error al obtener usuarios');
      }

      const data = await res.json();
      console.log(data);
      setUsuarios(data);
      return data;
    } catch (e) {
      console.error('Error al cargar todos los usuarios:', e);
      setUsuarios([]);
      return [];
    }
  };


  useEffect(() => {
    // fetchUsuarios();
    // fetchLogs();
    const cargarDatos = async () => {
      const usuariosCargados = await fetchUsuarios(); // Espera a que termine
      if (usuariosCargados.length > 0) {
        await fetchLogs(usuariosCargados); // pásalos como parámetro
      }
    };

    cargarDatos();
  }, []);

  const handlePrev = () => {
    if (pagination.prev_page_url) {
      fetchLogs(pagination.prev_page_url);
    }
  };

  const handleNext = () => {
    if (pagination.next_page_url) {
      fetchLogs(pagination.next_page_url);
    }
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
          placeholder="Filtrar por usuario"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por acción"
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
        />
        <button onClick={fetchFilteredLogs}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && logs.length === 0 && (
        <p>No hay entradas en la bitácora.</p>
      )}

      {!loading && logs.length > 0 && (
        <>
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
              {logs.map((log) => {
                const modelName = log.subject_type
                  ? log.subject_type.split('\\').pop()
                  : '';
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
                    <td>{log.causer_id ? log.causer_name : '<Sistema>'}</td>
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

          {/* Vista Móvil */}
          <div className="mobile-cards">
            {logs.map((log) => {
              const modelName = log.subject_type ? log.subject_type.split('\\').pop() : '';
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
                    <span className="user-name">{log.causer_name || "Sistema"}</span>
                    <span className="toggle-icon">{isExpanded ? "▲" : "▼"}</span>
                  </div>
                  {isExpanded && (
                    <div className="user-details">
                      <p><strong>Fecha:</strong> {fecha}</p>
                      <p><strong>Acción:</strong> {log.description}</p>
                      <p><strong>Modelo:</strong> {modelName}</p>
                      <p><strong>ID:</strong> {log.subject_id}</p>
                      <p><strong>Detalle:</strong> {detalle}</p>
                      <button onClick={() => fetchLogDetail(log.id)}>Ver Detalle</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pagination">
            <button
              onClick={handlePrev}
              disabled={!pagination.prev_page_url}
              className="pagination-btn"
            >
              ← Anterior
            </button>
            <span>
              Página {pagination.current_page} de {pagination.last_page}
            </span>
            <button
              onClick={handleNext}
              disabled={!pagination.next_page_url}
              className="pagination-btn"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}

      {/* Modal de Detalle */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle de Bitácora #{selectedLog.id}</h3>
            <p><strong>Usuario:</strong> {selectedLog.causer_name || 'Sistema'}</p>
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
