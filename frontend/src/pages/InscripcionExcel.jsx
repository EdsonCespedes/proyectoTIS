import React, { useState, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";

import ExcelDownload from "../components/ExcelDownload";
import "../components/styles/ImageUpload.css"
import { useParams } from "react-router-dom";

const InscripcionExcel = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [archivoNombre, setArchivoNombre] = useState("");

    const { idConvocatoria } = useParams();

    const [cursosDisponibles, setCursosDisponibles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/vercursos")
            .then(res => res.json())
            //   .then(data => setCursosDisponibles(data))
            .then(data => {
                console.log("Cursos recibidos:", data); // 👀 VER QUÉ LLEGA AQUÍ
                setCursosDisponibles(data); // o data.cursos si aplica
            })
            .catch(err => console.error("Error cargando cursos:", err));
    }, []);

    const [dragging, setDragging] = useState(false);

    const handleArchivo = async (file) => {
        setArchivoNombre(file.name);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const hoja = workbook.Sheets[workbook.SheetNames[0]];
            const datos = XLSX.utils.sheet_to_json(hoja, { defval: "" });

            // Validación previa del formato del Excel
            const camposObligatorios = [
                "nombrePost", "apellidoPost", "carnet", "fechaNaciPost",
                "correoPost", "telefonoPost", "departamento", "provincia",
                "curso", "areas", "categorias"
            ];

            for (let i = 0; i < datos.length; i++) {
                const fila = datos[i];
                const errores = [];

                camposObligatorios.forEach(campo => {
                    if (!fila[campo]  || fila[campo].trim() === "") {
                        errores.push(`Campo "${campo}" vacío o inválido`);
                    }
                });

                // Validación de correo básico
                if (fila["correoPost"] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fila["correoPost"])) {
                    errores.push(`Correo inválido en fila ${i + 2}`); // +2 por el encabezado
                }

                // Validación de teléfono numérico
                if (fila["telefonoPost"] && !/^\d{6,15}$/.test(fila["telefonoPost"])) {
                    errores.push(`Teléfono inválido en fila ${i + 2}`);
                }

                // Validación de fecha (formato simple YYYY-MM-DD o similar)
                if (fila["fechaNaciPost"] && isNaN(Date.parse(fila["fechaNaciPost"]))) {
                    errores.push(`Fecha de nacimiento inválida en fila ${i + 2}`);
                }

                if (errores.length > 0) {
                    alert(`Error en fila ${i + 2}:\n- ${errores.join("\n- ")}`);
                    return; // Cortar proceso
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
                    const estructura = data.estructura;

                    const areasExcel = (fila["areas"] || "").split(",").map(a => a.trim()).filter(Boolean);
                    const categoriasExcel = (fila["categorias"] || "").split(",").map(c => c.trim()).filter(Boolean);

                    // Validar que todas las áreas existan
                    const nombresAreasBackend = estructura.map(e => e.area.nombre);
                    const areasValidas = areasExcel.every(area => nombresAreasBackend.includes(area));
                    if (!areasValidas) {
                        console.warn(`Áreas inválidas para estudiante ${fila["nombrePost"]}:`, areasExcel);
                        continue;
                    }

                    // Validar que las categorías correspondan con sus áreas
                    const categoriasValidas = categoriasExcel.every((cat, idx) => {
                        const areaNombre = areasExcel[idx];
                        const areaData = estructura.find(e => e.area.nombre === areaNombre);
                        if (!areaData) return false;

                        const nombresCategorias = areaData.categorias.map(c => c.nombre);
                        return nombresCategorias.includes(cat);
                    });

                    if (!categoriasValidas) {
                        console.warn(`Categorías inválidas para estudiante ${fila["nombrePost"]}:`, categoriasExcel);
                        continue;
                    }

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
                        areas: areasExcel,
                        categorias: categoriasExcel,
                        departamentoColegio: "",
                        provinciaColegio: ""
                    };

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

    return (
        <div>
            <h2>TODOS LOS POSTULANTES DEBEN PERTENECER AL MISMO COLEGIO Y TENER EL MISMO TUTOR</h2>
            <h2>Descague la plantilla aqui y suba el archivo .xlsx con el formato dado</h2>
            <ExcelDownload />

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


            {archivoNombre && <p>Archivo cargado: {archivoNombre}</p>}

            {/* Vista previa */}
            <h3>Vista previa ({estudiantes.length} estudiantes)</h3>
            <ul>
                {estudiantes.slice(0, 5).map((est, i) => (
                    <li key={i}>
                        {est.nombrePost} {est.apellidoPost} - {est.carnet} - {est.areas.join(", ")} / {est.categorias.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InscripcionExcel;
