import React, { useState } from 'react';
import axios from 'axios';

const PruebaLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/api/login', formData);

            const { token, user } = response.data;

            // guarda el token en el localstorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setSuccessMessage('Inicio de sesión exitoso.');
            console.log('Usuario logueado:', user);


        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Error al iniciar sesión.');
            } else {
                setError('Error de conexión.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Login de Tutor</h2>

            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" style={{ marginTop: '10px' }}>Iniciar sesión</button>
            </form>
        </div>
    );
};

export default PruebaLogin;