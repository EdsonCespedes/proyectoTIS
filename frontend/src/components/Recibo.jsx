// Recibo.jsx
import React, { useState, useRef } from 'react';
import './styles/Recibo.css'; // Importa el archivo de estilos CSS

const Recibo = () => {
  const [idRecibo, setIdRecibo] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputCamaraRef = useRef(null); // Ref para el input de cámara
  const [imagenSubida, setImagenSubida] = useState(false); // Estado para saber si se ha subido una imagen

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setImagenSubida(true); // Marcamos que la imagen fue subida
    }
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
    setImagenSubida(false); // Restablecemos el estado de imagen subida
  };

  return (
    <div className="recibo-container">
      <h2 className="recibo-titulo">RECIBO</h2>

      <label className="recibo-label">ID del Recibo :</label>
      <input
        type="text"
        value={idRecibo}
        onChange={(e) => setIdRecibo(e.target.value)}
        className="recibo-input"
      />

      <div className="recibo-upload-area">
        {/* Si no hay imagen subida, mostramos el recuadro de subir foto */}
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
          {/* Si no hay imagen subida, mostramos los botones de subir foto y tomar foto */}
          {!imagenSubida && (
            <>
              <label className="btn-subir">
                <input type="file" onChange={handleImagenChange} hidden />
                📤 Subir foto
              </label>

              {/* Input oculto para abrir la cámara en móviles/laptops */}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                ref={inputCamaraRef}
                onChange={handleImagenChange}
              />
              <button className="btn-tomar" onClick={() => inputCamaraRef.current.click()}>
                📷 Tomar foto
              </button>
            </>
          )}
        </div>
      </div>

      {/* Vista previa de imagen */}
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

      <button className="btn-importar" onClick={handleImportar}>
        Importar
      </button>
    </div>
  );
};

export default Recibo;