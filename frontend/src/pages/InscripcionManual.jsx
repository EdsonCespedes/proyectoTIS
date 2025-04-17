import React, { useState } from 'react';
import DetalleInscripcion from '../components/DetalleInscripcion';
import { Link, useNavigate } from 'react-router-dom';
import Registro from '../components/Registro';
import EditarEstudiante from '../components/EditarEstudiante';


const InscripcionManual = () => {
    const [registro, setRegistro] = useState(false);
    const [estudiantes, setEstudiantes] = useState([{
    
    nombre: "Katerin",
    apellidos: "Marza Caro",
    carnet: "12345678",
    correo: "katerin@gmail.com",
    fechaNacimiento: "2003-05-21",
    colegio: "Colegio A",
    curso: "Curso 1",
    departamento: "La Paz",
    provincia: "Abel Iturralde",
    departamentoNacimiento: "Cochabamba",
    provinciaNacimiento: "Cercado",
    areas: [
      { idArea: 1, tituloArea: "Matemáticas" },
    ],
    categorias: [
      { idCategoria: 1, nombreCategoria: "Álgebra", idArea: 1 }
    ]

    }]);

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
        console.log("Invocando handleEditar con estudiante:", estudiante);
        setEstudianteEditar({estudiante, index});
        setAreasSeleccionadas(estudiante.areas || []);
        setCategoriasSeleccionadas(estudiante.categorias || []);
        setRegistro("editar");  // Cambiar el estado a "editar" 
        
    };
    const handleGuardarEstudiante = (estudianteActualizado) => {
        console.log("handleGuardarEstudiante invocada"); 
        console.log("Estudiante actualizado1111:", estudianteActualizado);
        
       
        setEstudiantes((prevEstudiantes) => {
            // Actualiza el estudiante que coincide con el carnet
            const estudiantesActualizados = prevEstudiantes.map((est) =>
                est.carnet === estudianteActualizado.carnet ? estudianteActualizado : est
            );
            
            console.log("Estudiantes actualizados222:", estudiantesActualizados); 
            return estudiantesActualizados; 
        });
   
        setEstudianteEditar(null);
        setRegistro(false); 

    };
    


    return (
        <div>
        {console.log("Renderizando tabla con estudiantes:", estudiantes)}
            {registro === false && (
                <div>
                    <DetalleInscripcion estudiantes={estudiantes} onEliminar={handleEliminar} onEditar={handleEditar} />
                     <div className="control">
                        <button className="boton-style btn-aceptacion" type="button" onClick={() => setRegistro(true)}>
                            Añadir nuevo
                        </button>
                        <button 
                            className="boton-style btn-aceptacion" 
                            onClick={() => {
                                console.log("Estudiantes guardados:", estudiantes);
                                navigate("/ordenPago"); // 👈 Paso 3
                            }}
                        >
                            Orden Pago
                        </button>
                             <Link to="/convocatorias" className="boton-style btn-rechazo">Cancelar</Link>
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
                    setRegistro={setRegistro}
                />
            )}
            {console.log("Estado de registro:", registro)}
            {registro === "editar" && estudianteEditar && (
                <EditarEstudiante 
                estudiante={estudianteEditar}
                onGuardar={handleGuardarEstudiante}
                onEditar={handleEditar}
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