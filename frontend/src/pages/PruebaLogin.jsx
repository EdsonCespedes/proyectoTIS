import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import "./styles/PruebaLogin.css";
import { useAuth } from '../context/AuthContext';

import SpinnerInsideButton from '../components/SpinnerInsideButton';

const apiUrl = import.meta.env.VITE_API_URL;

const PruebaLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`${apiUrl}/login`, formData);
            const { token, user } = response.data;

            login(user, token);
            setSuccessMessage('Inicio de sesión exitoso.');
            navigate("/");

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Error al iniciar sesión.');
            } else {
                setError('Error de conexión.');
            }
        } finally {
            setCargando(false)
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>INICIO DE SESIÓN</h2>

                {successMessage && <div className="success-message">{successMessage}</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className={cargando ? "divDeshabilitado" : ""}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Contraseña:</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="eye-icon-inside"
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn-iniciar">INICIAR  {cargando ? <span><SpinnerInsideButton/></span> : ""}</button>
                    </div>

                    <p>
                        <Link to="/recuperacionC" className="btn-contraseña">¿Olvidaste tu contraseña?</Link>
                    </p>
                    <p>
                        ¿No tienes una cuenta? <Link to="/registro-tutor" className="btn-registro">Regístrate aquí</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default PruebaLogin;

