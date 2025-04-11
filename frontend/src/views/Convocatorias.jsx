
import React, { useState, useEffect } from 'react'

import "./styles/Disciplinas.css"
import { useNavigate } from 'react-router-dom';

const Convocatorias = () => {
    const navigate = useNavigate();


    // const convocatorias = [
    //     {
    //         idConvocatoria: 1,
    //         titulo: "Olimpiadas 1",
    //         fechaPublicacion: "21-02-2025",
    //         fechaInicioInsc: "25-02-2025",
    //         fechaFinInsc: "03-03-2025",
    //         portada: "https://img.freepik.com/vector-gratis/objetos-laboratorio-ciencias_23-2148488312.jpg",
    //         activo: true,
    //         fechaInicioOlimp: "08-03-2025",
    //         fechaFinOlimp: "15-03-2025",
    //         maximoPostPorArea: 30,
    //     },
    //     {
    //         idConvocatoria: 2,
    //         titulo: "Olimpiadas 2",
    //         fechaPublicacion: "27-02-2025",
    //         fechaInicioInsc: "03-03-2025",
    //         fechaFinInsc: "10-03-2025",
    //         portada: "https://static.vecteezy.com/system/resources/previews/013/086/795/non_2x/cartoon-maths-elements-background-education-logo-vector.jpg",
    //         activo: true,
    //         fechaInicioOlimp: "18-03-2025",
    //         fechaFinOlimp: "25-03-2025",
    //         maximoPostPorArea: 25,
    //     },
    //     {
    //         idConvocatoria: 3,
    //         titulo: "Olimpiadas 3",
    //         fechaPublicacion: "07-03-2025",
    //         fechaInicioInsc: "10-03-2025",
    //         fechaFinInsc: "15-03-2025",
    //         portada: "https://img.freepik.com/vector-gratis/cientifico_1308-6633.jpg",
    //         activo: true,
    //         fechaInicioOlimp: "20-03-2025",
    //         fechaFinOlimp: "27-03-2025",
    //         maximoPostPorArea: 28,
    //     },
    // ];
    const [convocatorias,setConvocatorias] =useState([]);

    useEffect(() => { //para hacer un get
            fetch("http://localhost:8000/api/convocatorias")
                .then(response => response.json())
                .then(data => setConvocatorias(data))
                .catch(error => console.error("Error al obtener convocatorias:", error));
        }, []);


    const handleInscripcion = (idConvocatoria) => {
        navigate(`/convocatoria/${idConvocatoria}/tipo-inscripcion`);  
    };

    return (
        <div className="Disciplina">

            <div className="grid-container">
                {convocatorias.map((convocatoria, index) => (
                    <div key={index} className="card">
                        <img src={convocatoria.portada} alt={"Titulo"} className="imagen" />
                        <h3>{convocatoria.idConvocatoria}</h3>
                        <button onClick={()=>handleInscripcion(convocatoria.idConvocatoria)}>Inscribirse</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Convocatorias;