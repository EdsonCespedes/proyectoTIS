import React, { useState, useEffect } from 'react';
import "./styles/Disciplinas.css";
import { useNavigate } from 'react-router-dom';

import FullScreenSpinner from '../components/FullScreenSpinner';

const apiUrl = import.meta.env.VITE_API_URL;

const Convocatorias = () => {
    const navigate = useNavigate();
    const [convocatorias, setConvocatorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch(`${apiUrl}/todasconvocatorias`)
            .then(response => response.json())
            .then(data => {
                const convocatoriasHabilitadas = data.filter(conv => 
                    (conv.habilitada === 1 || conv.habilitada === true) &&
                    (conv.eliminado === 0 || conv.eliminado === false)
                );
                setConvocatorias(convocatoriasHabilitadas);
                console.log("Convocatorias:", convocatoriasHabilitadas);
            })
            .catch(error => console.error("Error al obtener convocatorias:", error))
            .finally(() => setCargando(false));
    }, []);

    const handleVerMas = (idConvocatoria) => {
        navigate(`/detalle-estructura/${idConvocatoria}`);
    };

    return (
        <div className="Disciplina">
            {cargando ? (
                <FullScreenSpinner />
            ) : (
                <div className="grid-container">
                    {convocatorias.map((convocatoria, index) => (
                        <div key={index} className="card">
                            <img src={convocatoria.portada} alt={convocatoria.titulo} className="imagen" />
                            <h3>{convocatoria.tituloConvocatoria}</h3>
                            <button onClick={() => handleVerMas(convocatoria.idConvocatoria)}>Ver más</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Convocatorias;
