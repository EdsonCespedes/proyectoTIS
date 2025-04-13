import React, { useState } from "react";
import "./styles/Area.css";

const Area = () => {
  const [areas, setAreas] = useState(["Matemáticas", "Física", "Química", "Biología", "Informática", "Robótica"]);
  const [selectedArea, setSelectedArea] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [areaCategories, setAreaCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [editedCardNames, setEditedCardNames] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [activeCards, setActiveCards] = useState([]);

  const categoryOptions = [
    "1ro Primaria", "1ro Secundaria", "2do Primaria", "2do Secundaria",
    "3ro Primaria",  "3ero Secundaria", "4to Primaria","4to Secundaria", 
    "5to Primaria", "5to Secundaria","6to Primaria",  "6to Secundaria"
    
  ];

  const handleAddArea = () => {
    if (newArea && !areas.includes(newArea)) {
      setAreas([...areas, newArea]);
      setNewArea("");
      setShowModal(false);
    }
  };

  const handleSelectArea = (area) => {
    setSelectedArea("");
    if (area && !activeCards.includes(area)) {
      setActiveCards([...activeCards, area]);
    }
  };

  const handleDeleteCard = (area) => {
    setActiveCards(activeCards.filter(a => a !== area));
  };

  const handleEditCard = (area) => {
    setSelectedArea(area);
    setEditInput(editedCardNames[area] || area);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setEditedCardNames({
      ...editedCardNames,
      [selectedArea]: editInput,
    });
    setIsEditing(false);
    setSelectedArea("");
  };

  const handleSaveCategories = () => {
    setAreaCategories({
      ...areaCategories,
      [selectedArea]: selectedCategories,
    });
    setShowCategoryModal(false);
    setSelectedArea("");
  };

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const openCategoryModal = (area) => {
    const current = areaCategories[area] || [];
    setSelectedArea(area);
    setSelectedCategories(current); // mantener selección anterior
    setShowCategoryModal(true);
  };

  return (
    <div className="container-Area">
      <h2 className="title-Area">Área de competencia</h2>

      <div className="select-group">
        <label>Selecciona un área:</label>
        <select onChange={(e) => handleSelectArea(e.target.value)} value={selectedArea}>
          <option value="">-- Selecciona --</option>
          {areas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <button className="add-button" onClick={() => setShowModal(true)}>Agregar Área</button>

      <div className="card-grid">
        {activeCards.map((area) => (
          <div className="area-card" key={area}>
            {isEditing && selectedArea === area ? (
              <div>
                <input 
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Guardar</button>
              </div>
            ) : (
              <>
                <h3>{editedCardNames[area] || area}</h3>
                <div className="button-group">
                  <button className="edit-button" onClick={() => handleEditCard(area)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteCard(area)}>Eliminar</button>
                  <button className="category-button" onClick={() => openCategoryModal(area)}>Agregar Categoría</button>
                </div>
              </>
            )}

            {areaCategories[area]?.length > 0 && (
              <div className="category-list">
                <h4>Categorías:</h4>
                <ul>
                  {areaCategories[area].map((cat) => (
                    <li key={cat}>{cat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>✖</button>
            <h3>Agregar Nueva Área</h3>
            <input 
              type="text" 
              placeholder="Nombre del Área" 
              value={newArea} 
              onChange={(e) => setNewArea(e.target.value)} 
            />
            <button className="save-button" onClick={handleAddArea}>Guardar</button>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowCategoryModal(false)}>✖</button>
            <h3>Selecciona Categorías</h3>
            <div className="checkbox-grid">
              {categoryOptions.map((category) => (
                <label key={category} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
            <button className="save-button" onClick={handleSaveCategories}>Guardar Categorías</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Area;

