import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import "../components/styles/GestionColegios.css";
import { Link } from "react-router-dom";

const GestionColegios = () => {
    const [colegios, setColegios] = useState([
        { id: 1, nombre: "Colegio Nacional Bolívar", departamento: "Cochabamba", provincia: "Cercado", rue: 1001 },
        { id: 2, nombre: "Unidad Educativa San Ignacio", departamento: "La Paz", provincia: "Murillo", rue: 1002 },
        { id: 3, nombre: "Colegio 12 de Octubre", departamento: "Santa Cruz", provincia: "Andrés Ibáñez", rue: 1003 },
        { id: 4, nombre: "Escuela República de Italia", departamento: "Oruro", provincia: "Cercado", rue: 1004 },
        { id: 5, nombre: "Colegio Pedro Poveda", departamento: "Potosí", provincia: "Tomás Frías", rue: 1005 },
        { id: 6, nombre: "Unidad Educativa La Salle", departamento: "Tarija", provincia: "Cercado", rue: 1006 },
        { id: 7, nombre: "Colegio Cristo Rey", departamento: "Beni", provincia: "Vaca Díez", rue: 1007 },
        { id: 8, nombre: "Instituto Americano", departamento: "Chuquisaca", provincia: "Oropeza", rue: 1008 },
        { id: 9, nombre: "Unidad Educativa Marista", departamento: "Pando", provincia: "Manuripi", rue: 1009 },
        { id: 10, nombre: "Colegio Don Bosco", departamento: "La Paz", provincia: "Murillo", rue: 1010 },
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        fetch("http://localhost:8000/api/colegios")
            .then(response => response.json())
            .then(data => setColegios(data))
            .catch(error => console.error("Error al obtener colegios:", error));
    }, []);

    const startIndex = currentPage * itemsPerPage;
    const currentColegios = colegios.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="contenedor">
            <h3 className="title-tabla">UNIDADES EDUCATIVAS</h3>
            <div className="tabla">
                <table>
                    <thead>
                        <tr>
                            <th className="col-rue">RUE</th>
                            <th className="col-nombre">UNIDAD EDUCATIVA</th>
                            <th className="col-accion">ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentColegios.map((colegio) => (
                            <tr key={colegio.id}>
                                <td>{colegio.rue}</td>
                                <td>{colegio.nombre}</td>
                                <td>
                                    <Link to="/edit-colegios" className="boton btn-red">MODIFICAR</Link>
                                    <button className="boton btn-red">RETIRAR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {colegios.length === 0 && (
                    <h1 className="no-data">
                        NO HAY COLEGIOS REGISTRADOS AÚN...
                    </h1>
                )}

                {colegios.length > itemsPerPage && (
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            ANTERIOR
                        </button>
                        <span>Página {currentPage + 1} de {Math.ceil(colegios.length / itemsPerPage)}</span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={startIndex + itemsPerPage >= colegios.length}
                        >
                            SIGUIENTE
                        </button>
                    </div>
                )}
            </div>
            <div className="control">
                <Link to="/registro-colegios" className="boton btn-red">AÑADIR NUEVO</Link>
                <button className="boton btn-blue">GUARDAR</button>
                <Link to="/" className="boton btn-red">CANCELAR</Link>
            </div>
        </div>
    );
}

export default GestionColegios;
