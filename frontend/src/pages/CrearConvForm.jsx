import React, { useState } from "react";
import "./styles/Convocatoria.css";
import ImageUpload from "../components/ImageUpload";

export const CrearConvForm = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicioInscripcion: "",
    fechaCierreInscripcion: "",
    fechaInicioOlimpiada: "",
    fechaFinOlimpiada: "",
    imagenPortada: null,
    maxConcursantes: [],
  });

  const [newArea, setNewArea] = useState("");
  const [newMaxConcursantes, setNewMaxConcursantes] = useState("");
  const [error, setError] = useState(""); // Estado para mostrar errores
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file) => {
    setFormData({ ...formData, imagenPortada: file });
  };

  const addAreaMaxConcursantes = () => {
    if (newArea) {
      setFormData({
        ...formData,
        maxConcursantes: [...formData.maxConcursantes, { area: newArea, max: newMaxConcursantes || "Sin límite" }],
      });
      setNewArea("");
      setNewMaxConcursantes("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar que todos los campos obligatorios estén llenos
    if (
      !formData.titulo ||
      !formData.descripcion ||
      !formData.fechaInicioInscripcion ||
      !formData.fechaCierreInscripcion ||
      !formData.fechaInicioOlimpiada ||
      !formData.fechaFinOlimpiada ||
      !formData.imagenPortada
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setError(""); // Limpiar error si todo está correcto
    console.log("Formulario enviado", formData);
    // Aquí podrías enviar los datos al backend o realizar otra acción
  };

  return (
    <div className="container">
      <h2>Crear convocatoria</h2>
      <form className="convocatoria-form" onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="input-field"
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="input-field"
        ></textarea>

        <label>Fechas de inscripción:</label>
        <div className="fecha-group">
          <input
            type="date"
            name="fechaInicioInscripcion"
            min={today}
            value={formData.fechaInicioInscripcion}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="date"
            name="fechaCierreInscripcion"
            min={today}
            value={formData.fechaCierreInscripcion}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <label>Fechas de olimpiadas:</label>
        <div className="fecha-group">
          <input
            type="date"
            name="fechaInicioOlimpiada"
            min={today}
            value={formData.fechaInicioOlimpiada}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="date"
            name="fechaFinOlimpiada"
            min={today}
            value={formData.fechaFinOlimpiada}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <label>Máximo de concursantes por categoría:</label>
        <div className="area-group">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Máximo de postulantes"
            value={newMaxConcursantes}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value > 0 || e.target.value === "") {
                setNewMaxConcursantes(e.target.value);
              }
            }}
            className="input-field"
          />
          <button type="button" onClick={addAreaMaxConcursantes} className="add-button">
            Agregar
          </button>
        </div>

        <ul className="area-list">
          {formData.maxConcursantes.map((item, index) => (
            <li key={index}>
              {item.area}: {item.max} postulantes
            </li>
          ))}
        </ul>

        <label>Imagen de portada:</label>
        <ImageUpload onFileSelect={handleFileChange} />

        {error && <p className="error-message">{error}</p>}

        <div className="button-group">
          <button type="submit" className="publicar">
            Siguiente
          </button>
          <button type="button" className="cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearConvForm;
