import React from "react";
import "./styles/Inicio.css"; // Archivo de estilos

const datosInicio = [
   {
    nombre: "NOSOTROS",
    imagen: "https://w7.pngwing.com/pngs/535/3/png-transparent-person-s-head-with-thoughts-illustration-international-physics-olympiad-digital-marketing-science-learning-whiteboard-science-text-service-public-relations-thumbnail.png",

   },
   {
    nombre: "INSCRIPCION",
    imagen: "https://images.icon-icons.com/20/PNG/256/businessregistration_signpen_negocio_inscripcio_2358.png",
   },
   {
   nombre: "DISCIPLINA",
    imagen: "https://oce2022.fcpn.edu.bo/olimpiadas/images/DISCIPLINAS.jpg;jsessionid=AD4555CF87A130C41666CBDEBB6FE25B",
   },
   {
    nombre: "EVENTOS",
    imagen: "https://pbs.twimg.com/media/ErdP28EXcAE8vrI.png",
   }
];
const Inicio = () => {
  return (
    <div className="inicio-container">

      <div className="grid-container">
        {datosInicio.map((item, index) => (
          <div key={index} className="card">
            <img src={item.imagen} alt={item.nombre} className="imagen" />
            <h3>{item.nombre}</h3>
            <div
              className="icono-container"
              style={{ backgroundColor: item.color }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Inicio;
