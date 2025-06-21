import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import './styles/Recibo.css';
import { useLocation, useNavigate } from 'react-router-dom';

import SpinnerInsideButton from './SpinnerInsideButton';

const apiUrl = import.meta.env.VITE_API_URL;

const Recibo = () => {
  const location = useLocation();
  const orden = location.state.orden;
  const tutorGuardado = JSON.parse(localStorage.getItem('tutor'));
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [idRecibo, setIdRecibo] = useState('');
  const [imagen, setImagen] = useState(null);
  const [textoExtraido, setTextoExtraido] = useState('');
  const [procesandoOCR, setProcesandoOCR] = useState(false);
  const [mensajeCoincidencia, setMensajeCoincidencia] = useState('');
  const inputCamaraRef = useRef(null);
  const [imagenSubida, setImagenSubida] = useState(false);

  const [subiendo, setSubiendo] = useState(false);

  const validarIdRecibo = (id) => /^\d{6}$/.test(id);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setImagenSubida(true);
      extraerTextoOCR(file);
    }
  };

  const extraerTextoOCR = (file) => {
    setProcesandoOCR(true);
    setTextoExtraido('');
    setMensajeCoincidencia('');

    Tesseract.recognize(
      file,
      'spa',
      { logger: (m) => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log('Texto detectado:', text);
      setTextoExtraido(text);
      setProcesandoOCR(false);
      setMensajeCoincidencia('ℹ️ Imagen procesada. Por favor, ingresa el ID para verificar coincidencias.');
    }).catch((err) => {
      console.error('Error al procesar OCR:', err);
      setProcesandoOCR(false);
      setMensajeCoincidencia('❌ Error al procesar la imagen.');
    });
  };

  // Verifica coincidencias automáticamente cuando se escribe el ID o se termina el OCR
  useEffect(() => {
    if (textoExtraido && idRecibo.trim() !== '') {
      const textPlano = textoExtraido.toLowerCase();
      const tutor = (tutorGuardado.nombreTutor + " " + tutorGuardado.apellidoTutor).toLowerCase();

      if (textoExtraido.includes(idRecibo)) {
        if (textPlano.includes(tutor) && textPlano.includes(orden.montoTotal)) {
          setMensajeCoincidencia('✅ El ID fue encontrado en la imagen y coincide con el tutor y orden de pago');
        } else {
          setMensajeCoincidencia('❌ El ID fue encontrado en la imagen pero no coincide con el tutor o la orden de pago. Por favor suba una imagen más clara o la imagen correcta.');
        }
      } else {
        setMensajeCoincidencia('❌ El ID no se encontró en la imagen.');
      }
    }
  }, [idRecibo, textoExtraido]);

  const handleImportar = async () => {
    setSubiendo(true);

    if (!idRecibo || !imagen) {
      alert('Por favor, ingresa un ID de recibo y sube una imagen.');
      setSubiendo(false);
      return;
    }
    if (!validarIdRecibo(idRecibo)) {
      alert('El ID debe tener exactamente 6 dígitos numéricos.');
      setSubiendo(false);
      return;
    }

    const formData = new FormData();
    formData.append('id', idRecibo);
    formData.append('idOrdenPago', orden.idOrdenPago);
    formData.append('imagen_comprobante', imagen);

    try {
      const res = await fetch(`${apiUrl}/recibos/${idRecibo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const response = await fetch(`${apiUrl}/recibos`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error al registrar el recibo:`, errorText);
          setSubiendo(false);
          return;
        }
      } else {
        formData.append('_method', 'PUT');
        fetch(`${apiUrl}/recibos/${idRecibo}`, {
          method: "POST", // o "PUT" si usas PUT
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then(res => res.json())
          .then(data => console.log("Recibo actualizado:", data))
          .catch(err => {
            console.error("Error al actualizar:", err)
            setSubiendo(false);
            return;
          });

      }



      const { idOrdenPago, ...datos } = orden;
      datos.cancelado = true;

      try {
        const respuesta = await fetch(`${apiUrl}/ordenpago/${orden.idOrdenPago}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(resultado.message || 'Error al actualizar la orden');
        }

        console.log('Orden actualizada:', resultado.orden);
      } catch (error) {
        console.error('Error:', error.message);
        alert('Hubo un problema al actualizar la orden de pago');
        setSubiendo(false);
      }

      navigate("/ordenes-pago");
    } catch (error) {
      console.error(`Error al registrar el recibo:`, error);
      setSubiendo(false);
    } finally {
      setSubiendo(false);
    }
  };

  const handleEliminarImagen = () => {
    setImagen(null);
    setImagenSubida(false);
    setTextoExtraido('');
    setMensajeCoincidencia('');
  };

  return (
    <div className="recibo-container">
      <h2 className="titulo">RECIBO</h2>
      <div className="formulario-subtitulo">
        Por favor, suba una foto visible del recibo proporcionado por Caja Facultativa e ingrese el ID Recibo (numérico de 6 dígitos).
      </div>

      <label className="recibo-label">
        ID del Recibo:
        <input
          type="text"
          value={idRecibo}
          onChange={(e) => setIdRecibo(e.target.value)}
          className="recibo-input"
          maxLength={6}
          pattern="\d{6}"
          title="Debe ser un número de 6 dígitos"
        />
      </label>

      {mensajeCoincidencia && (
        <p style={{
          marginTop: '5px',
          fontWeight: 'bold',
          color: mensajeCoincidencia.includes('✅')
            ? 'green'
            : mensajeCoincidencia.includes('❌')
              ? 'red'
              : 'orange'
        }}>
          {mensajeCoincidencia}
        </p>
      )}

      <div className="recibo-upload-area">
        {!imagenSubida && (
          <div className="recibo-icono">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRxNdcnkpvPuXk-3JXJzM1l-0tdpu3PTo1k52Vl1G3GVH1o7-VM0YyxIJd4fBfuZY6lX0&usqp=CAU"
              alt="Subir"
              className="icono-imagen"
            />
          </div>
        )}
        <div className="recibo-botones">
          {!imagenSubida && (
            <label className="btn-subir">
              <input type="file" onChange={handleImagenChange} hidden />
              📤 Subir foto
            </label>
          )}
        </div>
      </div>

      {imagen && (
        <div style={{ marginBottom: '20px' }}>
          <p>Vista previa:</p>
          <img
            src={URL.createObjectURL(imagen)}
            alt="Vista previa"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              marginBottom: '10px',
            }}
          />
          <br />
          <button onClick={handleEliminarImagen} className="btn-eliminar">
            ❌ Quitar imagen
          </button>
        </div>
      )}

      {procesandoOCR && <p>🔄 Procesando imagen con OCR...</p>}

      <button className="btn-importar" onClick={handleImportar}>
        Enviar {subiendo && <span><SpinnerInsideButton /></span>}
      </button>
    </div>
  );
};

export default Recibo;


