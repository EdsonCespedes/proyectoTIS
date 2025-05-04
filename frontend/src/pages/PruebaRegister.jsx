import React, { useState } from 'react';
import axios from 'axios';

const PruebaRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        //
        lastName: '',
        //
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
                //
                lastName: '',
                //
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

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Registro de Tutor</h2>

            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <small style={{ color: 'red' }}>{errors.name[0]}</small>}
                </div>

                <div>
                    <label>Apellidos</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.name && <small style={{ color: 'red' }}>{errors.lastName[0]}</small>}
                </div>

                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <small style={{ color: 'red' }}>{errors.email[0]}</small>}
                </div>

                <div>
                    <label>Contraseña</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <small style={{ color: 'red' }}>{errors.password[0]}</small>}
                </div>

                <div>
                    <label>Confirmar Contraseña</label>
                    <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
                </div>

                <div>
                    <label>Teléfono</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                    {errors.telefono && <small style={{ color: 'red' }}>{errors.telefono[0]}</small>}
                </div>

                <div>
                    <label>Fecha de Nacimiento</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                    {errors.fechaNacimiento && <small style={{ color: 'red' }}>{errors.fechaNacimiento[0]}</small>}
                </div>

                <button type="submit" style={{ marginTop: '10px' }}>Registrarse</button>
            </form>
        </div>
    );
};

export default PruebaRegister;