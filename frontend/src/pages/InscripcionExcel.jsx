import React, { useState, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";

import ExcelDownload from "../components/ExcelDownload";
import "../components/styles/ImageUpload.css"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./styles/InscripcionExcel.css";

const InscripcionExcel = () => {
    const location = useLocation();
    const [estudiantes, setEstudiantes] = useState(location.state?.estudiantes || []);

    const [departamentoColegio, setDepartamentoColegio] = useState(estudiantes[0]?.departamentoColegio || "");
    const [provinciaColegio, setProvinciaColegio] = useState(estudiantes[0]?.provinciaColegio || "");
    const [idColegio, setIdColegio] = useState(estudiantes[0]?.idColegio || "");
    const [delegacion, setDelegacion] = useState(estudiantes[0]?.delegacion || ""); // o podés calcularlo
    const [tutor, setTutor] = useState({
        nombreTutor: estudiantes[0]?.tutor.nombreTutor || "",
        apellidoTutor: estudiantes[0]?.tutor.apellidoTutor || "",
        correoTutor: estudiantes[0]?.tutor.correoTutor || "",
        telefonoTutor: estudiantes[0]?.tutor.telefonoTutor || "",
        fechaNaciTutor: estudiantes[0]?.tutor.fechaNaciTutor || ""
    });

    const [provinciasColegio, setProvinciasColegio] = useState([]);
    const [colegiosDisponibles, setColegiosDisponibles] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    //const [estudiantes, setEstudiantes] = useState([]);
    const [archivoNombre, setArchivoNombre] = useState("");

    const navigate = useNavigate();

    const { idConvocatoria } = useParams();

    const [cursosDisponibles, setCursosDisponibles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/vercursos")
            .then(res => res.json())
            .then(data => {
                console.log("Cursos recibidos:", data); // 👀 VER QUÉ LLEGA AQUÍ
                setCursosDisponibles(data); // o data.cursos si aplica
            })
            .catch(err => console.error("Error cargando cursos:", err));

        fetch("http://localhost:8000/api/verdepartamentos")
            .then(response => response.json())
            .then(data => setDepartamentos(data))
            .catch(error => console.error("Error al obtener departamentos:", error));
    }, []);

    useEffect(() => {
        if (departamentoColegio) {
            fetch(`http://localhost:8000/api/verprovincias/departamento/${departamentoColegio}`)
                .then(res => res.json())
                .then(data => setProvinciasColegio(data))
                .catch(error => console.error("Error al obtener provincias:", error));
        }
    }, [departamentoColegio]);

    useEffect(() => {
        if (departamentoColegio && provinciaColegio) {
            fetch(`http://localhost:8000/api/departamentos/${departamentoColegio}/provincias/${provinciaColegio}/colegios`)
                .then(res => res.json())
                .then(data => setColegiosDisponibles(data))
                .catch(error => console.error("Error al obtener colegios:", error));
        }
    }, [departamentoColegio, provinciaColegio]);

    const [dragging, setDragging] = useState(false);

    const handleArchivo = async (file) => {
        setArchivoNombre(file.name);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const hoja = workbook.Sheets[workbook.SheetNames[0]];
            const datos = XLSX.utils.sheet_to_json(hoja, { defval: "" });

            const camposObligatorios = [
                "nombrePost", "apellidoPost", "carnet", "fechaNaciPost",
                "correoPost", "telefonoPost", "departamento", "provincia",
                "curso", "areas", "categorias"
            ];

            for (let i = 0; i < datos.length; i++) {
                const fila = datos[i];
                const errores = [];

                camposObligatorios.forEach(campo => {
                    const valor = fila[campo];
                    const esVacio =
                        valor === undefined || valor === null ||
                        (typeof valor === "string" && valor.trim() === "");

                    if (esVacio) {
                        errores.push(`Campo "${campo}" vacío o faltante`);
                    }
                });

                // Validación de correo (solo si existe)
                const correo = fila["correoPost"];
                if (correo && typeof correo === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                    errores.push(`Correo inválido en fila ${i + 2}`);
                }

                // Validación de teléfono (solo si es string o número)
                const telefono = fila["telefonoPost"];
                if (
                    telefono !== undefined &&
                    !/^\d{6,15}$/.test(String(telefono))
                ) {
                    errores.push(`Teléfono inválido en fila ${i + 2}`);
                }

                // Validación de fecha (se convierte a Date y se verifica)
                const fecha = fila["fechaNaciPost"];
                if (fecha && isNaN(new Date(fecha).getTime())) {
                    errores.push(`Fecha de nacimiento inválida en fila ${i + 2}`);
                }

                if (errores.length > 0) {
                    alert(`Error en fila ${i + 2}:\n- ${errores.join("\n- ")}`);
                    return; // Detener el proceso
                }
            }


            const estudiantesValidados = [];
            console.log(cursosDisponibles);

            for (const fila of datos) {
                const nombreCurso = fila["curso"]?.trim();
                const cursoEncontrado = cursosDisponibles.find(c => c.Curso.trim() === nombreCurso);

                if (!cursoEncontrado) {
                    console.warn(`Curso inválido: ${nombreCurso}`);
                    continue;
                }

                const idCurso = cursoEncontrado.idCurso;

                try {
                    const res = await fetch(`http://localhost:8000/api/convocatoria/${idConvocatoria}/curso/${encodeURIComponent(nombreCurso)}`);

                    const data = await res.json();

                    const areas = data.estructura.map(item => ({
                        id: item.area.id,
                        nombre: item.area.nombre,
                        categorias: item.categorias
                    }));

                    const areasExcel = (fila["areas"] || "").split(",").map(a => a.trim()).filter(Boolean);
                    const categoriasExcel = (fila["categorias"] || "").split(",").map(c => c.trim()).filter(Boolean);

                    // Validar que todas las áreas existan
                    const nombresAreasBackend = areas.map(a => a.nombre);
                    console.log(nombresAreasBackend);
                    const areasValidas = areasExcel.every(area => nombresAreasBackend.includes(area));
                    if (!areasValidas) {
                        console.warn(`Áreas inválidas para estudiante ${fila["nombrePost"]}:`, areasExcel);
                        continue;
                    }

                    const areasConfirmadas = areas.filter(area => areasExcel.includes(area.nombre));
                    console.log(areasConfirmadas);
                    

                    // Validar que las categorías corresponden a las áreas confirmadas
                    const categoriasConfirmadas = areasConfirmadas.map(area => {
                        const categoriasValidas = area.categorias.filter(cat => {
                            return categoriasExcel.includes(cat.nombre);
                        });

                        if (!categoriasValidas) {
                            console.warn(`Categorías inválidas para el área "${area.nombre}":`, categoriasExcel);
                        }
                        console.log(categoriasExcel);
                        
                        return categoriasValidas;
                    });

                    console.log(categoriasConfirmadas);

                    const areasFormateadas = areasConfirmadas.map((area) => ({
                        idArea: area.id,
                        tituloArea: area.nombre,
                        descArea: area.descripcion || "",
                        habilitada: area.habilitada ?? true, // por defecto true si no existe
                        idConvocatoria: area.idConvocatoria || idConvocatoria, // si se tiene disponible
                    }));

                    // const categoriasFormateadas = categoriasConfirmadas.map((categoria, index) => ({
                    //     idCategoria: categoria.id,
                    //     nombreCategoria: categoria.nombre,
                    //     descripcionCategoria: categoria.descripcion || "", // si se requiere
                    //     idArea: areasConfirmadas[index].idArea,
                    //     monto: categoria.monto || 50,
                    // }));

                    // // Aplanamos el array de categorías confirmadas para obtener un solo array de categorías
                    // const categoriasFormateadas = categoriasConfirmadas.flat().map((categoria, index) => ({
                    //     idCategoria: categoria.id,
                    //     nombreCategoria: categoria.nombre,
                    //     descripcionCategoria: categoria.descripcion || "", // si se requiere
                    //     idArea: categoria.idArea || areasFormateadas[index].idArea,  // Aquí usamos el id del área que corresponde
                    //     monto: categoria.monto || 50, // Si el monto no está definido, asignamos un valor por defecto
                    // }));

                    // Ahora, para cada categoría, asignamos correctamente el idArea
                    const categoriasFormateadas = categoriasConfirmadas.flat().map((categoria) => {
                        // Buscar el área que contiene esta categoría por el idCategoria
                        let idAreaEncontrado = null;

                        // Recorremos las áreas seleccionadas
                        areasConfirmadas.forEach((area) => {
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

                    // ✅ Si todo está OK, formateamos el estudiante
                    const estudiante = {
                        nombrePost: fila["nombrePost"] || "",
                        apellidoPost: fila["apellidoPost"] || "",
                        carnet: fila["carnet"] || "",
                        fechaNaciPost: fila["fechaNaciPost"] || "",
                        correoPost: fila["correoPost"] || "",
                        telefonoPost: fila["telefonoPost"] || "",
                        departamento: fila["departamento"] || "",
                        provincia: fila["provincia"] || "",
                        idCurso,
                        idColegio: "",
                        delegacion: "",
                        idTutor: null,
                        tutor: {
                            nombreTutor: "",
                            apellidoTutor: "",
                            correoTutor: "",
                            telefonoTutor: "",
                            fechaNaciTutor: ""
                        },
                        areas: areasFormateadas,
                        categorias: categoriasFormateadas,
                        departamentoColegio: "",
                        provinciaColegio: ""
                    };
                    console.log(estudiante);
                    estudiantesValidados.push(estudiante);
                } catch (error) {
                    console.error("Error al obtener áreas y categorías:", error);
                }
            }

            setEstudiantes(estudiantesValidados);
        };
        reader.readAsArrayBuffer(file);
    };

    const onDrop = (e) => {
        e.preventDefault();

        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
            handleArchivo(file);
        } else {
            alert("Solo se aceptan archivos Excel (.xls, .xlsx)");
        }
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) handleArchivo(file);
    };

    const handleSiguiente = () => {
        // const estudiantes = estudiantes.map(est => ({
        //     ...est,
        //     departamentoColegio,
        //     provinciaColegio,
        //     idColegio,
        //     delegacion,
        //     tutor: { ...tutor }
        // }));
        console.log(tutor);
        
        // setEstudiantes(estudiantes.map(est => ({
        //     ...est,
        //     departamentoColegio,  // Asignar el valor de departamentoColegio a cada estudiante
        //     provinciaColegio,     // Asignar el valor de provinciaColegio a cada estudiante
        //     idColegio,            // Asignar el valor de idColegio a cada estudiante
        //     delegacion,           // Asignar el valor de delegacion a cada estudiante
        //     tutor: { ...tutor }   // Asignar los datos del tutor (copia del objeto tutor)
        // })));

        // navigate(`/convocatoria/${idConvocatoria}/ordenPago`, {
        //     state: {
        //         estudiantes,
        //         from: "Excel",
        //     },
        // });
        navigate(`/convocatoria/${idConvocatoria}/ordenPago`, {
            state: {
                estudiantes: estudiantes.map(est => ({
                    ...est,
                    departamentoColegio,
                    provinciaColegio,
                    idColegio,
                    delegacion,
                    tutor: { ...tutor },  // Datos del tutor actualizados
                })),
                from: "Excel",
            },
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "departamentoColegio") {
            setDepartamentoColegio(value);
            fetch(`http://localhost:8000/api/verprovincias/departamento/${value}`)
                .then(response => response.json())
                .then(data => setProvinciasColegio(data))
                .catch(error => console.error("Error al obtener provincias:", error));
            setColegiosDisponibles([]);
        }

        if (name === "provinciaColegio") {
            setProvinciaColegio(value);
            const departamentoActual = departamentoColegio;
            fetch(`http://localhost:8000/api/departamentos/${departamentoActual}/provincias/${value}/colegios`)
                .then(response => response.json())
                .then(data => setColegiosDisponibles(data))
                .catch(error => console.error("Error al obtener colegios:", error));
        }

        if (name === "idColegio") {
            console.log(colegiosDisponibles);
            
            setIdColegio(value); // actualiza el colegio
            setDelegacion(Object.entries(colegiosDisponibles).find(([id, nombre]) => id == value)?.[1] || "")
        }

        // Cambiar valores del tutor
        if (name.includes("tutor.")) {
            const [,child] = name.split(".");
            setTutor((prevTutor) => ({
                ...prevTutor,
                [child]: value
            }));
        }
    };

    return (
        <div className="excel-container">
            <div className="excel-title">
                <h2>TODOS LOS POSTULANTES DEBEN PERTENECER AL MISMO COLEGIO Y TENER EL MISMO TUTOR</h2>
                <h2>Descague la plantilla aqui y suba el archivo .xlsx con el formato dado</h2>
                <ExcelDownload />
            </div>

            <div
                className={`image-upload-container ${dragging ? "dragging" : ""}`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
            >
                <label className="upload-box">
                    {archivoNombre ? (
                        <div className="upload-placeholder">
                            <span className="upload-icon">📄</span>
                            <p>Archivo cargado: <strong>{archivoNombre}</strong></p>
                        </div>
                    ) : (
                        <div className="upload-placeholder">
                            <span className="upload-icon">⬆️</span>
                            <p>Arrastre y suelte el archivo Excel aquí o haga clic para seleccionarlo</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={onFileChange}
                        className="file-input"
                    />
                </label>
            </div>

            <div className="excel-previa">
                <h3>Vista previa ({estudiantes.length} estudiantes)</h3>

                <div className="excel-tabla">
                    <table>
                        <thead>
                            <tr>
                                <th className="col-nombre-estudiante">NOMBRE COMPLETO</th>
                                <th className="col-area">AREA DE COMPETENCIA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((estudiante, index) => (
                                <tr key={index}>
                                    <td>{estudiante.nombrePost} {estudiante.apellidoPost}</td>
                                    <td>
                                        {estudiante.areas.map((area, index) => (
                                            <React.Fragment key={area.idArea}>
                                                {area.tituloArea} - {estudiante.categorias[index]?.nombreCategoria}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {estudiantes.length === 0 && (
                        <h1 className="no-data">
                            NO HAY ESTUDIANTES PARA REGISTRAR AÚN...
                        </h1>
                    )}
                </div>
            </div>

            <div className="recuadro-container">
                <h3> Datos del Colegio </h3>
                <select name="departamentoColegio" onChange={handleChange} value={departamentoColegio}>
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map((dep) => (
                        <option key={dep.idDepartamento} value={dep.nombreDepartamento}>{dep.nombreDepartamento}</option>
                    ))}
                </select>

                <select name="provinciaColegio" onChange={handleChange} value={provinciaColegio} disabled={!departamentoColegio}>
                    <option value="">Selecciona una provincia</option>
                    {provinciasColegio.map((prov) => (
                        <option key={prov.idProvincia} value={prov.nombreProvincia}>{prov.nombreProvincia}</option>
                    ))}
                </select>

                <select name="idColegio" onChange={handleChange} value={idColegio} disabled={!provinciaColegio}>
                    <option value="">Selecciona un colegio</option>
                    {Object.entries(colegiosDisponibles).map(([id, nombre]) => (
                        <option key={id} value={id}>
                            {nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="seccion">
                <h2 className="subtitulo">Tutor</h2>
                <div className="grid-container">
                    <input type="text" placeholder="Nombre(s)" name="tutor.nombreTutor" onChange={handleChange} value={tutor.nombreTutor} />
                    <input type="text" placeholder="Apellido(s)" name="tutor.apellidoTutor" onChange={handleChange} value={tutor.apellidoTutor} />
                    <input type="text" placeholder="Teléfono" name="tutor.telefonoTutor" onChange={handleChange} value={tutor.telefonoTutor} />
                    <input type="email" placeholder="Correo Electrónico" name="tutor.correoTutor" onChange={handleChange} value={tutor.correoTutor} />
                    <input
                        type="date"
                        name="tutor.fechaNaciTutor"
                        onChange={handleChange}
                        min="1990-01-01"
                        max="2019-12-31"
                        value={tutor.fechaNaciTutor}
                    />
                </div>
            </div>

            <div className="control">
                <button
                    className="boton-style btn-aceptacion"
                    onClick={handleSiguiente}
                >
                    Siguiente
                </button>
                <Link to="/convocatorias" className="boton-style btn-rechazo">Cancelar</Link>
            </div>
        </div>
    );
};

export default InscripcionExcel;
