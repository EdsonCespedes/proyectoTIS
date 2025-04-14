import React, { useState } from 'react'
import DetalleInscripcion from '../components/DetalleInscripcion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Registro from '../components/Registro';

const InscripcionManual = () => {
    const { idConvocatoria } = useParams();
    const [registro, setRegistro] = useState(false);

    const navigate = useNavigate();

    //Logica backend va aqui plis
    const [estudiantes, setEstudiantes] = useState([]);

    const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const handleRegistrar = (nuevoEstudiante) => {
        // Transformar áreas al formato esperado
        const areasFormateadas = areasSeleccionadas.map((area) => ({
            idArea: area.id,
            tituloArea: area.nombre,
            descArea: area.descripcion || "", // si tenés esta info
            habilitada: area.habilitada ?? true, // por defecto true si no existe
            idConvocatoria: area.idConvocatoria || idConvocatoria, // si se tiene disponible
        }));

        // Transformar categorías si también necesitan adaptar formato
        const categoriasFormateadas = categoriasSeleccionadas.map((categoria, index) => ({
            idCategoria: categoria.id,
            nombreCategoria: categoria.nombre,
            descripcionCategoria: categoria.descripcion || "", // si se requiere
            idArea: areasFormateadas[index].idArea,
        }));

        // nuevoEstudiante.areas = areasSeleccionadas;
        // nuevoEstudiante.categorias = categoriasSeleccionadas;

        nuevoEstudiante.areas = areasFormateadas;
        nuevoEstudiante.categorias = categoriasFormateadas;
        setEstudiantes([...estudiantes, nuevoEstudiante]);

        setAreasSeleccionadas([]);
        setCategoriasSeleccionadas([]);
        setRegistro(false);  // Cambiar el estado de registro a false
    };

    const handleEditar = (index) => {

    }

    const handleEliminar = (index) => {
        const nuevoEstudiantes = [...estudiantes.slice(0, index), ...estudiantes.slice(index + 1)];
        setEstudiantes(nuevoEstudiantes);
    }

    const handleSubmit = async () => {
        if (!estudiantes || estudiantes.length === 0) {
            alert("No hay estudiantes para registrar.");
            return;
        }

        let hayErrores = false;

        for (let i = 0; i < estudiantes.length; i++) {
            const estudianteOriginal = estudiantes[i];

            const camposRequeridos = [
                "nombrePost", "apellidoPost", "carnet", "correoPost", "fechaNaciPost",
                "idCurso", "departamento", "provincia",
                "tutor.nombreTutor", "tutor.apellidoTutor", "tutor.telefonoTutor",
                "tutor.correoTutor", "tutor.fechaNaciTutor"
            ];

            const camposVacios = camposRequeridos.filter((campo) => {
                if (campo.includes(".")) {
                    const [parent, child] = campo.split(".");
                    return !estudianteOriginal[parent]?.[child];
                } else {
                    return !estudianteOriginal[campo];
                }
            });

            if (camposVacios.length > 0 || estudianteOriginal.areas.length === 0 || estudianteOriginal.categorias.length === 0) {
                console.warn(`Estudiante ${i + 1} tiene campos vacíos:`, camposVacios);
                hayErrores = true;
                continue;
            }

            // Excluir campos innecesarios
            const { departamentoColegio, provinciaColegio, ...estudiante } = estudianteOriginal;

            try {
                const response = await fetch('http://localhost:8000/api/registrar-postulante', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(estudiante)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error al registrar estudiante ${i + 1}:`, errorText);
                    hayErrores = true;
                } else {
                    console.log(`Estudiante ${i + 1} registrado con éxito.`);
                }

            } catch (error) {
                console.error(`Error de red al registrar estudiante ${i + 1}:`, error);
                hayErrores = true;
            }
        }

        if (hayErrores) {
            alert("Algunos estudiantes no se pudieron registrar. Revisa la consola para más detalles.");
        } else {
            alert("Todos los estudiantes fueron registrados correctamente.");
        }

        navigate("/convocatorias");
    };


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
                            // onClick={() => console.log("Estudiantes guardados:", estudiantes)} // TEMPORAL Solo para verificar
                            onClick={handleSubmit}
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
                        idConvocatoria={idConvocatoria}
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