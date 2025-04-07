import React, { useState } from "react";
import "./styles/GestionColegios.css";
import { Link } from "react-router-dom";



const DetalleInscripcion = ({ estudiantes, onEliminar, onEditar }) => {
    console.log("Estudiantes actuales:", estudiantes); // Verifica que se pase el estado actualizado

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
                        {currentEstudiantes.map((estudiante, index) => (
                            <tr key={index}>
                                <td>{estudiante.nombre} {estudiante.apellidos}</td>
                                <td>
                                    {estudiante.areas.map((area, index) => (
                                        <React.Fragment key={area.idArea}>
                                            {area.tituloArea} - {estudiante.categorias[index]?.nombreCategoria}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </td>
                                <td>
                                    <Link to="/editar" state={{estudiante}} className="boton btn-red">MODIFICAR</Link>
                                    <button onClick={()=>onEliminar(index)} className="boton btn-red">RETIRAR</button>
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
        </div>
    );
}

export default DetalleInscripcion;
