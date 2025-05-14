import React from "react";
import { jsPDF } from "jspdf";

const PDFTutor = () => {
  const generatePdf = () => {
    const doc = new jsPDF();

    // Estilos generales
    doc.setFontSize(12);
    doc.setFont("times", "bold");

    // Encabezado
    doc.text("Tutor: M.Sc Juan Perez Zurita", 14, 20);
    doc.text("U.E: Buenas Nuevas", 14, 30);
    doc.text("Olimpiada de Física 2025", 14, 40);
    doc.text("Universidad mayor de San Simón", 14, 50);

    // Título
    doc.setFont("times", "normal");
    doc.text("LISTA DE POSTULANTES", 80, 65);

    // Coordenadas base de la tabla
    const startX = 14;
    const startY = 75;
    const rowHeight = 10;
    const colWidths = [35, 35, 30, 30, 40];

    // Cabeceras
    const headers = ['Apellidos', 'Nombre', 'Área', 'Nivel', 'Monto de pago (Bs)'];

    // Dibujar encabezado
    let currentX = startX;
    headers.forEach((header, index) => {
      doc.setFont("times", "bold");
      doc.rect(currentX, startY, colWidths[index], rowHeight); // celda
      doc.text(header, currentX + 2, startY + 7);
      currentX += colWidths[index];
    });

    // Datos
    const data = [
      ['Zapata', 'Lourdes', 'Física', '3 primaria', '15'],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];

    // Dibujar filas de datos
    data.forEach((row, rowIndex) => {
      let x = startX;
      const y = startY + rowHeight * (rowIndex + 1);
      row.forEach((cell, colIndex) => {
        doc.setFont("times", "normal");
        doc.rect(x, y, colWidths[colIndex], rowHeight); // celda
        doc.text(cell.toString(), x + 2, y + 7);
        x += colWidths[colIndex];
      });
    });

    // Guardar PDF
    doc.save("Lista_de_Postulantes_Fisica_2025.pdf");
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={generatePdf} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Generar PDF Física 2025
      </button>
    </div>
  );
};

export default PDFTutor;
