import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
      <div className={`menu ${menuOpen ? 'show' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>🏠 Home</Link></li>
          <li><Link to="/addRoles" onClick={closeMenu}>👤 Crear Rol</Link></li>
          <li><Link to="/addUser" onClick={closeMenu}>📄 Registrar Usuario</Link></li>
          <li><Link to="/asignarRoles" onClick={closeMenu}>👤 Asignar Roles</Link></li>
          <li><Link to="/tablaRoles" onClick={closeMenu}>✉️ Gestionar Roles</Link></li>
          <li><Link to="/tablaUsuarios" onClick={closeMenu}>✉️ Lista de Usuarios</Link></li>
          <li><Link to="/listaRoles" onClick={closeMenu}>✉️ Lista de Roles</Link></li>
          <li><Link to="/crear-convocatoria" onClick={closeMenu}>📄 Gestion de Convocatoria</Link></li>
          <li><Link to="/colegios" onClick={closeMenu}>📄 Gestion de colegios</Link></li>
          <li><Link to="/reportes" onClick={closeMenu}>📊 Reportes</Link></li>
        </ul>
      </div>

      {/* Botón para abrir o cerrar el menú */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? '☰' : '☰'}
      </button>
    </div>
  );
};

export default Navbar;



