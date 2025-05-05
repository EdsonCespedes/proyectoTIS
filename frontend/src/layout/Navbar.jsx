import React, { useState } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleRedirect = (section) => {
    alert(`Redirigiendo a ${section}`);
  };

  const handleLabelClick = (label) => {
    alert(`Funcionalidad de ${label}`);
  };

  return (
    <div className="dashboard-adm">
      {sidebarOpen && (
        <aside className="sidebar-adm">
          <h2 className="title-adm">Admin Dashboard</h2>
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

      <main className="main-adm">
        <header className="header-adm">
          <span className="menu-icon-adm" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</span>
          <span className="header-title-adm">Administrador</span>
          <div className="header-right-adm">
            <div className="labels-adm">
              <span className="label-adm" onClick={() => handleLabelClick('Label 1')}>Label 1</span>
              <span className="label-adm" onClick={() => handleLabelClick('Label 2')}>Label 2</span>
            </div>
            <span className="user-icon-adm">👤</span>
          </div>
        </header>
        <div className="content-adm">
          {/* Aquí iría el contenido principal */}
        </div>
      </main>
    </div>
  );
};

export default Navbar;
