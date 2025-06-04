import React, { useEffect, useState } from 'react';

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

  // Obtenemos el token del localStorage (debería estar guardado al loguear)
  const token = localStorage.getItem('token');

  // Función genérica para traer una página de logs
  const fetchLogs = async (url = `http://127.0.0.1:8000/api/logs?page=1`) => {
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
      // json.data es el array de registros, json.current_page, json.last_page, etc.
      setLogs(json.data);
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

  // Al montar, traemos la primera página
  useEffect(() => {
    fetchLogs(); // por defecto page=1
  }, []);

  // Manejar paginación
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

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Historial de Actividad (activity_log)</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && logs.length === 0 && (
        <p>No hay entradas en la bitácora.</p>
      )}

      {!loading && logs.length > 0 && (
        <>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1rem',
            }}
          >
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  Fecha / Hora
                </th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  Usuario
                </th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  Acción
                </th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  Modelo
                </th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  ID
                </th>
                <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  Detalle
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                // Por ejemplo, subject_type = "App\\Models\\Tutor"
                // Podemos extraer solo la última parte: "Tutor"
                let modelName = log.subject_type
                  ? log.subject_type.split('\\').pop()
                  : '';
                // Fecha formateada:
                const fecha = new Date(log.created_at).toLocaleString();

                // Construir un pequeño JSON de “antes y después” si existe
                let detalle = '';
                if (log.properties) {
                  // properties puede tener “attributes” (para create) o { old, attributes } (para update)
                  detalle = JSON.stringify(log.properties, null, 0);
                }

                return (
                  <tr key={log.id}>
                    <td
                      style={{ border: '1px solid #ddd', padding: '0.5rem' }}
                    >
                      {fecha}
                    </td>
                    <td
                      style={{ border: '1px solid #ddd', padding: '0.5rem' }}
                    >
                      {log.causer ? log.causer.name : '<Sistema>'}
                    </td>
                    <td
                      style={{ border: '1px solid #ddd', padding: '0.5rem' }}
                    >
                      {log.description}
                    </td>
                    <td
                      style={{ border: '1px solid #ddd', padding: '0.5rem' }}
                    >
                      {modelName}
                    </td>
                    <td
                      style={{ border: '1px solid #ddd', padding: '0.5rem' }}
                    >
                      {log.subject_id}
                    </td>
                    <td
                      style={{
                        border: '1px solid #ddd',
                        padding: '0.5rem',
                        fontSize: '0.85rem',
                        maxWidth: '200px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {detalle}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <button
              onClick={handlePrev}
              disabled={!pagination.prev_page_url}
              style={{
                padding: '0.5rem 1rem',
                background: '#eee',
                border: '1px solid #ccc',
                cursor: pagination.prev_page_url ? 'pointer' : 'not-allowed',
              }}
            >
              ← Anterior
            </button>
            <span>
              Página {pagination.current_page} de {pagination.last_page}
            </span>
            <button
              onClick={handleNext}
              disabled={!pagination.next_page_url}
              style={{
                padding: '0.5rem 1rem',
                background: '#eee',
                border: '1px solid #ccc',
                cursor: pagination.next_page_url ? 'pointer' : 'not-allowed',
              }}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LogsTablePrueba;