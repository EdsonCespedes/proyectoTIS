import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Importa jsPDF
import "./styles/OrdenPago.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const OrdenPago = () => {
  const [mostrarDescargar, setMostrarDescargar] = useState(false);
  const [mostrarBotones, setMostrarBotones] = useState(true);

  const [salirActivo, setSalirActivo] = useState(false);

  const navigate = useNavigate();

  const { idConvocatoria } = useParams();
  const location = useLocation();
  const estudiantes = location.state?.estudiantes;
  const from = location.state?.from || "default";
  console.log(estudiantes);


  // [
  //   { nombre: "Katerin Marza Caro", monto: "100,00", disciplina: "Fisica" },
  //   { nombre: "Juan Pérez", monto: "150,00", disciplina: "Matematica" },
  //   { nombre: "María González", monto: "120,00", disciplina: "Fisica" }
  // ];

  // const montoTotal = estudiantes
  //   .reduce((total, est) => {
  //     const monto = parseFloat(est.monto.replace(",", "."));
  //     return total + (isNaN(monto) ? 0 : monto);
  //   }, 0)
  //   .toFixed(2)
  //   .replace(".", ",");


  const montoTotal = estudiantes
    .reduce((total, est) => {
      const sumaCategorias = est.categorias?.reduce((sum, cat) => sum + (parseFloat(cat.monto) || 0), 0);
      return total + sumaCategorias;
    }, 0)
    .toFixed(2)
    .replace(".", ",");

  const handleAceptar = () => {
    setMostrarDescargar(true);
    setMostrarBotones(false);
    handleSubmit();
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

    doc.text("Area", 150, 70);


    doc.line(10, 75, 200, 75);

    let yPosition = 80;
    estudiantes.forEach((est) => {
      doc.text(est.nombrePost + " " + est.apellidoPost, 20, yPosition);
      // doc.text(est.monto, 100, yPosition);
      doc.text(est.categorias.reduce((acc, cat) => acc + cat.monto, 0).toString(), 100, yPosition);
      // doc.text(est.disciplina, 150, yPosition);
      doc.text(est.areas.map(area => area.tituloArea).join(" - "), 150, yPosition);
      yPosition += 10;
    });

    doc.setFontSize(14);
    doc.text(`Monto Total: ${montoTotal}`, 20, yPosition + 10);
    doc.save("Orden_Pago.pdf");

    setSalirActivo(true);
  };

  const handleSubmit = async () => {
    if (!estudiantes || estudiantes.length === 0) {
      alert("No hay estudiantes para registrar.");
      return;
    }

    let hayErrores = false;

    for (let i = 0; i < estudiantes.length; i++) {
      const estudianteOriginal = estudiantes[i];

      const camposRequeridos = [
        "nombrePost", "apellidoPost", "carnet", "correoPost", "fechaNaciPost",
        "idCurso", "idColegio", "departamento", "provincia",
        "tutor.nombreTutor", "tutor.apellidoTutor", "tutor.telefonoTutor",
        "tutor.correoTutor", "tutor.fechaNaciTutor"
      ];

      const camposVacios = camposRequeridos.filter((campo) => {
        if (campo.includes(".")) {
          const [parent, child] = campo.split(".");
          return !estudianteOriginal[parent]?.[child];
        } else {
          return !estudianteOriginal[campo];
        }
      });

      if (camposVacios.length > 0 || estudianteOriginal.areas.length === 0 || estudianteOriginal.categorias.length === 0) {
        console.warn(`Estudiante ${i + 1} tiene campos vacíos:`, camposVacios);
        hayErrores = true;
        continue;
      }

      // Excluir campos innecesarios
      const { departamentoColegio, provinciaColegio, ...estudiante } = estudianteOriginal;

      const postulante = {
        ...estudiante,
        carnet: String(estudiante.carnet ?? ""),
        telefonoPost: String(estudiante.telefonoPost ?? ""),
        idCurso: String(estudiante.idCurso ?? ""),
        idColegio: String(estudiante.idColegio ?? ""),
        fechaNaciPost: estudiante.fechaNaciPost,
        tutor: {
          ...estudiante.tutor,
          telefonoTutor: String(estudiante.tutor?.telefonoTutor ?? ""),
          //fechaNaciTutor: parseFecha(estudiante.tutor?.fechaNaciTutor),
        }
      };
      
      console.log(postulante);
      

      try {
        const response = await fetch('http://localhost:8000/api/registrar-postulante', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postulante)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error al registrar estudiante ${i + 1}:`, errorText);
          hayErrores = true;
        } else {
          console.log(`Estudiante ${i + 1} registrado con éxito.`);
        }

      } catch (error) {
        console.error(`Error de red al registrar estudiante ${i + 1}:`, error);
        hayErrores = true;
      }
    }

    if (hayErrores) {
      alert("Algunos estudiantes no se pudieron registrar. Revisa la consola para más detalles.");
    } else {
      alert("Todos los estudiantes fueron registrados correctamente.");
    }
  };

  const handleCancelar = () => {
    if (from === "Manual") {
      navigate(`/convocatoria/${idConvocatoria}/inscripcion-manual`, {
        state: { estudiantes },
      });
    } else if (from === "Excel") {
      navigate(`/convocatoria/${idConvocatoria}/inscripcion-excel`, {
        state: { estudiantes },
      });
    } else {
      navigate(-1); // por si acaso
    }
  }

  const handleSalir = () => {
    navigate("/");
  }

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
                    {/* <input value={est.nombre} readOnly /> */}
                    <input value={est.nombrePost} readOnly />
                  </td>
                  <td className="monto">
                    {/* <input value={est.monto} readOnly /> */}
                    <input value={est.categorias.reduce((acc, cat) => acc + parseFloat(cat.monto), 0).toFixed(2)} readOnly />
                  </td>
                  <td>
                    {/* <input value={est.disciplina} readOnly /> */}
                    <input value={est.areas.map(area => area.tituloArea).join(" - ")} readOnly />
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
              <button className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
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

          <button onClick={handleSalir} disabled={!salirActivo}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdenPago;


