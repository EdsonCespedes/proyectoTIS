import React, { useState } from "react";
import "./styles/ordenPago.css";
import ImageUpload from "../components/ImageUpload";

const OrdenPago = () => {
    const [formData, setFormData] = useState({
        imagenPortada: null,
        
      });
    const [error, setError] = useState(""); // Estado para mostrar errores
    const estudiantes = [
      { nombre: "Katerin Marza Caro", monto: "100,00", disciplina: "Matrícula Semestre 1" },
      { nombre: "Juan Pérez", monto: "150,00", disciplina: "Matrícula Semestre 2" },
      { nombre: "María González", monto: "120,00", disciplina: "Matrícula Semestre 1" }
    ];
  
    const montoTotal = estudiantes.reduce((total, est) => {
      const monto = parseFloat(est.monto.replace(",", "."));
      return total + (isNaN(monto) ? 0 : monto);
    }, 0).toFixed(2).replace(".", ",");

    const handleFileChange = (file) => {
        setFormData({ ...formData, imagenPortada: file });
      };
  
    return (
      <div className="contenedor-orden">
        <div className="seccion-container">
          <h1>Órden de Pago </h1>
  
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
          <div className="botones">
            <button className="btn-descargar">Descargar PDF</button>
            <button className="btn-cancelar">Cancelar</button>
          </div>
          
          <div className="seccion-container">
          <label>Suba su comprobante de Pago:</label>
            <ImageUpload onFileSelect={handleFileChange} />
            {error && <p className="error-message">{error}</p>}
            </div>
            <div className="botones">
            <button className="btn-descargar">Subir</button>
          </div>
      </div>
      </div>
    );
  };
  
  export default OrdenPago;