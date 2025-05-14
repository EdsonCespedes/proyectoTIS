import React, { useState, useEffect } from 'react';
import './styles/RegistroPago.css';
import { useNavigate } from 'react-router-dom';

//const tutores = [
//{ nombre: 'Juan Perez', ordenes: ['orden001', 'orden002'] },
//{ nombre: 'Maria Lopez', ordenes: ['orden003', 'orden004', 'orden005', 'orden006'] },
//{ nombre: 'Luis Sanchez', ordenes: ['orden007', 'orden008'] },
//];

//const ordenesPago = [
//{ idOrdenPago: 'orden001', idIngresado: '1234', idOCR: '1234', idTutor: 1 },
//{ idOrdenPago: 'orden002', idIngresado: '5678', idOCR: '5678', idTutor: 1 },
//{ idOrdenPago: 'orden003', idIngresado: '9999', idOCR: '9999', idTutor: 2 },
//{ idOrdenPago: 'orden004', idIngresado: '1122', idOCR: '1122', idTutor: 2 },
//  { idOrdenPago: 'orden005', idIngresado: '3333', idOCR: '3333', idTutor: 2 },
//  { idOrdenPago: 'orden006', idIngresado: '4444', idOCR: '4444', idTutor: 2 },
//  { idOrdenPago: 'orden007', idIngresado: '5555', idOCR: '5551', idTutor: 3 },
// { idOrdenPago: 'orden008', idIngresado: '6666', idOCR: '6666', idTutor: 3 },
//];



//  normalizar textos 
const normalizeText = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const RegistroPago = () => {
  const navigate = useNavigate();

  const [tutores, setTutores] = useState([]);
  const [cargando, setCargando] = useState(true);

  // useEffect(() => {
  //   const obtenerRecibosAsociados = async () => {

  //   }

  //   const obtenerOrdenesPago = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/api/buscar-ordenes`);
  //       const data = await response.json();

  //       if (data) {
  //         setTutores(data);

  //         console.log(data);
  //       } else {
  //         console.warn("No se encontraron órdenes");
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener órdenes de pago:", error);
  //     } finally {
  //       setCargando(false);
  //     }
  //   };

  //   obtenerOrdenesPago();
  // }, []);
  useEffect(() => {
    const obtenerRecibosAsociados = async (ordenes) => {
      // Clonar las órdenes para evitar mutaciones directas
      const ordenesConRecibos = await Promise.all(
        ordenes.map(async (orden) => {
          try {
            const response = await fetch(`http://localhost:8000/api/recibos/orden/${orden.idOrdenPago}`);
            const data = await response.json();

            // Agrega la propiedad "recibos" al objeto orden
            return {
              ...orden,
              recibos: data
            };
          } catch (error) {
            console.error(`Error obteniendo recibos para orden ${orden.idOrdenPago}:`, error);
            return orden; // Devolver orden sin modificar si falla
          }
        })
      );

      return ordenesConRecibos;
    };

    const obtenerOrdenesPago = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/buscar-ordenes`);
        const data = await response.json();

        if (data) {
          // En cada tutor, buscar los recibos para sus órdenes
          const tutoresConRecibos = await Promise.all(
            data.map(async (tutor) => {
              const nuevasOrdenes = await obtenerRecibosAsociados(tutor.ordenes_pago || []);
              return {
                ...tutor,
                ordenes_pago: nuevasOrdenes
              };
            })
          );

          setTutores(tutoresConRecibos);
          console.log(tutoresConRecibos);
        } else {
          console.warn("No se encontraron órdenes");
        }
      } catch (error) {
        console.error("Error al obtener órdenes de pago:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerOrdenesPago();
  }, []);


  const [searchText, setSearchText] = useState('');
  const [tutorEncontrado, setTutorEncontrado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [verificaciones, setVerificaciones] = useState({});

  const buscarTutor = () => {
    const textoBuscado = normalizeText(searchText);
    const resultado = tutores.find(tutor =>
      normalizeText(tutor.nombre).includes(textoBuscado)
    );

    if (resultado) {
      const ordenes = resultado.ordenes.map(ordenId => {
        const orden = ordenesPago.find(orden => orden.idOrdenPago === ordenId);
        return {
          idOrdenPago: orden.idOrdenPago,
          idIngresado: orden.idIngresado,
          idOCR: orden.idOCR,
        };
      });
      setTutorEncontrado({ ...resultado, ordenes });
      setMensaje('');
      setVerificaciones({});
    } else {
      setTutorEncontrado(null);
      setMensaje('Tutor no encontrado.');
    }
  };

  const handleVerificacionChange = (ordenId, isChecked) => {
    setVerificaciones(prevState => ({
      ...prevState,
      [ordenId]: isChecked
    }));
  };

  const handleSeleccionarTodos = (isChecked) => {
    if (tutorEncontrado) {
      const nuevasVerificaciones = {};
      tutorEncontrado.ordenes.forEach(orden => {
        nuevasVerificaciones[orden.idOrdenPago] = isChecked;
      });
      setVerificaciones(nuevasVerificaciones);
    }
  };

  return (
    <div className="formulario-pago-container">
      <div className="formulario-card">
        <div className="formulario-header">
          Formulario de Registro de Pago
        </div>

        <div className="formulario-search">
          <span className="menu-icon">☰</span>
          <input
            type="text"
            placeholder="Buscar por nombre del tutor"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarTutor()}
          />
          <span className="search-icon" onClick={buscarTutor}>
            🔍
          </span>
        </div>

        {mensaje && (
          <p style={{ textAlign: 'center', color: 'red' }}>{mensaje}</p>
        )}

        {tutorEncontrado && (
          <>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {tutorEncontrado.nombre} tiene {tutorEncontrado.ordenes.length} orden(es) de pago.
            </p>

            {/* Seleccionar todo */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 5px', marginBottom: '5px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '100px' }}>
                <span></span>
                <span></span>
                <span></span>
                <span>Seleccionar todo</span>
                <input
                  type="checkbox"
                  onChange={(e) => handleSeleccionarTodos(e.target.checked)}
                />
              </label>
            </div>

            <table className="tabla-pago">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Id Ingresado</th>
                  <th>Identificación OCR</th>
                  <th>Verificar</th>
                </tr>
              </thead>
              <tbody>
                {tutorEncontrado.ordenes.map((orden, index) => (
                  <tr key={index}>
                    <td>{orden.idOrdenPago}</td>
                    <td>
                      <input type="text" value={orden.idIngresado} disabled className="input-disabled" />
                    </td>
                    <td>
                      <input type="text" value={orden.idOCR} disabled className="input-disabled" />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={verificaciones[orden.idOrdenPago] || false}
                        onChange={(e) => handleVerificacionChange(orden.idOrdenPago, e.target.checked)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="formulario-botones">
          <button className="guardar-btn">Guardar</button>
          <button
            className="cancelar-btn"
            onClick={() => {
              setSearchText('');
              setTutorEncontrado(null);
              setMensaje('');
              setVerificaciones({});
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistroPago;





