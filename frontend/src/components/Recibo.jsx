import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./styles/Recibo.css";

const Recibo = () => {
  const [reciboData, setReciboData] = useState(null);

  // Simulando una llamada a una API para obtener los datos del recibo
  useEffect(() => {
    // En un caso real, esto sería una solicitud a una API
    setTimeout(() => {
      setReciboData({
        idRecibo: "00123",
        nombreTutor: "Juan Pérez",
        ciTutor: "12345678",
        monto: "100,00",
        fecha: new Date().toLocaleDateString(), // Fecha actual
        detalle: "Pago de matrícula para el semestre 1",
      });
    }, 1000); // Simula un retraso en la obtención de los datos
  }, []);

  const handleDescargarPDF = () => {
    if (!reciboData) return;

    const { idRecibo, nombreTutor, ciTutor, monto, fecha, detalle } = reciboData;

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Recibo de Pago", 105, 20, null, null, "center");

    // Detalles del recibo
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 70);
    
    doc.text(`ID Recibo: ${idRecibo}`, 20, 40);
    doc.text(`Nombre Tutor: ${nombreTutor}`, 20, 50);
    doc.text(`CI Tutor: ${ciTutor}`, 20, 60);
    
    doc.text(`Detalle: ${detalle}`, 20, 80);

    // Línea divisoria
    doc.line(10, 90, 200, 90);

    // Monto al final, debajo de la línea divisoria
    doc.text(`Monto: ${monto} USD`, 20, 100);

    // Agregar una línea divisoria final
    doc.line(10, 105, 200, 105);

    // Pie de página con texto
    doc.setFontSize(10);
    doc.text("Gracias por su pago", 105, 120, null, null, "center");

    // Descargar el PDF
    doc.save(`recibo_${idRecibo}.pdf`);
  };

  return (
    <div className="recibo-container">
      {/* Verificar si se han cargado los datos antes de mostrar el botón */}
      {reciboData ? (
        <div className="form-wrapper">
          <div className="form-box">
          <h2 className="form-title">Recibo</h2>
          <div className="seccion-container">
          <div className="seccion">
            

            <div className="recibo-details">
              <p><strong>ID Recibo:</strong> {reciboData.idRecibo}</p>
              <p><strong>Nombre Tutor:</strong> {reciboData.nombreTutor}</p>
              <p><strong>CI Tutor:</strong> {reciboData.ciTutor}</p>
              <p><strong>Fecha:</strong> {reciboData.fecha}</p>
              <p><strong>Detalle:</strong> {reciboData.detalle}</p>
            </div>

            <hr />

            <div className="recibo-monto">
              <p><strong>Monto:</strong> {reciboData.monto} USD</p>
            </div>
            </div>
            </div>

            <button className="btn-descargar" onClick={handleDescargarPDF}>
              Descargar PDF
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Recibo;

