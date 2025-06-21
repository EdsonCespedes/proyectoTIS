import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionarRol = () => {
    const [roles, setRoles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedRoles = localStorage.getItem('roles');
        if (storedRoles && storedRoles.length > 0) {
            setRoles(JSON.parse(storedRoles));
        } else {
            alert('No tienes roles asignados. Espera a que el ADMINISTRADOR te asigne uno.');
            navigate('/login');
        }
    }, []);

    const handleSeleccionar = () => {
        if (selectedIndex === null) {
            alert('Debes seleccionar un rol antes de continuar.');
            return;
        }

        const rolSeleccionado = roles[selectedIndex];
        console.log('🎯 Rol seleccionado:', rolSeleccionado);

        const user = JSON.parse(localStorage.getItem('user'));

        const userActualizado = {
            ...user,
            rol: rolSeleccionado.role,
            permissions: rolSeleccionado.permissions,
        };

        localStorage.setItem('user', JSON.stringify(userActualizado));

        navigate('/');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Selecciona un Rol para esta sesión</h2>

            {roles.map((rol, index) => (
                <div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    style={{
                        border: selectedIndex === index ? '2px solid #3498db' : '1px solid #ccc',
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: selectedIndex === index ? '#ecf6fc' : '#fff',
                    }}
                >
                    <h3>{rol.role}</h3>
                    <p><strong>Convocatoria:</strong> {rol.convocatoria_name}</p>
                    <p><strong>Permisos:</strong> {rol.permissions.join(', ') || 'Ninguno'}</p>
                </div>
            ))}

            <button onClick={handleSeleccionar} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                Continuar
            </button>
        </div>
    );
};

export default SeleccionarRol;
