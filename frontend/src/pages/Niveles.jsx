import React, { useState } from "react";
import "./styles/Niveles.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Niveles = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  const navigate = useNavigate();


  const [areas, setAreas] = useState([
    { id: 1, nombre: "Matemáticas", categorias: ["Primer Nivel", "Segundo Nivel"] },
    { id: 2, nombre: "Física", categorias: ["4_Secundaria", "5_Secundaria"] },
    { id: 3, nombre: "Química", categorias: ["2_Secundaria", "3_Secundaria"] }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [newAreaName, setNewAreaName] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  // Agregar un área nueva
  const handleAddArea = () => {
    if (newAreaName.trim()) {
      setAreas([...areas, { id: areas.length + 1, nombre: newAreaName, categorias: [] }]);
      setNewAreaName("");
      setShowModal(false);
    }
  };

  // Editar un área existente
  const handleEditArea = () => {
    setAreas(
      areas.map((area) =>
        area.id === editingArea.id ? { ...area, nombre: newAreaName } : area
      )
    );
    setEditingArea(null);
    setNewAreaName("");
    setShowModal(false);
  };

  // Abrir modal de edición con datos prellenados
  const openEditModal = (area) => {
    setEditingArea(area);
    setNewAreaName(area.nombre);
    setShowModal(true);
  };

  // Eliminar un área
  const handleDeleteArea = (id) => {
    setAreas(areas.filter((area) => area.id !== id));
  };

  // Abrir modal para agregar categoría
  const openCategoryModal = (area) => {
    setSelectedArea(area);
    setShowCategoryModal(true);
  };

  // Agregar categoría a un área específica
  const handleAddCategory = () => {
    if (newCategory.trim() && selectedArea) {
      setAreas(
        areas.map((area) =>
          area.id === selectedArea.id
            ? { ...area, categorias: [...area.categorias, newCategory] }
            : area
        )
      );
      setNewCategory("");
      setShowCategoryModal(false);
    }
  };

  // Eliminar categoría
  const handleDeleteCategory = (areaId, category) => {
    setAreas(
      areas.map((area) =>
        area.id === areaId
          ? { ...area, categorias: area.categorias.filter((c) => c !== category) }
          : area
      )
    );
  };

  const handleRegistrar = () => {
    navigate("/detalle-convocatoria"); // Asegúrate de que esta ruta coincida con tu configuración
  };
  
  const handleCancelar = () => {
    navigate("/detalle-convocatoria");
  };
  

  return (
    <div className="container">
      <h2>Áreas de Competencia</h2>
      <button className="add-button" onClick={() => setShowModal(true)}>Agregar Área</button>
      
      <div className="areas-grid">
        {areas.map((area) => (
          <div key={area.id} className="area-card">
            <h3>{area.nombre}</h3>
            <button onClick={() => openEditModal(area)}>Editar</button>
            <button onClick={() => handleDeleteArea(area.id)}>Eliminar</button>
            <button onClick={() => openCategoryModal(area)}>Agregar Categoría</button>

            <ul>
              {area.categorias.map((categoria, index) => (
                <li key={index}>
                  {categoria}
                  <button onClick={() => handleDeleteCategory(area.id, categoria)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal para agregar/editar área */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingArea ? "Editar Área" : "Agregar Nueva Área"}</h3>
            <input
              type="text"
              placeholder="Nombre del Área"
              value={newAreaName}
              maxLength={300}
              onChange={(e) => setNewAreaName(e.target.value)}
            />
            <button onClick={editingArea ? handleEditArea : handleAddArea}>
              {editingArea ? "Guardar Cambios" : "Agregar"}
            </button>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal para agregar categoría */}
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Agregar Categoría a {selectedArea?.nombre}</h3>
            <input
              type="text"
              placeholder="Nombre de la Categoría"
              value={newCategory}
              maxLength={300}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={handleAddCategory}>Agregar</button>
            <button onClick={() => setShowCategoryModal(false)}>Cerrar</button>
          </div>
       
         
        </div>
        
      )}
    <div className="action-buttons">
         <button className="register-button" onClick={handleRegistrar}>REGISTRAR</button>
        <button className="cancel-button" onClick={handleCancelar}>CANCELAR</button>
    </div>

    </div>
    
  );
};


export default Niveles;
