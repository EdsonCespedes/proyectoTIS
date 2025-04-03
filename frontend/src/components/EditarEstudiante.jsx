import React, { useState, useEffect } from "react";
import "./styles/Registro.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AreaCompetencia from "./AreaCompetencia";

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
  

const EditarEstudiante = ({ onGuardar }) => {
    const { idConvocatoria } = useParams(); // 🔥 Mover dentro del componente
    const location = useLocation();
    const navigate = useNavigate();
    const estudiante = location.state?.estudiante || {};

    const [mostrarArea, setMostrarArea] = useState(false);
    const [areasSeleccionadas, setAreasSeleccionadas] = useState(estudiante.areas || []);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(estudiante.categorias || []);
    const [colegiosDisponibles, setColegiosDisponibles] = useState([]);

    const [form, setForm] = useState({
        nombre: estudiante?.nombre || "",
        apellidos: estudiante?.apellidos || "",
        carnet: estudiante?.carnet || "",
        correo: estudiante?.correo || "",
        fechaNacimiento: estudiante?.fechaNacimiento || "",
        colegio: estudiante?.colegio || "",
        curso: estudiante?.curso || "",
        departamento: estudiante?.departamento || "",
        provincia: estudiante?.provincia || "",
    });

    useEffect(() => {
        if (form.provincia) {
            // Cargar colegios para la provincia seleccionada
            setColegiosDisponibles(departamentos[form.departamento] || []);
        }
    }, [form.departamento, form.provincia]);

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
            setForm({
                ...form,
                departamento: value,
                provincia: "", // Reiniciar la provincia al cambiar el departamento
                colegio: "", // Reiniciar el colegio al cambiar el departamento
            });
            setColegiosDisponibles([]); // Limpiar colegios cuando cambiamos el departamento
        } else if (name === "provincia") {
            setForm({ ...form, provincia: value, colegio: "" }); // Reiniciar el colegio cuando cambiamos la provincia
            setColegiosDisponibles(departamentos[value] || []); // Cargar los colegios para la provincia seleccionada
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();

        const { nombre, apellidos, carnet, correo, fechaNacimiento, colegio, curso, departamento, provincia } = form;

        if (!nombre || !apellidos || !carnet || !correo || !fechaNacimiento || !colegio || !curso || !departamento || !provincia || areasSeleccionadas.length === 0 || categoriasSeleccionadas.length === 0) {
            alert("Por favor completa todos los campos y selecciona un área de competencia.");
            return;
        }

        console.log("Guardando estudiante con datos:", form);
        console.log("Áreas seleccionadas:", areasSeleccionadas);
        console.log("Categorías seleccionadas:", categoriasSeleccionadas);

        if (typeof onGuardar == "function") {
            await onGuardar({ ...form, areas: areasSeleccionadas, categorias: categoriasSeleccionadas });
            alert("Cambios guardados correctamente");
            // Redirigir después de guardar
            navigate(-1);
        } 
    };

    return (
        <div className="registro-container editar-estudiante">
            <h2>Editar Estudiante</h2>
            <form onSubmit={handleGuardar}>
                <div className="grid-container">
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre(s)" />
                    <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Apellido(s)" />
                    <input type="text" name="carnet" value={form.carnet} onChange={handleChange} placeholder="Carnet de Identidad" />
                    <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="Correo Electrónico" />
                    <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />

                </div>

                <select name="curso" onChange={handleChange} value={form.curso}>
                    <option value="">Selecciona un curso</option>
                    <option value="Curso 1">Curso 1</option>
                </select>

                <select name="departamento" onChange={handleChange} value={form.departamento}>
                    <option value="">Selecciona un departamento</option>
                    {Object.keys(departamentos).map((dep) => (
                        <option key={dep} value={dep}>{dep}</option>
                    ))}
                </select>

                <select name="provincia" onChange={handleChange} value={form.provincia} disabled={!form.departamento}>
                    <option value="">Selecciona una provincia</option>
                    {form.departamento && departamentos[form.departamento]?.map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                    ))}
                </select>

                {colegiosDisponibles.length > 0 && (
                    <select name="colegio" onChange={handleChange} value={form.colegio} disabled={!form.provincia}>
                        <option value="">Selecciona un colegio</option>
                        {colegiosDisponibles.map((colegio) => (
                            <option key={colegio} value={colegio}>{colegio}</option>
                        ))}
                    </select>
                )}

                {areasSeleccionadas.length > 0 && (
                    <div className="areas-seleccionadas">
                        <h3>Áreas Seleccionadas:</h3>
                        <ul>
                            {areasSeleccionadas.map(({ idArea, tituloArea }) => (
                                <div key={idArea}>
                                    {categoriasSeleccionadas
                                        .filter((categoria) => categoria.idArea === idArea)
                                        .map(({ idCategoria, nombreCategoria }) => (
                                            <li key={idCategoria}>{tituloArea} - {nombreCategoria}</li>
                                        ))}
                                </div>
                            ))}
                        </ul>
                    </div>
                )}

                <button type="button" className="boton btn-competencia" onClick={() => setMostrarArea(!mostrarArea)}>
                    {mostrarArea ? "Ocultar Áreas de Competencia" : "Seleccionar Áreas de Competencia"}
                </button>

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
                        <button type="submit" className="boton btn-blue">Registrar Cambios</button>
                        <button type="button" className="boton btn-red" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditarEstudiante;


  