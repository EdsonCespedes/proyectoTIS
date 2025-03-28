import React, { useState } from "react";
import "./styles/Convocatoria.css";
import ImageUpload from "./ImageUpload";
import Header from "../layout/Header";

export const CrearConvForm = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    fechaInicioInscripcion: "",
    fechaCierreInscripcion: "",
    fechaInicioOlimpiada: "",
    fechaFinOlimpiada: "",
    categoria: "",
    imagenPortada: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file) => {
    setFormData({ ...formData, imagenPortada: file });
  };

  return (
    <div className="container">
      <h2>CREAR CONVOCATORIA</h2>
      <form className="convocatoria-form">
        <label>TÍTULO:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="input-field"
        />

        <label>FECHAS DE INSCRIPCIÓN:</label>
        <div className="fecha-group">
          <input type="date" name="fechaInicioInscripcion" onChange={handleChange} className="input-field" />
          <input type="date" name="fechaCierreInscripcion" onChange={handleChange} className="input-field" />
        </div>

        <label>FECHAS DE OLIMPIADAS:</label>
        <div className="fecha-group">
          <input type="date" name="fechaInicioOlimpiada" onChange={handleChange} className="input-field" />
          <input type="date" name="fechaFinOlimpiada" onChange={handleChange} className="input-field" />
        </div>

        <label>ÁREA DE INSCRIPCIÓN:</label>
        <button type="button" className="area-button">ÁREA DE COMPETENCIA</button>

        <label>CATEGORÍA:</label>
        <select name="categoria" onChange={handleChange} className="input-field">
          <option value="">Seleccione una categoría</option>
        </select>

        <label>IMAGEN DE PORTADA:</label>
        <ImageUpload onFileSelect={handleFileChange} />

        <div className="button-group">
          <button type="submit" className="publicar">PUBLICAR</button>
          <button type="button" className="cancelar">CANCELAR</button>
        </div>
      </form>
    </div>
  );
};

export default CrearConvForm;
