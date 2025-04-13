import React, { useState } from 'react'
import DetalleInscripcion from '../components/DetalleInscripcion';
import { Link } from 'react-router-dom';
import Registro from '../components/Registro';

const InscripcionManual = () => {
    const [registro, setRegistro] = useState(false);

    //Logica backend va aqui plis
    const [estudiantes, setEstudiantes] = useState([]);

    const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const handleRegistrar = (nuevoEstudiante) => {
        nuevoEstudiante.areas = areasSeleccionadas;
        nuevoEstudiante.categorias = categoriasSeleccionadas;
        setEstudiantes([...estudiantes, nuevoEstudiante]);

        setAreasSeleccionadas([]);
        setCategoriasSeleccionadas([]);
        setRegistro(false);  // Cambiar el estado de registro a false
    }; 
    
    const handleEliminar = (index) => {
        const nuevoEstudiantes = [...estudiantes.slice(0, index), ...estudiantes.slice(index + 1)];
        setEstudiantes(nuevoEstudiantes);
    }

    return (
        <div>
            {registro === false && (
                <div>
                    <DetalleInscripcion estudiantes={estudiantes} onEliminar={handleEliminar} onEditar={handleEditar} />
                     <div className="control">
                        <button className="boton-style btn-aceptacion" type="button" onClick={() => setRegistro(true)}>
                            Añadir nuevo
                        </button>
                        <button 
                            className="boton-style btn-aceptacion" 
                            onClick={() => console.log("Estudiantes guardados:", estudiantes)} // TEMPORAL Solo para verificar
                        >
                        Guardar
                        </button>
                             <Link to="/convocatorias" className="boton-style btn-rechazo">Cancelar</Link>
                     </div>
                </div>
            )}
            {registro === true && (
                <div>
                    Vista Registro
                    <Registro
                        estudiantes={estudiantes}
                        setEstudiantes={setEstudiantes}
                        areasSeleccionadas={areasSeleccionadas}
                        categoriasSeleccionadas={categoriasSeleccionadas}
                        setAreasSeleccionadas={setAreasSeleccionadas}
                        setCategoriasSeleccionadas={setCategoriasSeleccionadas}
                        // setRegistro={setRegistro}
                        handleRegistrar={handleRegistrar}
                    />
                </div>
            )}
        </div>
    )
}

export default InscripcionManual;