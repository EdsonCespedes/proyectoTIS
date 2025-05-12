import React, { useState } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleRedirect = (section) => {
    alert(`Redirigiendo a ${section}`);
  };

  return (
    <div className="dashboard-adm">
      {sidebarOpen && (
        <aside className="sidebar-adm">
          <ul className="menu-adm">
            <li onClick={() => handleRedirect('Home')}><i className="icon">🏠</i> Home</li>
            <li onClick={() => handleRedirect('Settings')}><i className="icon">👤</i> Crear Rol</li>
            <li onClick={() => handleRedirect('Reports')}><i className="icon">📄</i> Registrar usuario</li>
            <li onClick={() => handleRedirect('Reports')}><i className="icon">👤</i> Asignar Roles</li>
            <li onClick={() => handleRedirect('Inbox')}><i className="icon">✉️</i> Gestionar Roles</li>
            <li onClick={() => handleRedirect('Settings')}><i className="icon">📄</i> Crear convocatoria</li>
            <li onClick={() => handleRedirect('Reports')}><i className="icon">📊</i> Reportes</li>
          </ul>
        </aside>
      )}
        <header className="header-adm">
          <span className="menu-icon-adm" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</span>
          <h2 className="title-adm">Administrador</h2>
        </header>
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      </div>
    </div>
  );
};

export default Navbar;
