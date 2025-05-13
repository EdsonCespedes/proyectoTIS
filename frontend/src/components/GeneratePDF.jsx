import React from "react";
import { jsPDF } from "jspdf";

const GeneratePDF = () => {
  const generatePdf = () => {
    const doc = new jsPDF();

    // Títulos
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("M.Sc Juan Perez Zurita", 14, 20);

    doc.setFontSize(12);
    doc.text("Organizador de la Olimpiada de Física 2025", 14, 30);
    doc.text("Universidad mayor de San Simón", 14, 40);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("LISTA DE POSTULANTES", 80, 55);

    doc.setFontSize(11);
    doc.setFont("times", "bold");
    doc.text("4to_Secundaria", 14, 65);

    // Encabezados de tabla
    const headers = ["Apellidos", "Nombre", "Colegio", "Departamento", "Provincia"];
    const data = [
      ["Zapata", "Lourdes", "Nueva vista", "Cochabamba", "Cercado"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];

    // Posición inicial
    let startY = 75;
    const startX = 14;
    const rowHeight = 10;
    const colWidths = [40, 30, 40, 40, 30];

    // Dibujar encabezados
    let x = startX;
    doc.setFontSize(10);
    headers.forEach((header, i) => {
      doc.rect(x, startY, colWidths[i], rowHeight); // dibuja celda
      doc.text(header, x + 2, startY + 7);
      x += colWidths[i];
    });

    // Dibujar filas de datos
    startY += rowHeight;
    data.forEach((row) => {
      let x = startX;
      row.forEach((cell, i) => {
        doc.rect(x, startY, colWidths[i], rowHeight);
        if (cell) doc.text(cell, x + 2, startY + 7);
        x += colWidths[i];
      });
      startY += rowHeight;
    });

    doc.save("Lista_de_Postulantes.pdf");
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={generatePdf} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Generar PDF sin AutoTable
      </button>
    </div>
  );
};

export default GeneratePDF;

