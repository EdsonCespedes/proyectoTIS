import React, { useEffect, useState } from "react";
import "./styles/ayc.css";
import { useLocation, useNavigate } from "react-router-dom";


export default function Categorias() {
  const location = useLocation();
  const navigate = useNavigate();
  const { areaId, areaName } = location.state || {};
  const [formCategory, setFormCategory] = useState({ name: "", options: [] });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/vercursos");
        const data = await res.json();
        setCategoryOptions(data.map(c => c.Curso));
      } catch (err) {
        console.error("Error cargando cursos:", err);
      }
    };
    fetchCursos();
  }, []);

  const handleCheckboxChange = (option) => {
    const updated = selectedCategories.includes(option)
      ? selectedCategories.filter(o => o !== option)
      : [...selectedCategories, option];
    setSelectedCategories(updated);
    setNewDescription(updated.join(", "));
  };

  const handleSaveCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: formCategory.name,
      options: selectedCategories,
    };
    // Navegar de vuelta a Areas, enviando la nueva categoría y el areaId
    navigate("/", {
      state: {
        updatedCategory: newCategory,
        areaId,
      }
    });
  };

  return (
    <div className="container-Area">
      <h2>Agregar Categoría a: {areaName || "Área seleccionada"}</h2>
      <input
        type="text"
        placeholder="Nombre categoría"
        value={formCategory.name}
        onChange={(e) => setFormCategory({ ...formCategory, name: e.target.value })}
      />
      <div className="checkbox-grid">
        {categoryOptions.map((option) => (
          <label key={option} className="checkbox-item">
            <input
              type="checkbox"
              checked={selectedCategories.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleSaveCategory}>Guardar Categoría</button>
    </div>
  );
}
