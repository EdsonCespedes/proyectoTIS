import { useState, useEffect } from "react";
import Header from "../layout/Header";
import "./styles/AddColegios.css";
import { Link, useNavigate } from "react-router-dom";

const AddColegios = () => {
    const [departamento, setDepartamento] = useState("");
    const [provincia, setProvincia] = useState("");
    const [nombreColegio, setNombre] = useState("");
    
    const navigate = useNavigate();

    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/verdepartamentos")
            .then(response => response.json())
            .then(data => setDepartamentos(data))
            .catch(error => console.error("Error al obtener colegios:", error));
    }, []);

    const handleDepartamentoChange = (e) => {
        const nuevoDepartamento = e.target.value;
        setDepartamento(nuevoDepartamento);
        setProvincia("");

        fetch(`http://localhost:8000/api/verprovincias/departamento/${nuevoDepartamento}`)
            .then(response => response.json())
            .then(data => setProvincias(data))
            .catch(error => console.error("Error al obtener provincias:", error));
    };

    const handleProvinciaChange = (e) => {
        setProvincia(e.target.value);       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(departamento==="" && provincia==="" && nombre===""){
            alert("Llena todos los campos por favor");
            return;
        }

        const datos = {
            nombreColegio,
            departamento,
            provincia
        };

        try {
            const response = await fetch("http://localhost:8000/api/colegios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            if (!response.ok) throw new Error("Error al enviar datos");
            setDepartamento("");
            setProvincia("");
            setProvincias([]);

            navigate("/colegios");
        } catch (error) {
            console.error("Error en el envío:", error);
            alert("Ocurrió un error al guardar el colegio.");
        }
    };

    return (
        <div className="contenedor">
            <h3 className="title">UNIDAD EDUCATIVA</h3>
            <form className="formulario" id="colegio-form" onSubmit={handleSubmit}>
                <div className="campo">
                    <label>NOMBRE DE LA UNIDAD EDUCATIVA:</label>
                    <input type="text" onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <div className="two-items">
                    <div className="campo-item1">
                        <label>CÓDIGO RUE:</label>
                        <input type="text" />
                    </div>
                    <div className="campo-item2">
                        <label>FECHA DE CREACIÓN:</label>
                        <div className="input-with-icon">
                            <input type="date" placeholder="dd/mm/yyyy" />
                        </div>
                    </div>
                </div>
                <div className="campo">
                    <label>DIRECCIÓN:</label>
                    <input type="text" />
                </div>
                <div className="two-items">
                    <div className="campo-item1">
                        <label>DEPARTAMENTO:</label>
                        <select value={departamento} onChange={handleDepartamentoChange}>
                            <option value="">Seleccionar Departamento</option>
                            {departamentos.map((dep) => (
                                <option key={dep.idDepartamento} value={dep.nombreDepartamento}>
                                    {dep.nombreDepartamento}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="campo-item2">
                        <label>PROVINCIA:</label>
                        <select value={provincia} onChange={handleProvinciaChange} disabled={!departamento}>
                            <option value="">Seleccionar Provincia</option>
                            {departamento &&
                                provincias.map((prov) => (
                                    <option key={prov.idProvincia} value={prov.idProvincia}>
                                        {prov.nombreProvincia}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </form>
            <div className="control">
                <button type="submit" form="colegio-form" className="btn-blue">
                    GUARDAR
                </button>
                <Link to="/colegios" className="boton btn-red">CANCELAR</Link>
            </div>
        </div>
    );
};

export default AddColegios;
