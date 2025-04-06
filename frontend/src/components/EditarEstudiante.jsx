import React, { useState, useEffect } from "react";
import "./styles/Registro.css";
import { useLocation, useNavigate } from "react-router-dom";
import AreaCompetencia from "./AreaCompetencia";
import EditarDesdeRuta from "../components/EditarDesdeRuta"; 

// Expresiones regulares para las validaciones
const nombreApellidoRegex =  /^[A-Za-z\s]+$/; // Solo letras y espacios
const carnetRegex = /^[0-9]+$/; // Solo números

const departamentos = {
    "La Paz": ["Abel Iturralde", "Aroma", "Bautista Saavedra", "Camacho", "Caranavi"],
    "Cochabamba": ["Arani", "Arque", "Ayopaya", "Bolívar", "Capinota"],
    "Santa Cruz": ["Andres Ibañez", "Ángel Sandoval", "Chiquitos", "Cordillera"],
    "Chuquisaca": ["Belisario Boeto", "Hernando Siles", "Jaime Zudañez"],
    "Oruro": ["Abaroa", "Carangas", "Cercado", "Eduardo Avaroa"],
    "Potosi": ["Alonso de Ibáñez", "Antonio Quijarro", "Bernardino Bilbao"],
    "Tarija": ["Aniceto Arce", "Burnet O'Connor", "Cercado"],
    "Beni": ["Cercado", "Itenéz", "José Ballivián"],
    "Pando": ["Abuná", "Federico Román", "Madre de Dios"],
};

// Mapeo de provincias a colegios
const colegiosPorProvincia = {
    "Abel Iturralde": ["Colegio A", "Colegio B"],
    "Aroma": ["Colegio C", "Colegio D"],
    "Arani": ["Colegio E", "Colegio F"],
    "Arque": ["Colegio G", "Colegio H"],
    "Andres Ibañez": ["Colegio I", "Colegio J"],
    "Ángel Sandoval": ["Colegio K", "Colegio L"],
    // Agrega más provincias y sus colegios según sea necesario
};

