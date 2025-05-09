import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa el hook para redirección
import './styles/PruebaRegister.css'; // Asegúrate de tener este archivo de estilos

const PruebaRegister = () => {
    const navigate = useNavigate(); // Inicializa el hook de navegación

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
            setSuccessMessage('Registro exitoso. Ahora puede iniciar sesión.');
            console.log('Usuario registrado:', response.data.user);

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
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2>REGISTRO</h2>
                {successMessage && <div className="success-message">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre :</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <small className="error">{errors.name[0]}</small>}
                    </div>

                    <div>
                        <label>Apellido :</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        {errors.lastName && <small className="error">{errors.lastName[0]}</small>}
                    </div>

                    <div>
                        <label>Email :</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <small className="error">{errors.email[0]}</small>}
                    </div>

                    <div>
                        <label>Password :</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <small className="error">{errors.password[0]}</small>}
                    </div>

                    <div>
                        <label>Confirma password :</label>
                        <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Teléfono :</label>
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                        {errors.telefono && <small className="error">{errors.telefono[0]}</small>}
                    </div>

                    <div>
                        <label>Fecha de Nacimiento :</label>
                        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                        {errors.fechaNacimiento && <small className="error">{errors.fechaNacimiento[0]}</small>}
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn-registrarse">REGISTRATE</button>
                        <button type="button" className="btn-cancelar" onClick={handleCancel}>CANCELAR</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PruebaRegister;

