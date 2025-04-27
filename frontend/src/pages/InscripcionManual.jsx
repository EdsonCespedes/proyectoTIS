import React, { useState } from 'react'
import DetalleInscripcion from '../components/DetalleInscripcion';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Registro from '../components/Registro';

const InscripcionManual = () => {
    const { idConvocatoria } = useParams();
    const [registro, setRegistro] = useState(false);

    const [indexEdit, setIndexEdit] = useState(-1);
    const [estudianteEdit, setEstudianteEdit] = useState({});

    const navigate = useNavigate();

    const location = useLocation();
    const [estudiantes, setEstudiantes] = useState(location.state?.estudiantes||[]);

    const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const handleRegistrar = (nuevoEstudiante) => {
        const areasFormateadas = areasSeleccionadas.map((area) => ({
            idArea: area.id,
            tituloArea: area.nombre,
            descArea: area.descripcion || "",
            habilitada: area.habilitada ?? true, // por defecto true si no existe
            idConvocatoria: area.idConvocatoria || idConvocatoria, // si se tiene disponible
        }));

        // const categoriasFormateadas = categoriasSeleccionadas.map((categoria, index) => ({
        //     idCategoria: categoria.id,
        //     nombreCategoria: categoria.nombre,
        //     descripcionCategoria: categoria.descripcion || "", // si se requiere
        //     idArea: areasFormateadas[index].idArea,
        //     monto: categoria.monto || 50,
        // }));

        // Ahora, para cada categoría, asignamos correctamente el idArea
        const categoriasFormateadas = categoriasSeleccionadas.map((categoria) => {
            // Buscar el área que contiene esta categoría por el idCategoria
            let idAreaEncontrado = null;

            // Recorremos las áreas seleccionadas
            areasSeleccionadas.forEach((area) => {
                // Verificar si esta categoría pertenece a este área comparando el idCategoria
                const categoriaEncontrada = area.categorias.find(
                    (cat) => cat.id === categoria.id
                );
                if (categoriaEncontrada) {
                    idAreaEncontrado = area.id; // Asignar el idArea de la categoría
                }
            });

            // Si encontramos el área correspondiente, formateamos la categoría
            return {
                idCategoria: categoria.id,
                nombreCategoria: categoria.nombre,
                descripcionCategoria: categoria.descripcion || "", // si se requiere
                idArea: idAreaEncontrado, // Asignar el idArea encontrado
                monto: categoria.monto || 50,
            };
        });

        nuevoEstudiante.areas = areasFormateadas;
        nuevoEstudiante.categorias = categoriasFormateadas;
        setEstudiantes([...estudiantes, nuevoEstudiante]);

        setAreasSeleccionadas([]);
        setCategoriasSeleccionadas([]);
        setRegistro(false);  // Cambiar el estado de registro a false
    };

    const handleActualizar = (nuevoEstudiante, estudiante) => {
        const areasFormateadas = areasSeleccionadas.map((area) => ({
            idArea: area.id,
            tituloArea: area.nombre,
            descArea: area.descripcion || "",
            habilitada: area.habilitada ?? true, // por defecto true si no existe
            idConvocatoria: area.idConvocatoria || idConvocatoria, // si se tiene disponible
        }));

        // const categoriasFormateadas = categoriasSeleccionadas.map((categoria, index) => ({
        //     idCategoria: categoria.id,
        //     nombreCategoria: categoria.nombre,
        //     descripcionCategoria: categoria.descripcion || "", // si se requiere
        //     idArea: areasFormateadas[index].idArea,
        // }));

        // Ahora, para cada categoría, asignamos correctamente el idArea
        const categoriasFormateadas = categoriasSeleccionadas.map((categoria) => {
            // Buscar el área que contiene esta categoría por el idCategoria
            let idAreaEncontrado = null;

            // Recorremos las áreas seleccionadas
            areasSeleccionadas.forEach((area) => {
                // Verificar si esta categoría pertenece a este área comparando el idCategoria
                const categoriaEncontrada = area.categorias.find(
                    (cat) => cat.id === categoria.id
                );
                if (categoriaEncontrada) {
                    idAreaEncontrado = area.id; // Asignar el idArea de la categoría
                }
            });

            // Si encontramos el área correspondiente, formateamos la categoría
            return {
                idCategoria: categoria.id,
                nombreCategoria: categoria.nombre,
                descripcionCategoria: categoria.descripcion || "", // si se requiere
                idArea: idAreaEncontrado, // Asignar el idArea encontrado
                monto: categoria.monto || 50,
            };
        });

        nuevoEstudiante.areas = areasFormateadas;
        nuevoEstudiante.categorias = categoriasFormateadas;

        const estudiantesActualizados = [...estudiantes];
        if (indexEdit !== -1) {
            estudiantesActualizados[indexEdit] = nuevoEstudiante;
            setEstudiantes(estudiantesActualizados);
        }


        setAreasSeleccionadas([]);
        setCategoriasSeleccionadas([]);
        setIndexEdit(-1);
        setEstudianteEdit({});
        setRegistro(false);  // Cambiar el estado de registro a false
    }

    const handleEliminar = (index) => {
        const nuevoEstudiantes = [...estudiantes.slice(0, index), ...estudiantes.slice(index + 1)];
        setEstudiantes(nuevoEstudiantes);
    }

    const handleSiguiente = () => {
        navigate(`/convocatoria/${idConvocatoria}/ordenPago`, {
            state: { 
                estudiantes, 
                from: "Manual",
            },
        });
    }


    return (
        <div>
            {registro === false && (
                <div>
                    <DetalleInscripcion
                        estudiantes={estudiantes}
                        onEliminar={handleEliminar}
                        setRegistro={setRegistro}
                        setEstudianteEdit={setEstudianteEdit}
                        setAreasSeleccionadas={setAreasSeleccionadas}
                        setCategoriasSeleccionadas={setCategoriasSeleccionadas}
                        setIndexEdit={setIndexEdit}
                    />
                    <div className="control">
                        <button className="boton-style btn-aceptacion" type="button" onClick={() => setRegistro(true)}>
                            Añadir nuevo
                        </button>
                        <button
                            className="boton-style btn-aceptacion"
                            // onClick={handleSubmit}
                            onClick={handleSiguiente}
                        >
                            {/* Guardar */}
                            Siguiente
                        </button>
                        <Link to="/convocatorias" className="boton-style btn-rechazo">Cancelar</Link>
                    </div>
                </div>
            )}
            {registro === true && (
                <div>
                    <Registro
                        idConvocatoria={idConvocatoria}
                        estudiantes={estudiantes}
                        setEstudiantes={setEstudiantes}
                        areasSeleccionadas={areasSeleccionadas}
                        categoriasSeleccionadas={categoriasSeleccionadas}
                        setAreasSeleccionadas={setAreasSeleccionadas}
                        setCategoriasSeleccionadas={setCategoriasSeleccionadas}
                        handleRegistrar={handleRegistrar}
                        handleActualizar={handleActualizar}
                        setRegistro={setRegistro}
                        estudiante={estudianteEdit}
                    />
                </div>
            )}
        </div>
    )
}

export default InscripcionManual;