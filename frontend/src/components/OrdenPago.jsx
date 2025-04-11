import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Importa jsPDF
import "./styles/ordenPago.css";

const OrdenPago = () => {
  const [mostrarDescargar, setMostrarDescargar] = useState(false); // Estado para manejar la visibilidad
  const [mostrarBotones, setMostrarBotones] = useState(true); // Estado para controlar la visibilidad de los botones

  const estudiantes = [
    { nombre: "Katerin Marza Caro", monto: "100,00", disciplina: "Matrícula Semestre 1" },
    { nombre: "Juan Pérez", monto: "150,00", disciplina: "Matrícula Semestre 2" },
    { nombre: "María González", monto: "120,00", disciplina: "Matrícula Semestre 1" }
  ];

  const montoTotal = estudiantes.reduce((total, est) => {
    const monto = parseFloat(est.monto.replace(",", "."));
    return total + (isNaN(monto) ? 0 : monto);
  }, 0).toFixed(2).replace(".", ",");

  const handleAceptar = () => {
    // Muestra el botón de descargar PDF y oculta los botones "Aceptar" y "Cancelar"
    setMostrarDescargar(true);
    setMostrarBotones(false);
  };

  const handleDescargarPDF = () => {
    const doc = new jsPDF();


    // Título del recibo
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Orden de Pago", 105, 20, null, null, "center");

    // Detalles del estudiante
    doc.setFontSize(12);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 20, 40);
    doc.text("Órden de Pago", 20, 50);

    // Dibuja una línea divisoria
    doc.setDrawColor(0, 0, 0); // Color de la línea
    doc.line(10, 60, 200, 60);

    // Establecer encabezados de la tabla
    doc.text("Estudiante", 20, 70);
    doc.text("Monto", 150, 70);
    doc.text("Disciplina", 100, 70);

    doc.line(10, 75, 200, 75); // Línea divisoria

    let yPosition = 80;
    estudiantes.forEach((est) => {
      doc.text(est.nombre, 20, yPosition);
      doc.text(est.monto, 100, yPosition);
      doc.text(est.disciplina, 150, yPosition);
      yPosition += 10;
    });

    // Mostrar el monto total
    doc.setFontSize(14);
    doc.text(`Monto Total: ${montoTotal}`, 20, yPosition + 10);


    // Descargar el PDF
    doc.save("recibo_pago.pdf");
  };

  return (
    <div className="contenedor-orden">
      <div className="seccion-container">
        <h1>Órden de Pago </h1>
      
          <div className="seccion">

        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th className="monto">Monto</th>
              <th>Disciplina</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((est, index) => (
              <tr key={index}>
                <td><input value={est.nombre} readOnly /></td>
                <td className="monto"><input value={est.monto} readOnly /></td>
                <td><input value={est.disciplina} readOnly /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          <label>Monto Total:</label>
          <input type="text" value={montoTotal} readOnly />
        
        </div>
        </div>

        <div className="botones">
          {/* Mostrar solo si los botones están visibles */}
          {mostrarBotones && (
            <>
              <button className="btn-descargar" onClick={handleAceptar}>Aceptar</button>
              <button className="btn-cancelar">Cancelar</button>
            </>
          )}
          {/* Mostrar el botón "Descargar PDF" solo si mostrarDescargar es true */}
          {mostrarDescargar && (
            <button className="btn-descargar" onClick={handleDescargarPDF}>
              Descargar PDF
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrdenPago;


