import React, { useState } from "react";
import "./styles/Convocatoria.css";
import ImageUpload from "../components/ImageUpload";
import { useNavigate } from "react-router-dom";


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
    maxArea: [],
  });

  const [newArea, setNewArea] = useState("");
  const [newMax, setNewMax] = useState("");
  const [newMaxConcursantes, setNewMaxConcursantes] = useState("");
  const [error, setError] = useState(""); // Estado para mostrar errores
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();


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

  const handleSubmit = async (e) => {
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
    const formDataToSend = new FormData();
    formDataToSend.append("fechaPublicacion", new Date().toISOString().split("T")[0]); // o usa otro valor si es manual
    formDataToSend.append("fechaInicioInsc", formData.fechaInicioInscripcion);
    formDataToSend.append("fechaFinInsc", formData.fechaCierreInscripcion);
    formDataToSend.append("fechaInicioOlimp", formData.fechaInicioOlimpiada);
    formDataToSend.append("fechaFinOlimp", formData.fechaFinOlimpiada);
    formDataToSend.append("habilitada", 1); // o false, según tu lógica
    formDataToSend.append("portada", formData.imagenPortada);

    try {
      const response = await fetch("http://localhost:8000/api/convocatorias", {
        method: "POST",
        body: formDataToSend, // sin headers aquí
      });

      // if (!response.ok) throw new Error("Error al enviar datos");
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Errores de validación:", errorData.errors);
        throw new Error("Error en la validación");
      }

      const result = await response.json();
      console.log("Convocatoria creada:", result);
      // redirige o limpia formulario aquí
    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Ocurrió un error al guardar la convocatoria.");
    }

  };

  const handleSiguiente = (e) => {
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

    setError("");
    handleSubmit(e);
    navigate("/area"); // Asegúrate de que esta ruta coincida con tu configuración
  };

  const handleCancelar = () => {
    navigate("/detalle-convocatoria");
  };


  return (
    <div className="container-formconv">
      <h3 className="title-add-convocatoria">Crear convocatoria</h3>
      <form className="convocatoria-form" onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          maxLength={1300}
          onChange={handleChange}
          className="input-field"
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          maxLength={1300}
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

        <label>Máximo de inscripción por categoría{/*área*/}:</label>
        <input
          type="number"
          name="maxArea"
          value={formData.maxArea}
          onChange={(e) => {
            if (e.target.value.length <= 6) {
              handleChange(e);
            }
          }}
          className="input-field"
        />
        
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

      </form>
      <div className="button-group">
          <button type="submit" className="siguiente" onClick={handleSiguiente}>
            Siguiente
          </button>
          <button type="button" className="cancelar" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
    </div>
    
  );
};

export default CrearConvForm;
