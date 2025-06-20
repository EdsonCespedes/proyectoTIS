import React, { useState, useEffect } from "react";
import "./styles/Convocatoria.css";
import ImageUpload from "../components/ImageUpload";
import { useNavigate, useParams } from "react-router-dom";

import SpinnerInsideButton from "../components/SpinnerInsideButton";

const apiUrl = import.meta.env.VITE_API_URL;


export const EditConvForm = () => {
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
    maxArea: [],
  });
  const { id } = useParams();
  console.log(id);
  const [mostrarAviso, setMostrarAviso] = useState({
    fechaInicioInscripcion: false,
    fechaCierreInscripcion: false,
    fechaInicioOlimpiada: false,
    fechaFinOlimpiada: false,
  });

  const [convocatoria, setConvocatoria] = useState({});
  const [areas, setAreas] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchConv = async () => {
      try {
        const res = await fetch(`${apiUrl}/veridconvocatorias/${id}`);
        if (!res.ok) throw new Error("Error al obtener la convocatoria");
        const data = await res.json();
        setConvocatoria(data);


        const dato = {
          titulo: data.tituloConvocatoria,
          descripcion: data.descripcion,
          fechaInicioInscripcion: data.fechaInicioInsc.split(' ')[0],
          fechaCierreInscripcion: data.fechaFinInsc.split(' ')[0],
          fechaInicioOlimpiada: data.fechaInicioOlimp.split(' ')[0],
          fechaFinOlimpiada: data.fechaFinOlimp.split(' ')[0],
          imagenPortada: data.portada,
          maxConcursantes: data.maximoPostPorArea,
          maxArea: [],
        }
        setFormData(dato);

        setAreas(data.areas);
      } catch (error) {
        console.error("Error cargando permisos:", error);
      }
    };

    fetchConv();


  }, []);

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
    setCargando(true);

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
      setCargando(false);
      return;
    }
    setError("");

    const fechaFinInsc = `${formData.fechaCierreInscripcion} 23:59:59`;
    const fechaFinOlimp = `${formData.fechaFinOlimpiada} 23:59:59`;


    const newformData = new FormData();
    newformData.append('_method', 'PUT');
    newformData.append('tituloConvocatoria', formData.titulo);
    newformData.append('descripcion', formData.descripcion);
    newformData.append('fechaPublicacion', convocatoria.fechaPublicacion.split(' ')[0]);
    newformData.append('fechaInicioInsc', formData.fechaInicioInscripcion);
    newformData.append('fechaFinInsc', fechaFinInsc);

    //newformData.append('portada', formData.imagenPortada); // <-- tu imagen
    if (formData.imagenPortada instanceof File) {
      newformData.append('portada', formData.imagenPortada);
    }
    newformData.append('habilitada', '1');
    newformData.append('fechaInicioOlimp', formData.fechaInicioOlimpiada);
    newformData.append('fechaFinOlimp', fechaFinOlimp);

    newformData.append('maximoPostPorArea', formData.maxConcursantes);
    newformData.append('eliminado', convocatoria.eliminado);

    try {
      const response = await fetch(`${apiUrl}/editconvocatorias/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newformData,
      });

      const text = await response.text();
      if (!response.ok) {
        console.error('Error del servidor:', text); // en vez de tratar de hacer response.json() directamente
        setCargando(false);
        return;
      }

      navigate(`/editar-convocatoria/${id}/edit-area`, {
        state: { idConvocatoria: id, areas: areas, maxPost: formData.maxConcursantes },
      });
    } catch (error) {
      console.error('Error al guardar la convocatoria:', error);
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

        <label>Máximo de inscripción por categoría{/*área*/}:</label>
        <input
          type="number"
          name="maxConcursantes"
          value={formData.maxConcursantes}
          onChange={handleChange}
          className="input-field"
        />

        <label>Imagen de portada:</label>
        <ImageUpload onFileSelect={handleFileChange} imagenInicial={formData.imagenPortada} />

        {error && <p className="error-message">{error}</p>}


      </form>
      <div className="button-crearconv">
        <button type="submit" className="siguiente-crearconv" onClick={handleSubmit}>
          Siguiente  {cargando && (<span><SpinnerInsideButton/></span>)}
        </button>
        <button type="button" className="cancelar-crearconv" onClick={handleCancelar}>
          Cancelar
        </button>
      </div>
    </div>


  );
};

export default EditConvForm;
