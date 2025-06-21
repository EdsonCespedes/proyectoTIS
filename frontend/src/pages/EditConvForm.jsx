import React, { useState, useEffect } from "react";
import "./styles/Convocatoria.css";
import ImageUpload from "../components/ImageUpload";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerInsideButton from "../components/SpinnerInsideButton";

const apiUrl = import.meta.env.VITE_API_URL;

export const EditConvForm = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicioInscripcion: "",
    fechaCierreInscripcion: "",
    fechaInicioOlimpiada: "",
    fechaFinOlimpiada: "",
    imagenPortada: null,
    maxConcursantes: 0,
    maxArea: [],
  });

  const [mostrarAviso, setMostrarAviso] = useState({
    fechaInicioInscripcion: false,
    fechaCierreInscripcion: false,
    fechaInicioOlimpiada: false,
    fechaFinOlimpiada: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [convocatoria, setConvocatoria] = useState({});
  const [areas, setAreas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConv = async () => {
      try {
        const res = await fetch(`${apiUrl}/veridconvocatorias/${id}`);
        if (!res.ok) throw new Error("Error al obtener la convocatoria");
        const data = await res.json();

        setConvocatoria(data);
        setFormData({
          titulo: data.tituloConvocatoria,
          descripcion: data.descripcion,
          fechaInicioInscripcion: data.fechaInicioInsc.split(' ')[0],
          fechaCierreInscripcion: data.fechaFinInsc.split(' ')[0],
          fechaInicioOlimpiada: data.fechaInicioOlimp.split(' ')[0],
          fechaFinOlimpiada: data.fechaFinOlimp.split(' ')[0],
          imagenPortada: data.portada,
          maxConcursantes: data.maximoPostPorArea,
          maxArea: [],
        });

        setAreas(data.areas);
      } catch (error) {
        console.error("Error cargando convocatoria:", error);
      }
    };

    fetchConv();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (file) => {
    setFormData({ ...formData, imagenPortada: file });
    setFieldErrors(prev => ({ ...prev, imagenPortada: "" }));
  };

  const handleBloqueoTeclado = (e, campo) => {
    e.preventDefault();
    setMostrarAviso(prev => ({ ...prev, [campo]: true }));
    setTimeout(() => {
      setMostrarAviso(prev => ({ ...prev, [campo]: false }));
    }, 3000);
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

    const newErrors = {};
    if (!titulo) newErrors.titulo = "El título es obligatorio.";
    if (!descripcion) newErrors.descripcion = "La descripción es obligatoria.";
    if (!fechaInicioInscripcion) newErrors.fechaInicioInscripcion = "Seleccione una fecha.";
    if (!fechaCierreInscripcion) newErrors.fechaCierreInscripcion = "Seleccione una fecha.";
    if (!fechaInicioOlimpiada) newErrors.fechaInicioOlimpiada = "Seleccione una fecha.";
    if (!fechaFinOlimpiada) newErrors.fechaFinOlimpiada = "Seleccione una fecha.";
    if (!imagenPortada) newErrors.imagenPortada = "Debe subir una imagen.";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setCargando(false);
      return;
    }

    if (new Date(fechaInicioInscripcion) >= new Date(fechaCierreInscripcion)) {
      setError("La fecha de cierre de inscripción debe ser posterior al inicio.");
      setCargando(false);
      return;
    }

    if (new Date(fechaCierreInscripcion) >= new Date(fechaInicioOlimpiada)) {
      setError("El inicio de la olimpiada debe ser posterior al cierre de inscripción.");
      setCargando(false);
      return;
    }

    if (new Date(fechaInicioOlimpiada) > new Date(fechaFinOlimpiada)) {
      setError("La fecha de fin de olimpiada debe ser posterior al inicio.");
      setCargando(false);
      return;
    }

    if (
      fechaInicioInscripcion === fechaInicioOlimpiada ||
      fechaCierreInscripcion === fechaInicioOlimpiada
    ) {
      setError("Las fechas de inscripción no deben coincidir con el inicio de la olimpiada.");
      setCargando(false);
      return;
    }

    const fechaFinInsc = `${fechaCierreInscripcion} 23:59:59`;
    const fechaFinOlimp = `${fechaFinOlimpiada} 23:59:59`;

    const newformData = new FormData();
    newformData.append("_method", "PUT");
    newformData.append("tituloConvocatoria", titulo);
    newformData.append("descripcion", descripcion);
    newformData.append("fechaPublicacion", convocatoria.fechaPublicacion.split(" ")[0]);
    newformData.append("fechaInicioInsc", fechaInicioInscripcion);
    newformData.append("fechaFinInsc", fechaFinInsc);

    if (imagenPortada instanceof File) {
      newformData.append("portada", imagenPortada);
    }

    newformData.append("habilitada", "1");
    newformData.append("fechaInicioOlimp", fechaInicioOlimpiada);
    newformData.append("fechaFinOlimp", fechaFinOlimp);
    newformData.append("maximoPostPorArea", maxConcursantes);
    newformData.append("eliminado", convocatoria.eliminado);

    try {
      const response = await fetch(`${apiUrl}/editconvocatorias/${id}`, {
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

      navigate(`/editar-convocatoria/${id}/edit-area`, {
        state: { idConvocatoria: id, areas: areas, maxPost: maxConcursantes },
      });
    } catch (error) {
      console.error("Error al guardar la convocatoria:", error);
      setCargando(false);
    }
  };

  const handleCancelar = () => {
    navigate("/detalle-convocatoria");
  };

  return (
    <div className="container-formconv">
      <h3 className="title-add-convocatoria">Editar convocatoria</h3>
      <form className="convocatoria-form">
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="input-field"
        />
        {fieldErrors.titulo && <p className="error-message">{fieldErrors.titulo}</p>}

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="input-field"
        />
        {fieldErrors.descripcion && <p className="error-message">{fieldErrors.descripcion}</p>}

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
          {mostrarAviso.fechaInicioInscripcion && <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>}
          {fieldErrors.fechaInicioInscripcion && <p className="error-message">{fieldErrors.fechaInicioInscripcion}</p>}

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
          {mostrarAviso.fechaCierreInscripcion && <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>}
          {fieldErrors.fechaCierreInscripcion && <p className="error-message">{fieldErrors.fechaCierreInscripcion}</p>}
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
            disabled={!formData.fechaInicioInscripcion || !formData.fechaCierreInscripcion}
          />
          {mostrarAviso.fechaInicioOlimpiada && <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>}
          {fieldErrors.fechaInicioOlimpiada && <p className="error-message">{fieldErrors.fechaInicioOlimpiada}</p>}

          <input
            type="date"
            name="fechaFinOlimpiada"
            min={formData.fechaInicioOlimpiada || today}
            value={formData.fechaFinOlimpiada}
            onChange={handleChange}
            onKeyDown={(e) => handleBloqueoTeclado(e, "fechaFinOlimpiada")}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
            disabled={!formData.fechaInicioOlimpiada}
          />
          {mostrarAviso.fechaFinOlimpiada && <p className="mensaje-teclado">⚠️ Usa el calendario para seleccionar la fecha.</p>}
          {fieldErrors.fechaFinOlimpiada && <p className="error-message">{fieldErrors.fechaFinOlimpiada}</p>}
        </div>

        <label>Máximo de inscripción por categoría:</label>
        <input
          type="number"
          name="maxConcursantes"
          value={formData.maxConcursantes}
          onChange={handleChange}
          className="input-field"
        />

        <label>Imagen de portada:</label>
        <ImageUpload onFileSelect={handleFileChange} imagenInicial={formData.imagenPortada} />
        {fieldErrors.imagenPortada && <p className="error-message">{fieldErrors.imagenPortada}</p>}

        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="button-crearconv">
        <button type="submit" className="siguiente-crearconv" onClick={handleSubmit} disabled={cargando}>
          Siguiente {cargando && <span><SpinnerInsideButton /></span>}
        </button>
        <button type="button" className="cancelar-crearconv" onClick={handleCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditConvForm;