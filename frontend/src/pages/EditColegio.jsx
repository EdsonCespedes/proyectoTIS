import { useState } from "react";
import Header from "../layout/Header";
import "./styles/AddColegios.css";
import { Link } from "react-router-dom";

const EditColegios = () => {
    const [departamento, setDepartamento] = useState("");
    const [provincia, setProvincia] = useState("");

    // Datos de ejemplo de departamentos y provincias
    const departamentos = [
        { id: "1", nombre: "La Paz" },
        { id: "2", nombre: "Santa Cruz" },
        { id: "3", nombre: "Cochabamba" },
        { id: "4", nombre: "Chuquisaca" },
        { id: "5", nombre: "Oruro" },
        { id: "6", nombre: "Potosí" },
        { id: "7", nombre: "Tarija" },
        { id: "8", nombre: "Beni" },
        { id: "9", nombre: "Pando" },
    ];

    const provinciasPorDepartamento = {
        "1": [
            { id: "1-1", nombre: "Abel Iturralde" },
            { id: "1-2", nombre: "Aroma" },
            { id: "1-3", nombre: "Bautista Saavedra" },
            { id: "1-4", nombre: "Camacho" },
            { id: "1-5", nombre: "Caranavi" },
            { id: "1-6", nombre: "Franz Tamayo" },
            { id: "1-7", nombre: "Gualberto Villarroel" },
            { id: "1-8", nombre: "Ingavi" },
            { id: "1-9", nombre: "Inquisivi" },
            { id: "1-10", nombre: "José Manuel Pando" },
            { id: "1-11", nombre: "Larecaja" },
            { id: "1-12", nombre: "Loayza" },
            { id: "1-13", nombre: "Los Andes" },
            { id: "1-14", nombre: "Manco Kapac" },
            { id: "1-15", nombre: "Muñecas" },
            { id: "1-16", nombre: "Nor Yungas" },
            { id: "1-17", nombre: "Omasuyos" },
            { id: "1-18", nombre: "Pacajes" },
            { id: "1-19", nombre: "Pedro Domingo Murrillo" },
            { id: "1-20", nombre: "Sud Yungas" },
        ],
        "2": [
            { id: "2-1", nombre: "Andres Ibañez" },
            { id: "2-2", nombre: "Ángel Snadoval" },
            { id: "2-3", nombre: "Chiquitos" },
            { id: "2-4", nombre: "Cordillera" },
            { id: "2-5", nombre: "Florida" },
            { id: "2-6", nombre: "Germán Busch" },
            { id: "2-7", nombre: "Guarayos" },
            { id: "2-8", nombre: "Ichilo" },
            { id: "2-9", nombre: "Manuel María Caballero" },
            { id: "2-10", nombre: "Ñuflo de Chávez" },
            { id: "2-11", nombre: "Obispo Santistevan" },
            { id: "2-12", nombre: "Sara" },
            { id: "2-13", nombre: "Vallegrande" },
            { id: "2-14", nombre: "Velasco" },
            { id: "2-15", nombre: "Warnes" },
        ],
        "3": [
            { id: "3-1", nombre: "Arani" },
            { id: "3-2", nombre: "Arque" },
            { id: "3-3", nombre: "Ayopaya" },
            { id: "3-4", nombre: "Bolívar" },
            { id: "3-5", nombre: "Capinota" },
            { id: "3-6", nombre: "Carrasco" },
            { id: "3-7", nombre: "Cercado" },
            { id: "3-8", nombre: "Chapare" },
            { id: "3-9", nombre: "Esteban Arce" },
            { id: "3-10", nombre: "Germán Jordan" },
            { id: "3-11", nombre: "Mizque" },
            { id: "3-12", nombre: "Punata" },
            { id: "3-13", nombre: "Quillacollo" },
            { id: "3-14", nombre: "Tapacarí" },
            { id: "3-15", nombre: "Tiraque" },
            { id: "3-16", nombre: "Totora" },
        ],
        "4": [
            { id: "4-1", nombre: "Belisario Boeto" },
            { id: "4-2", nombre: "Hernando Siles" },
            { id: "4-3", nombre: "Jaime Zudañez" },
            { id: "4-4", nombre: "Juana Azurduy de Padilla" },
            { id: "4-5", nombre: "Luis Calvo" },
            { id: "4-6", nombre: "Nor Cinti" },
            { id: "4-7", nombre: "Oropeza" },
            { id: "4-8", nombre: "Sud Cinti" },
            { id: "4-9", nombre: "Tomina" },
            { id: "4-10", nombre: "Yamparáez" },
        ],
        "5": [
            { id: "5-1", nombre: "Abaroa" },
            { id: "5-2", nombre: "Carangas" },
            { id: "5-3", nombre: "Cercado" },
            { id: "5-4", nombre: "Eduardo Avaroa" },
            { id: "5-5", nombre: "Ladislao Cabrera" },
            { id: "5-6", nombre: "Litoral" },
            { id: "5-7", nombre: "Mejillones" },
            { id: "5-8", nombre: "Nor Carangas" },
            { id: "5-9", nombre: "Pantaleón Dalence" },
            { id: "5-10", nombre: "Poopó" },
            { id: "5-11", nombre: "Sabaya" },
            { id: "5-12", nombre: "Sajama" },
            { id: "5-13", nombre: "San Pedro de Totora" },
            { id: "5-14", nombre: "Sebastián Pagador" },
            { id: "5-15", nombre: "Sud Chichas" },
            { id: "5-16", nombre: "Tomás Barrón" },
        ],
        "6": [
            { id: "6-1", nombre: "Alonso de Ibáñez" },
            { id: "6-2", nombre: "Antonio Quijarro" },
            { id: "6-3", nombre: "Bernandino Bilbao" },
            { id: "6-4", nombre: "Charcas" },
            { id: "6-5", nombre: "Chayanta" },
            { id: "6-6", nombre: "Coornelio Saavedra" },
            { id: "6-7", nombre: "Daniel Campos" },
            { id: "6-8", nombre: "Enrique Baldivieso" },
            { id: "6-9", nombre: "José María Linares" },
            { id: "6-10", nombre: "Modesto Omiste" },
            { id: "6-11", nombre: "Nor Chichas" },
            { id: "6-12", nombre: "Nor Lípez" },
            { id: "6-13", nombre: "Rafael Bustillo" },
            { id: "6-14", nombre: "Sud Chichas" },
            { id: "6-15", nombre: "Sud Lípez" },
            { id: "6-16", nombre: "Tomás Frías" },
        ],
        "7": [
            { id: "7-1", nombre: "Aniceto Arce" },
            { id: "7-2", nombre: "Burnet O'Connor" },
            { id: "7-3", nombre: "Cercado" },
            { id: "7-4", nombre: "Gran Chaco" },
            { id: "7-5", nombre: "José María Avilés" },
            { id: "7-6", nombre: "Eustaquio Méndez" },
        ],
        "8": [
            { id: "8-1", nombre: "Cercado" },
            { id: "8-2", nombre: "Itenéz" },
            { id: "8-3", nombre: "José Ballivián" },
            { id: "8-4", nombre: "Mamoré" },
            { id: "8-5", nombre: "Marbán" },
            { id: "8-6", nombre: "Moxos" },
            { id: "8-7", nombre: "Vaca Díez" },
            { id: "8-8", nombre: "Yacuma" },
        ],
        "9": [
            { id: "9-1", nombre: "Abuná" },
            { id: "9-2", nombre: "Federico Román" },
            { id: "9-3", nombre: "Madre de Dios" },
            { id: "9-4", nombre: "Manuripi" },
            { id: "9-5", nombre: "Nicolás Suárez" },
        ],

    };

    // Cambiar el departamento seleccionado
    const handleDepartamentoChange = (e) => {
        setDepartamento(e.target.value);
        setProvincia(""); // Reseteamos la provincia cuando cambiamos el departamento
    };

    // Cambiar la provincia seleccionada
    const handleProvinciaChange = (e) => {
        setProvincia(e.target.value);
    };

    return (
        <div className="contenedor">
            {/* <Header /> */}
            <h3 className="title">UNIDAD EDUCATIVA</h3>
            <form className="formulario" id="colegio-form">
                <div className="campo">
                    <label>NOMBRE DE LA UNIDAD EDUCATIVA:</label>
                    <input type="text" value={"Hola"}/>
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
                                <option key={dep.id} value={dep.id}>
                                    {dep.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="campo-item2">
                        <label>PROVINCIA:</label>
                        <select value={provincia} onChange={handleProvinciaChange} disabled={!departamento}>
                            <option value="">Seleccionar Provincia</option>
                            {departamento &&
                                provinciasPorDepartamento[departamento]?.map((prov) => (
                                    <option key={prov.id} value={prov.id}>
                                        {prov.nombre}
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

export default EditColegios;
