import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './styles/PruebaRegister.css';

const apiUrl = import.meta.env.VITE_API_URL;

const PruebaRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: '',
        telefono: '',
        fechaNacimiento: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors };

        if (name === "name" || name === "lastName") {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
                newErrors[name] = [`El ${name === "name" ? "nombre" : "apellido"} solo debe contener letras.`];
            } else {
                const words = value.trim().split(/\s+/);
                if (words.length > 2) {
                    newErrors[name] = [`El ${name === "name" ? "nombre" : "apellido"} solo puede tener dos palabras.`];
                    return;
                } else if (words.some(w => w.length > 15)) {
                    newErrors[name] = [`Cada palabra del ${name === "name" ? "nombre" : "apellido"} debe tener máximo 15 letras.`];
                    return;
                } else {
                    delete newErrors[name];
                }
            }
            if (value.length > 21) return;
        }

        if (name === "telefono") {
            if (!/^\d*$/.test(value)) {
                newErrors.telefono = ['Solo se permiten números.'];
            } else if (value.length > 8) {
                newErrors.telefono = ['Máximo 8 dígitos.'];
            } else {
                delete newErrors.telefono;
            }
        }

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                newErrors.email = ['Correo electrónico inválido.'];
            } else {
                delete newErrors.email;
            }
        }

        if (name === "password") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(value)) {
                newErrors.password = ['La contraseña debe tener mínimo 8 caracteres, incluyendo mayúscula, minúscula y número.'];
            } else {
                delete newErrors.password;
            }
        }

        if (name === "password_confirmation") {
            if (value !== formData.password) {
                newErrors.password_confirmation = ['Las contraseñas no coinciden.'];
            } else {
                delete newErrors.password_confirmation;
            }
        }

        setErrors(newErrors);

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        const newErrors = {};

        const validarNombreApellido = (campo, valor) => {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                return `El ${campo} solo debe contener letras.`;
            }
            const palabras = valor.trim().split(/\s+/);
            if (palabras.length > 2) {
                return `El ${campo} solo debe tener máximo dos palabras.`;
            }
            if (palabras.some(p => p.length > 8)) {
                //return `Cada palabra del ${campo} debe tener máximo 8 letras.`;
            }
        };

        const nombreError = validarNombreApellido('nombre', formData.name);
        if (nombreError) newErrors.name = [nombreError];

        const apellidoError = validarNombreApellido('apellido', formData.lastName);
        if (apellidoError) newErrors.lastName = [apellidoError];

        if (!/^\d{8}$/.test(formData.telefono)) {
            newErrors.telefono = ['El teléfono debe contener exactamente 8 dígitos numéricos.'];
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            //newErrors.email = ['Correo electrónico inválido.'];
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = ['La contraseña debe tener mínimo 8 caracteres, incluyendo mayúscula, minúscula y número.'];
        }

        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = ['Las contraseñas no coinciden.'];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/register`, formData);
            setSuccessMessage('Registro exitoso. Ahora puede iniciar sesión.');

            setFormData({
                name: '',
                lastName: '',
                email: '',
                password: '',
                password_confirmation: '',
                telefono: '',
                fechaNacimiento: ''
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error desconocido', error);
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            lastName: '',
            email: '',
            password: '',
            password_confirmation: '',
            telefono: '',
            fechaNacimiento: ''
        });
        setErrors({});
        navigate('/');
    };

    return (
        <div className="register-page">
            <div className="register-box">

                <div className="titulo-box">
                    <h2>REGISTRO</h2>
                </div>

                {successMessage && <div className="success-message">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <small className="error">{errors.name[0]}</small>}

                    <label htmlFor="lastName">Apellido *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <small className="error">{errors.lastName[0]}</small>}

                    <label htmlFor="email">Correo electrónico *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <small className="error">{errors.email[0]}</small>}

                    <label htmlFor="password">Contraseña *</label>
                    <div className="password-wrapper">
                        <input
                            type={mostrarContraseña ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="eye-icon-inside"
                            onClick={() => setMostrarContraseña(!mostrarContraseña)}
                            title={mostrarContraseña ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {mostrarContraseña ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <small className="error">{errors.password[0]}</small>}

                    <label htmlFor="password_confirmation">Confirmar contraseña *</label>
                    <div className="password-wrapper">
                        <input
                            type={mostrarConfirmarContraseña ? 'text' : 'password'}
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                        />
                        <span
                            className="eye-icon-inside"
                            onClick={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}
                            title={mostrarConfirmarContraseña ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {mostrarConfirmarContraseña ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password_confirmation && <small className="error">{errors.password_confirmation[0]}</small>}

                    <label htmlFor="telefono">Teléfono *</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                    {errors.telefono && <small className="error">{errors.telefono[0]}</small>}

                    <div className="form-group">
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento *</label>
                        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                        {errors.fechaNacimiento && <small className="error">{errors.fechaNacimiento[0]}</small>}
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn-registrarse">REGISTRARSE</button>
                        <button type="button" className="btn-cancelar-register" onClick={handleCancel}>CANCELAR</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PruebaRegister;
