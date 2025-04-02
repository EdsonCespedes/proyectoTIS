import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="/UmssLogo.png" alt="Umss Logo" />
                <div className="title-container">
                    <h1 className="title">Oh! SanSi</h1>
                    <p className="subtitle">Olimpiadas Científicas Oh SanSi</p>
                </div>
            </div>
            <div className="buttons">
                <Link to="/" className="boton-header">INICIO</Link>
                {/* <button className="boton-header">INICIO</button> */}
                <button className="boton-header">NOSOTROS</button>
                <button className="boton-header">EVENTOS</button>
                <Link to="/disciplinas" className="boton-header">DISCIPLINAS</Link>
                {/* <button className="boton-header">DISCIPLINAS</button> */}
                <Link to="/convocatorias" className="boton-header">INSCRIBIRSE</Link>
                {/* <button className="boton-header">INSCRIBIRSE</button> */}
                <button className="boton-header">INICIAR SESIÓN</button>
            </div>
        </div>
    );
}

export default Header;
