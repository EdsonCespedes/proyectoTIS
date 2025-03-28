import React, { useState } from "react";
import "./styles/ImageUpload.css";

const ImageUpload = ({ onFileSelect }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      onFileSelect(file); // Se envía la imagen al formulario
    }
  };

  return (
    <div className="image-upload-container">
      <label className="upload-box">
        {image ? (
          <img src={image} alt="Vista previa" className="preview-image" />
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">⬆️</span>
            <p>Arrastre y suelte los archivos aquí o haga clic para seleccionarlos</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
      </label>
    </div>
  );
};

export default ImageUpload;