const EditarEstudiante = ({ onGuardar, estudiante: estudianteProp }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const estudiante = estudianteProp || location.state?.estudiante || {};

    const [mostrarArea, setMostrarArea] = useState(false);
    const [areasSeleccionadas, setAreasSeleccionadas] = useState(estudiante.areas || []);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(estudiante.categorias || []);
    const [colegiosDisponibles, setColegiosDisponibles] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(estudiante.curso || []);

    const [form, setForm] = useState({
        nombre: estudiante?.nombre || "",
        apellidos: estudiante?.apellidos || "",
        carnet: estudiante?.carnet || "",
        correo: estudiante?.correo || "",
        fechaNacimiento: estudiante?.fechaNacimiento || "",
        colegio: estudiante?.colegio || "",
        curso: estudiante?.curso || "",
        departamentoNacimiento: estudiante?.departamentoNacimiento || "",
        provinciaNacimiento: estudiante?.provinciaNacimiento || "",
        departamento: estudiante?.departamento || "",
        provincia: estudiante?.provincia || "",
    });

    useEffect(() => {
        // Asegúrate de cargar los colegios cuando cambie la provincia
        if (form.provincia) {
            setColegiosDisponibles(colegiosPorProvincia[form.provincia] || []);
        }
    }, [form.provincia]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación de nombre y apellido
        if ((name === "nombre" || name === "apellidos") && !nombreApellidoRegex.test(value) && value !== "") {
            alert("El nombre y apellido solo pueden contener letras.");
            return;
        }

        // Validación de carnet (solo números)
        if (name === "carnet" && value !== "" && !carnetRegex.test(value)) {
            alert("El carnet solo puede contener números.");
            return;
        }

        // Actualizar el estado del formulario
        if (name === "departamento") {
            setForm({ ...form, departamento: value, provincia: "", colegio: "" });
            setColegiosDisponibles([]);
        } else if (name === "provincia") {
            setForm({ ...form, provincia: value, colegio: "" });
        } else if (name === "departamentoNacimiento") {
            setForm({ ...form, departamentoNacimiento: value, provinciaNacimiento: "" });
        } else if (name === "provinciaNacimiento") {
            setForm({ ...form, provinciaNacimiento: value });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();

        const { nombre, apellidos, carnet, correo, fechaNacimiento, colegio, curso, departamento, provincia } = form;

        // Validación de campos obligatorios
        if (!nombre || !apellidos || !carnet || !correo || !fechaNacimiento || !curso || !departamento || !provincia || !colegio) {
            alert("Por favor completa todos los campos y selecciona un área de competencia.");
            return;
        }

        // Crear objeto actualizado del estudiante
        const estudianteEditado = {
            ...form,
            areas: areasSeleccionadas,
            categorias: categoriasSeleccionadas,
            index: estudiante.index || null, // Asegurar que se pase el índice
        };

        console.log("Guardando estudiante con datos:", estudianteEditado);

        // Llamar a la función de guardado del padre
        if (typeof onGuardar === "function") {
            await onGuardar(estudianteEditado);
            alert("Cambios guardados correctamente");
        } else {
            alert("No se pudo guardar los cambios porque no se definió la función onGuardar");
        }

        navigate("/convocatoria/id/inscripcion-manual"); // Redirigir después de guardar
    };

    return (
        <div className="registro-container editar-estudiante">
            <h2>Datos del Estudiante</h2>
            <form onSubmit={handleGuardar}>
                <div className="seccion-container">
                    <div className="grid-container">
                        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre(s)" />
                        <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Apellido(s)" />
                        <input type="text" name="carnet" value={form.carnet} onChange={handleChange} placeholder="Carnet de Identidad" readOnly />
                        <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="Correo Electrónico" />
                        <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
                    
                        <select name="departamentoNacimiento" onChange={handleChange} value={form.departamentoNacimiento}>
                            <option value="">Selecciona un departamento </option>
                            {Object.keys(departamentos).map((dep) => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>

                        <select name="provinciaNacimiento" onChange={handleChange} value={form.provinciaNacimiento} disabled={!form.departamentoNacimiento}>
                            <option value="">Selecciona una provincia</option>
                            {form.departamentoNacimiento && departamentos[form.departamentoNacimiento].map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Recuadro para Departamento, Provincia y Colegio */}
                <div className="seccion-container">
                    <div className="recuadro-container">
                        <h3> Datos del Colegio </h3>
                        <select name="departamento" onChange={handleChange} value={form.departamento}>
                            <option value="">Selecciona un departamento</option>
                            {Object.keys(departamentos).map((dep) => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>
            
                        <select name="provincia" onChange={handleChange} value={form.provincia} disabled={!form.departamento}>
                            <option value="">Selecciona una provincia</option>
                            {form.departamento && departamentos[form.departamento].map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                
                        <select name="colegio" onChange={handleChange} value={form.colegio} disabled={!form.provincia}>
                            <option value="">Selecciona un colegio</option>
                            {colegiosDisponibles.length > 0 && 
                                colegiosDisponibles.map((colegio) => ( 
                                    <option key={colegio} value={colegio}>{colegio}</option>
                                ))
                            }
                        </select>

                        <select name="curso" onChange={handleChange} value={form.curso} disabled={!form.colegio}>
                            <option value="">Selecciona un curso</option>
                            <option value="4_Primaria">4° Primaria</option>
                            <option value="5_Primaria">5° Primaria</option>
                            <option value="6_Primaria">6° Primaria</option>
                            <option value="1_Secundaria">1° Secundaria</option>
                            <option value="2_Secundaria">2° Secundaria</option>
                            <option value="3_Secundaria">3° Secundaria</option>
                            <option value="4_Secundaria">4° Secundaria</option>
                            <option value="5_Secundaria">5° Secundaria</option>
                            <option value="6_Secundaria">6° Secundaria</option>
                        </select>
                    </div>
                </div>

                {/* Áreas seleccionadas */}
                {areasSeleccionadas.length > 0 && (
                    <div className="areas-seleccionadas">
                        <h3>Áreas Seleccionadas:</h3>
                        <ul>
                            {areasSeleccionadas.map(({ idArea, tituloArea }) => (
                                <div key={idArea}>
                                    {categoriasSeleccionadas.filter((categoria) => categoria.idArea === idArea).map(({ idCategoria, nombreCategoria }) => (
                                        <li key={idCategoria}>{tituloArea} - {nombreCategoria}</li>
                                    ))}
                                </div>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Botón para mostrar/ocultar área de competencia */}
                <button className="boton btn-competencia" onClick={() => setMostrarArea(!mostrarArea)}>
                    {mostrarArea ? "Ocultar Áreas de Competencia" : "Seleccionar Áreas de Competencia"}
                </button>

                {/* Mostrar Área de Competencia si está activado */}
                {mostrarArea && (
                    <div className="area-competencia-container">
                        <AreaCompetencia
                            areasSeleccionadas={areasSeleccionadas}
                            setAreasSeleccionadas={setAreasSeleccionadas}
                            categoriasSeleccionadas={categoriasSeleccionadas}
                            setCategoriasSeleccionadas={setCategoriasSeleccionadas}
                        />
                    </div>
                )}

                <div className="seccion-container">
                    <div className="botones">
                        <button type="submit" className="boton btn-green">Guardar</button>
                        <button type="button" className="boton btn-red" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditarEstudiante;

