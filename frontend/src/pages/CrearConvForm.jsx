import React, { useState, useContext } from "react";
import "./styles/Convocatoria.css";
import ImageUpload from "../components/ImageUpload";
import { useNavigate } from "react-router-dom";
import { ConvocatoriaContext } from "../context/ConvocatoriaContext";
import SpinnerInsideButton from "../components/SpinnerInsideButton";

const apiUrl = import.meta.env.VITE_API_URL;

export const CrearConvForm = () => {
  const token = localStorage.getItem('token');
  
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicioInscripcion: "",
    fechaCierreInscripcion: "",
    fechaInicioOlimpiada: "",
    fechaFinOlimpiada: "",
    imagenPortada: null,
    maxConcursantes: 0,
  });

  const [mostrarAviso, setMostrarAviso] = useState({
    fechaInicioInscripcion: false,
    fechaCierreInscripcion: false,
    fechaInicioOlimpiada: false,
    fechaFinOlimpiada: false,
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { agregarConvocatoria } = useContext(ConvocatoriaContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file) => {
    setFormData({ ...formData, imagenPortada: file });
  };

  const isValidDateFormat = (dateStr) => {
    // Requiere formato YYYY-MM-DD y asegura que sea una fecha válida
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(new Date(dateStr).getTime());
  };

  const convertToMDY = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    return `${m}-${d}-${y}`;
  };

  const getYear = (dateStr) => {
    const year = dateStr.split("-")[0];
    return /^\d{4}$/.test(year) ? parseInt(year) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    const {
      titulo,
      descripcion,
      fechaInicioInscripcion,
      fechaCierreInscripcion,
      fechaInicioOlimpiada,
      fechaFinOlimpiada,
      imagenPortada,
      maxConcursantes,
    } = formData;

    // 1. Campos obligatorios
    if (
      !titulo ||
      !descripcion ||
      !fechaInicioInscripcion ||
      !fechaCierreInscripcion ||
      !fechaInicioOlimpiada ||
      !fechaFinOlimpiada ||
      !imagenPortada
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      setCargando(false);
      return;
    }

    // 2. Validación de formato de fecha y año (YYYY-MM-DD, 4 dígitos)
    const fechas = [
      fechaInicioInscripcion,
      fechaCierreInscripcion,
      fechaInicioOlimpiada,
      fechaFinOlimpiada,
    ];
    for (let fecha of fechas) {
      if (!isValidDateFormat(fecha)) {
        setError("Formato de fecha incorrecto. Debe ser YYYY-MM-DD.");
        setCargando(false);
        return;
      }
      const year = getYear(fecha);
      if (!year || year < new Date().getFullYear()) {
        setError("El año debe tener 4 dígitos y no ser menor al actual.");
        setCargando(false);
        return;
      }
    }

    // 3. Validación de fechas lógicas
    if (new Date(fechaInicioInscripcion) >= new Date(fechaCierreInscripcion)) {
      setError("La fecha de cierre de inscripción debe ser posterior al inicio.");
      setCargando(false);
      return;
    }

    if (new Date(fechaCierreInscripcion) >= new Date(fechaInicioOlimpiada)) {
      setError("El inicio de olimpiada debe ser posterior al cierre de inscripción.");
      setCargando(false);
      return;
    }

    if (new Date(fechaInicioOlimpiada) > new Date(fechaFinOlimpiada)) {
      setError("La fecha de fin de olimpiada debe ser posterior al inicio.");
      setCargando(false);
      return;
    }

    // 4. No permitir coincidencia entre inscripción y olimpiada
    if (
      fechaInicioInscripcion === fechaInicioOlimpiada ||
      fechaCierreInscripcion === fechaInicioOlimpiada
    ) {
      setError("Las fechas de inscripción no deben coincidir con el inicio de la olimpiada.");
      setCargando(false);
      return;
    }

    // 5. Validar concursantes
    if (isNaN(maxConcursantes) || parseInt(maxConcursantes) < 0) {
      setError("El número máximo de concursantes debe ser un número positivo.");
      setCargando(false);
      return;
    }

    // Enviar formulario
    const fechaFinInsc = `${fechaCierreInscripcion} 23:59:59`;
    const fechaFinOlimp = `${fechaFinOlimpiada} 23:59:59`;

    const newformData = new FormData();
    newformData.append("titulo", titulo);
    newformData.append("descripcion", descripcion);
    newformData.append("fechaPublicacion", new Date().toISOString().split("T")[0]);
    newformData.append("fechaInicioInsc", fechaInicioInscripcion);
    newformData.append("fechaFinInsc", fechaFinInsc);
    newformData.append("portada", imagenPortada);
    newformData.append("habilitada", "1");
    newformData.append("fechaInicioOlimp", fechaInicioOlimpiada);
    newformData.append("fechaFinOlimp", fechaFinOlimp);
    newformData.append("maximoPostPorArea", maxConcursantes);

    try {
      const response = await fetch(`${apiUrl}/solo-convocatoria`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newformData,
      });

      const text = await response.text();
      if (!response.ok) {
        console.error("Error del servidor:", text);
        setCargando(false);
        return;
      }

      const data = JSON.parse(text);
      navigate(`/area`, {
        state: { idConvocatoria: data.idConvocatoria },
      });
    } catch (error) {
      console.error("Error al guardar la convocatoria:", error);
      setCargando(false);
    }
  };

  const handleCancelar = () => {
    navigate("/detalle-convocatoria");
  };

  const handleBloqueoTeclado = (e, campo) => {
    e.preventDefault();
    setMostrarAviso(prev => ({ ...prev, [campo]: true }));

    setTimeout(() => {
      setMostrarAviso(prev => ({ ...prev, [campo]: false }));
    }, 3000);
  };

  return (
    <div className="container-formconv">
      <h3 className="title-add-convocatoria">Crear convocatoria</h3>
      <form className="convocatoria-form">
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
            onKeyDown={(e) => handleBloqueoTeclado(e, "fechaInicioInscripcion")}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
          />
          {mostrarAviso.fechaInicioInscripcion && (
            <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>
          )}
          <input
            type="date"
            name="fechaCierreInscripcion"
            min={formData.fechaInicioInscripcion || today}
            value={formData.fechaCierreInscripcion}
            onChange={handleChange}
            onKeyDown={(e) => handleBloqueoTeclado(e, "fechaCierreInscripcion")}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
          />
          {mostrarAviso.fechaCierreInscripcion && (
            <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>
          )}
        </div>

        <label>Fechas de olimpiadas:</label>
        <div className="fecha-group">
          <input
            type="date"
            name="fechaInicioOlimpiada"
            min={formData.fechaCierreInscripcion || today}
            value={formData.fechaInicioOlimpiada}
            onChange={handleChange}
            onKeyDown={(e) => handleBloqueoTeclado(e, "fechaInicioOlimpiada")}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
          />
          {mostrarAviso.fechaInicioOlimpiada && (
            <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>
          )}
          <input
            type="date"
            name="fechaFinOlimpiada"
            min={formData.fechaInicioOlimpiada || today}
            value={formData.fechaFinOlimpiada}
            onChange={handleChange}
            onKeyDown={(e) => handleBloqueoTeclado(e, "fechaFinOlimpiada")}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
          />
          {mostrarAviso.fechaFinOlimpiada && (
            <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>
          )}
        </div>

        <label>Máximo de inscripción por categoría:</label>
        <input
          type="number"
          name="maxConcursantes"
          min="0"
          value={formData.maxConcursantes}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 0 || e.target.value === "") {
              handleChange(e);
            }
          }}
          className="input-field"
        />

        <label>Imagen de portada:</label>
        <ImageUpload onFileSelect={handleFileChange} />

        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="button-crearconv">
        <button
          type="submit"
          className="siguiente-crearconv"
          onClick={handleSubmit}
          disabled={cargando}
        >
          Siguiente {cargando && <span><SpinnerInsideButton /></span>}
        </button>
        <button
          type="button"
          className="cancelar-crearconv"
          onClick={handleCancelar}
          disabled={cargando}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CrearConvForm;
