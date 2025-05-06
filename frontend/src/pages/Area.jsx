import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ConvocatoriaContext } from "../context/ConvocatoriaContext";
import "./styles/ayc.css";

const iconStyle = { cursor: "pointer", marginLeft: "10px" };

export default function Area() {
  const location = useLocation();
  const { convocatoria } = useContext(ConvocatoriaContext);
  const [areas, setAreas] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [formArea, setFormArea] = useState({ name: "", description: "" });
  const [idConvocatoria, setIdConvocatoria] = useState("123");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resAreas = await fetch("http://localhost:8000/api/todasAreas");
        const dataAreas = await resAreas.json();
        const areasConCategorias = dataAreas.map((area) => ({
          id: area.idArea,
          name: area.tituloArea,
          description: area.descArea,
          categories: area.categorias || [],
        }));
        setAreas(areasConCategorias);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchDatos();
  }, []);

  const handleAddArea = () => {
    setFormArea({ name: "", description: "" });
    setEditingArea(null);
    setShowAreaModal(true);
  };

  const handleEditArea = (area) => {
    setFormArea({ name: area.name, description: area.description });
    setEditingArea(area);
    setShowAreaModal(true);
  };

  const handleSaveArea = () => {
    if (editingArea) {
      setAreas(areas.map((a) => a.id === editingArea.id ? { ...a, ...formArea } : a));
    } else {
      const newArea = {
        id: Date.now(),
        name: formArea.name,
        description: formArea.description,
        categories: [],
      };
      setAreas([...areas, newArea]);
    }
    setShowAreaModal(false);
  };

  const handleDeleteArea = (id) => {
    setAreas(areas.filter((a) => a.id !== id));
    setSelectedAreas(selectedAreas.filter((areaId) => areaId !== id));
  };

  const handleSelectArea = (e) => {
    const id = Number(e.target.value);
    if (id && !selectedAreas.includes(id)) {
      setSelectedAreas([...selectedAreas, id]);
    }
  };

  const handleMostrarJSON = () => {
    const json = {
      convocatoria,
      areas: areas.map((a) => ({
        tituloArea: a.name,
        descArea: a.description,
        habilitada: true,
        categorias: a.categories.map((cat) => ({
          nombreCategoria: cat.nombreCategoria,
          descCategoria: cat.descCategoria,
        })),
      })),
    };
    console.log("JSON Final:", JSON.stringify(json, null, 2));
    alert("Revisa la consola (F12) para ver el JSON generado.");
  };

  const handlePublicar = async (e) => {
    e.preventDefault();
    if (!idConvocatoria) {
      alert("ID de convocatoria no disponible");
      return;
    }

    const payload = areas.map((a) => ({
      tituloArea: a.name,
      descArea: a.description,
      habilitada: true,
      idConvocatoria,
      categorias: a.categories.map((cat) => ({
        nombreCategoria: cat.nombreCategoria,
        descCategoria: cat.descCategoria,
        habilitada: true,
        maxPost: 50,
      })),
    }));

    try {
      const res = await fetch(`http://localhost:8000/api/convocatoria/${idConvocatoria}/estructura`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ areas: payload }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Estructura publicada con éxito ✅");
        console.log("Respuesta del servidor:", data);
      } else {
        alert(`Error: ${data.error || data.message}`);
      }
    } catch (error) {
      alert("Error de red al guardar la estructura");
      console.error(error);
    }
  };

  return (
    <div className="container-Area">
      <h2>Áreas de competencia</h2>
      <select onChange={handleSelectArea}>
        <option value="">Seleccione un área</option>
        {areas.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <button onClick={handleAddArea}>+ Área</button>

      <div className="area-cards-container">
        {selectedAreas.map((areaId) => {
          const area = areas.find((a) => a.id === areaId);
          if (!area) return null;
          return (
            <div key={area.id} className="area-card-area">
              <strong>Área: {area.name}</strong>
              <span onClick={() => handleEditArea(area)} style={iconStyle}>✏️</span>
              <span onClick={() => handleDeleteArea(area.id)} style={iconStyle}>🗑️</span>
              <p>{area.description}</p>
              <button onClick={() => navigate(`/categorias/${area.id}`)}>+ Categorías</button>
            </div>
          );
        })}
      </div>

      {showAreaModal && (
        <div className="modal-area">
          <div className="modal-content-area">
            <span className="close-modal-area" onClick={() => setShowAreaModal(false)}>❌</span>
            <h3>{editingArea ? "Editar Área" : "Agregar Área"}</h3>
            <input placeholder="Nombre área" value={formArea.name} onChange={(e) => setFormArea({ ...formArea, name: e.target.value })} />
            <textarea placeholder="Descripción área" value={formArea.description} onChange={(e) => setFormArea({ ...formArea, description: e.target.value })} />
            <button onClick={handleSaveArea}>Guardar</button>
          </div>
        </div>
      )}

      <div className="actions">
        <button onClick={handleMostrarJSON}>Ver JSON en consola</button>
        <button onClick={handlePublicar}>Guardar estructura</button>
      </div>
    </div>
  );
}
