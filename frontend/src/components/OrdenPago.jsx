import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Importa jsPDF
import "./styles/ordenPago.css";

const OrdenPago = () => {
  const [mostrarDescargar, setMostrarDescargar] = useState(false);
  const [mostrarBotones, setMostrarBotones] = useState(true);

  const estudiantes = [
    { nombre: "Katerin Marza Caro", monto: "100,00", disciplina: "Fisica" },
    { nombre: "Juan Pérez", monto: "150,00", disciplina: "Matematica" },
    { nombre: "María González", monto: "120,00", disciplina: "Fisica" }
  ];

  const montoTotal = estudiantes
    .reduce((total, est) => {
      const monto = parseFloat(est.monto.replace(",", "."));
      return total + (isNaN(monto) ? 0 : monto);
    }, 0)
    .toFixed(2)
    .replace(".", ",");

  const handleAceptar = () => {
    setMostrarDescargar(true);
    setMostrarBotones(false);
  };

  const handleCancelar = () => {
    setMostrarDescargar(false);
    setMostrarBotones(true);
  };

  const handleDescargarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Orden de Pago", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 20, 40);
    doc.text("Órden de Pago", 20, 50);

    doc.setDrawColor(0, 0, 0);
    doc.line(10, 60, 200, 60);

    doc.text("Estudiante", 20, 70);
    doc.text("Monto", 100, 70);
    doc.text("Disciplina", 150, 70);

    doc.line(10, 75, 200, 75);

    let yPosition = 80;
    estudiantes.forEach((est) => {
      doc.text(est.nombre, 20, yPosition);
      doc.text(est.monto, 100, yPosition);
      doc.text(est.disciplina, 150, yPosition);
      yPosition += 10;
    });

    doc.setFontSize(14);
    doc.text(`Monto Total: ${montoTotal}`, 20, yPosition + 10);

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
                <th>Áreas</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((est, index) => (
                <tr key={index}>
                  <td>
                    <input value={est.nombre} readOnly />
                  </td>
                  <td className="monto">
                    <input value={est.monto} readOnly />
                  </td>
                  <td>
                    <input value={est.disciplina} readOnly />
                  </td>
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
          {mostrarBotones && (
            <>
              <button className="btn-descargar" onClick={handleAceptar}>
                Aceptar
              </button>
              <button className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            </>
          )}

          {mostrarDescargar && (
            <>
              <button className="btn-descargar" onClick={handleDescargarPDF}>
                Descargar PDF
              </button>
              <button className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdenPago;




