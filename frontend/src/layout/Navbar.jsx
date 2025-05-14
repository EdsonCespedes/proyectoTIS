import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import './Navbar.css'; // Importamos los estilos CSS

const Navbar = () => {
  // Estado para manejar la visibilidad del menú desplegable
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
      {/* Menú */}
      <div className={`menu ${menuOpen ? 'show' : ''}`}>
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/addRoles">👤 Crear Rol</Link></li>
          <li><Link to="/addUser">📄 Registrar Usuario</Link></li>
          <li><Link to="/asignarRoles">👤 Asignar Roles</Link></li>
          <li><Link to="/tablaRoles">✉️ Gestionar Roles</Link></li>
          <li><Link to="/tablaUsuarios">✉️ Lista de Usuarios</Link></li>
          <li><Link to="/listaRoles">✉️ Lista de Roles</Link></li>
          <li><Link to="/crear-convocatoria">📄 Gestion de Convocatoria</Link></li>
          <li><Link to="/colegios">📄 Gestion de colegios</Link></li>
          <li><Link to="/reportes">📊 Reportes</Link></li>
        </ul>
      </div>

      {/* Botón para abrir o cerrar el menú */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? '☰' : '☰'} {/* El icono ☰ para abrir y ❌ para cerrar */}
      </button>
    </div>
  );
};

export default Navbar;



