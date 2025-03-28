import React, { useState } from "react";
import "./styles/GestionColegios.css";
import { Link } from "react-router-dom";

const DetalleInscripcion = () => {
    const [estudiantes, setEstudiantes] = useState([
        { id: 1, nombre: "Isaac", apellidos: "Gutierrez Huarachi", ci: "12435623", correo: "isgh@gmail.com", fechaNacimiento: "21-06-2004", colegio: "Unidad Educativa Genoveva Ríos", area: "Area 1", curso: "6to Secundaria", departamento: "Cochabamba", provincia: "Cercado", categoria: "Robotica" },
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const startIndex = currentPage * itemsPerPage;
    const currentEstudiantes = estudiantes.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="contenedor">
            <h3 className="title-tabla">DETALLE DE LA INSCRIPCIÓN</h3>
            <div className="tabla">
                <table>
                    <thead>
                        <tr>
                            <th className="col-nombre-estudiante">NOMBRE COMPLETO</th>
                            <th className="col-area">AREA DE COMPETENCIA</th>
                            <th className="col-accion">ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEstudiantes.map((estudiante) => (
                            <tr key={estudiante.id}>
                                <td>{estudiante.nombre} {estudiante.apellidos}</td>
                                <td>{estudiante.area}</td>
                                <td>
                                    <Link to="/" className="boton btn-red">MODIFICAR</Link>
                                    <button className="boton btn-red">RETIRAR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {estudiantes.length === 0 && (
                    <h1 className="no-data">
                        NO HAY ESTUDIANTES REGISTRADOS AÚN...
                    </h1>
                )}

                {estudiantes.length > itemsPerPage && (
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            ANTERIOR
                        </button>
                        <span>Página {currentPage + 1} de {Math.ceil(estudiantes.length / itemsPerPage)}</span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={startIndex + itemsPerPage >= estudiantes.length}
                        >
                            SIGUIENTE
                        </button>
                    </div>
                )}
            </div>
            <div className="control">
                <Link to="/" className="boton btn-red">AÑADIR NUEVO</Link>
                <button className="boton btn-blue">GUARDAR</button>
                <Link to="/" className="boton btn-red">CANCELAR</Link>
            </div>
        </div>
    );
}

export default DetalleInscripcion;
