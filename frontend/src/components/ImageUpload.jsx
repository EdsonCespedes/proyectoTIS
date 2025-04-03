import React from "react";
import "./styles/ImageUpload.css";

const ImageUpload = ({ onFileSelect, imagePreview }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(file, reader.result); // Pasar el archivo y la vista previa al padre
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container">
      <label className="upload-box">
        {imagePreview ? (
          <img src={imagePreview} alt="Vista previa" className="preview-image" />
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

