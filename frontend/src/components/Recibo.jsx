// Recibo.jsx
import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './styles/Recibo.css';

const Recibo = () => {
  const [idRecibo, setIdRecibo] = useState('');
  const [imagen, setImagen] = useState(null);
  const [textoExtraido, setTextoExtraido] = useState('');
  const [procesandoOCR, setProcesandoOCR] = useState(false);
  const [mensajeCoincidencia, setMensajeCoincidencia] = useState('');
  const inputCamaraRef = useRef(null);
  const [imagenSubida, setImagenSubida] = useState(false);

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

      if (idRecibo.trim() !== '') {
        if (text.includes(idRecibo)) {
          setMensajeCoincidencia('✅ El ID fue encontrado en la imagen.');
        } else {
          setMensajeCoincidencia('❌ El ID no se encontró en la imagen por favor suba la imagen correcta .');
          
        }
      } else {
        setMensajeCoincidencia('⚠️ Por favor, escribe un ID antes de subir la imagen.');
      }
    }).catch((err) => {
      console.error('Error al procesar OCR:', err);
      setProcesandoOCR(false);
      setMensajeCoincidencia('❌ Error al procesar la imagen.');
    });
  };

  const handleImportar = () => {
    if (!idRecibo || !imagen) {
      alert('Por favor, ingresa un ID de recibo y sube una imagen.');
      return;
    }
    console.log('Importando recibo con ID:', idRecibo, 'y archivo:', imagen);
  };

  const handleEliminarImagen = () => {
    setImagen(null);
    setImagenSubida(false);
    setTextoExtraido('');
    setMensajeCoincidencia('');
  };

  return (
    <div className="recibo-container">
      <h2 className="recibo-titulo">RECIBO</h2>

      <label className="recibo-label">ID del Recibo:</label>
      <input
        type="text"
        value={idRecibo}
        onChange={(e) => setIdRecibo(e.target.value)}
        className="recibo-input"
      />

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

      {textoExtraido && (
        <div className="texto-extraido">
          <p><strong>Texto extraído de la imagen:</strong></p>
          <pre>{textoExtraido}</pre>
        </div>
      )}

      <button className="btn-importar" onClick={handleImportar}>
        Importar
      </button>
    </div>
  );
};

export default Recibo;
