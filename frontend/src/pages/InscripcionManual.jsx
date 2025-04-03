import React, { useState } from 'react';
import DetalleInscripcion from '../components/DetalleInscripcion';
import { Link } from 'react-router-dom';
import Registro from '../components/Registro';
import EditarEstudiante from '../components/EditarEstudiante';

const InscripcionManual = () => {
    const [registro, setRegistro] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudianteEditar, setEstudianteEditar] = useState(null);
    const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const handleRegistrar = (nuevoEstudiante) => {
        nuevoEstudiante.areas = areasSeleccionadas;
        nuevoEstudiante.categorias = categoriasSeleccionadas;
        setEstudiantes([...estudiantes, nuevoEstudiante]);

        setAreasSeleccionadas([]);
        setCategoriasSeleccionadas([]);
        setRegistro(false);
    };

    const handleEliminar = (index) => {
        const nuevoEstudiantes = [...estudiantes.slice(0, index), ...estudiantes.slice(index + 1)];
        setEstudiantes(nuevoEstudiantes);
    };

    const handleEditar = (estudiante) => {
        setEstudianteEditar(estudiante);
        setRegistro("editar");  // Cambiar el estado a "editar" para mostrar el formulario de edición
    };
    const handleGuardarEstudiante = (estudianteActualizado) => {
        setEstudiantes((prevEstudiantes) =>
            prevEstudiantes.map((est) =>
                est.carnet === estudianteActualizado.carnet ? estudianteActualizado : est
            )
        );
        // Esto asegura que después de guardar, se salga del modo de edición.
        setEstudianteEditar(null); 
        // Redirige al usuario a la vista principal o la página deseada
        history.push("/convocatoria/${idConvocatoria}/detalle-inscripcion"); // O la ruta que corresponda
    };

    return (
        <div>
            {registro === false && (
                <div>
                    <DetalleInscripcion estudiantes={estudiantes} onEliminar={handleEliminar} onEditar={handleEditar} />
                     <div className="control">
                        <button className="boton btn-red" type="button" onClick={() => setRegistro(true)}>
                            AÑADIR NUEVO
                        </button>
                        <button 
                            className="boton btn-blue" 
                            onClick={() => console.log("Estudiantes guardados:", estudiantes)} // TEMPORAL: Solo para verificar
                        >
                        GUARDAR
                        </button>
                             <Link to="/convocatorias" className="boton btn-red">CANCELAR</Link>
                     </div>
                </div>
            )}

            {registro === true && (
                <Registro
                    estudiantes={estudiantes}
                    setEstudiantes={setEstudiantes}
                    areasSeleccionadas={areasSeleccionadas}
                    categoriasSeleccionadas={categoriasSeleccionadas}
                    setAreasSeleccionadas={setAreasSeleccionadas}
                    setCategoriasSeleccionadas={setCategoriasSeleccionadas}
                    handleRegistrar={handleRegistrar}
                />
            )}

            {registro === "editar" && estudianteEditar && (
                <EditarEstudiante 
                estudiante={estudianteEditar}
            onGuardar={handleGuardarEstudiante}
            setEstudiantes={setEstudiantes}
            areasSeleccionadas={areasSeleccionadas}
            categoriasSeleccionadas={categoriasSeleccionadas}
            setAreasSeleccionadas={setAreasSeleccionadas}
            setCategoriasSeleccionadas={setCategoriasSeleccionadas} />
            )}
        </div>
    );
};

export default InscripcionManual;
