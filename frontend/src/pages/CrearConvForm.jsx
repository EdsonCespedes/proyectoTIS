import React, { useState } from "react";
import "./styles/Convocatoria.css";
import { Link } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

const CrearConvocatoria = () => {
  const [paso, setPaso] = useState(1);
  const [convocatoria, setConvocatoria] = useState({
    titulo: "",
    fechaInicioInscripcion: "",
    fechaCierreInscripcion: "",
    fechaInicioOlimpiada: "",
    fechaFinOlimpiada: "",
    maximoConcursantes: "",
    portada: null,
    portadaPreview: null,
  });

  const [areas, setAreas] = useState([]);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    setConvocatoria({ ...convocatoria, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file, previewURL) => {
    setConvocatoria((prev) => ({
      ...prev,
      portada: file,
      portadaPreview: previewURL, // Guarda la vista previa en el estado global
    }));
  };

  // Agregar un área
  const agregarArea = () => {
    setAreas([...areas, { titulo: "", descripcion: "", categorias: [] }]);
  };

  // Manejar cambios en las áreas
  const handleAreaChange = (index, e) => {
    const newAreas = [...areas];
    newAreas[index][e.target.name] = e.target.value;
    setAreas(newAreas);
  };

  // Agregar categoría a un área específica
  const agregarCategoria = (areaIndex) => {
    const newAreas = [...areas];
    newAreas[areaIndex].categorias.push({ titulo: "", descripcion: "" });
    setAreas(newAreas);
  };

  // Manejar cambios en las categorías
  const handleCategoriaChange = (areaIndex, catIndex, e) => {
    const newAreas = [...areas];
    newAreas[areaIndex].categorias[catIndex][e.target.name] = e.target.value;
    setAreas(newAreas);
  };

  //Logica del para subir al BACKEND
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const formData = new FormData();
    formData.append("titulo", convocatoria.titulo);
    formData.append("fechaInicioInscripcion", convocatoria.fechaInicioInscripcion);
    formData.append("fechaCierreInscripcion", convocatoria.fechaCierreInscripcion);
    formData.append("fechaInicioOlimpiada", convocatoria.fechaInicioOlimpiada);
    formData.append("fechaFinOlimpiada", convocatoria.fechaFinOlimpiada);
    formData.append("maximoConcursantes", convocatoria.maximoConcursantes);
    formData.append("portada", convocatoria.portada);

      // Agregar las áreas y categorías al FormData
    areas.forEach((area, areaIndex) => {
      formData.append(`areas[${areaIndex}][titulo]`, area.titulo);
      formData.append(`areas[${areaIndex}][descripcion]`, area.descripcion);

      area.categorias.forEach((categoria, catIndex) => {
        formData.append(`areas[${areaIndex}][categorias][${catIndex}][titulo]`, categoria.titulo);
        formData.append(`areas[${areaIndex}][categorias][${catIndex}][descripcion]`, categoria.descripcion);
      });
    });

    try {
      const response = await fetch("http://tu-api.com/api/convocatoria", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al enviar la convocatoria");

      const data = await response.json();
      console.log("Convocatoria creada:", data);
    } catch (error) {
      console.error(error);
    }
  };

  //Si el backend no interpreta bien los datos anidados, es posible que necesites enviarlos en formato JSON en lugar de FormData:
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const payload = {
  //     ...convocatoria,
  //     areas: areas,
  //   };

  //   try {
  //     const response = await fetch("http://tu-api.com/api/convocatoria", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) throw new Error("Error al enviar la convocatoria");

  //     const data = await response.json();
  //     console.log("Convocatoria creada:", data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //Este enfoque es más fácil de manejar en Laravel con request()->json()->all();.
  //NOTA DE ISAAC: ESTA PARTE EN ESPECIFICO ME HICE AYUDAR CON CHATGPT ASI QUE... veanlo con calma



  return (
    <div className="convocatoria-container">
      {paso === 1 && (
        <form className="convocatoria-form" onSubmit={handleSubmit}>
          <h1>CREAR CONVOCATORIA</h1>
          <label>TÍTULO:</label>
          <input type="text" name="titulo" value={convocatoria.titulo} onChange={handleChange} className="input-field" placeholder="Título"/>

          <label>FECHAS DE INSCRIPCIÓN:</label>
          <div className="fecha-group">
            <input type="date" name="fechaInicioInscripcion" value={convocatoria.fechaInicioInscripcion} onChange={handleChange}/>
            <input type="date" name="fechaCierreInscripcion" value={convocatoria.fechaCierreInscripcion} onChange={handleChange}/>
          </div>

          <label>FECHAS DE OLIMPIADAS:</label>
          <div className="fecha-group">
            <input type="date" name="fechaInicioOlimpiada" value={convocatoria.fechaInicioOlimpiada} onChange={handleChange}/>
            <input type="date" name="fechaFinOlimpiada" value={convocatoria.fechaFinOlimpiada} onChange={handleChange}/>
          </div>

          <label>MÁXIMO DE CONCURSANTES POR ÁREA:</label>
          <input
            type="number"
            name="maximoConcursantes"
            value={convocatoria.maximoConcursantes}
            onChange={handleChange}
            placeholder="Máximo Concursantes"
            className="input-field"
          />

          <label>IMAGEN DE PORTADA:</label>
          <ImageUpload onFileSelect={handleFileChange} imagePreview={convocatoria.portadaPreview} />

          <h2>Agregar Áreas y Categorías</h2>
          {areas.map((area, areaIndex) => (
            <div key={areaIndex} className="area">
              <label>Área {areaIndex + 1}</label>
              <input
                type="text"
                name="titulo"
                value={area.titulo}
                onChange={(e) => handleAreaChange(areaIndex, e)}
                placeholder="Título del Área"
              />
              <input
                type="text"
                name="descripcion"
                value={area.descripcion}
                onChange={(e) => handleAreaChange(areaIndex, e)}
                placeholder="Descripción"
              />
              <button className="add-categoria" onClick={(e) => { e.preventDefault(); agregarCategoria(areaIndex) }}>
                Agregar Categoría
              </button>

              {area.categorias.map((categoria, catIndex) => (
                <div key={catIndex} className="categoria">
                  <label>Categoría {catIndex + 1}</label>
                  <input
                    type="text"
                    name="titulo"
                    value={categoria.titulo}
                    onChange={(e) => handleCategoriaChange(areaIndex, catIndex, e)}
                    placeholder="Título de Categoría"
                  />
                  <input
                    type="text"
                    name="descripcion"
                    value={categoria.descripcion}
                    onChange={(e) => handleCategoriaChange(areaIndex, catIndex, e)}
                    placeholder="Descripción"
                  />
                </div>
              ))}
            </div>
          ))}
          <button className="add-area" onClick={(e) => { e.preventDefault(); agregarArea() }}>Agregar Área</button>

          <div className="button-group">
            <button type="submit" className="publicar">PUBLICAR</button>
            <button type="button" onClick={() => setPaso(2)}>VISTA PREVIA EN JSON</button>
            <Link to="/detalle-convocatoria" className="cancelar">CANCELAR</Link>
          </div>
        </form>
      )}

      {paso === 2 && (
        <>
          <h2>Revisar y Confirmar</h2>
          <pre>{JSON.stringify({ convocatoria, areas }, null, 2)}</pre>
          {convocatoria.portadaPreview && (
            <img src={convocatoria.portadaPreview} alt="Vista Previa" style={{ width: "100px", height: "100px" }} />
          )}
          <button onClick={() => setPaso(1)}>Atrás</button>
          <button onClick={handleSubmit}>Enviar</button>
        </>
      )}
    </div>
  );
};

export default CrearConvocatoria;

