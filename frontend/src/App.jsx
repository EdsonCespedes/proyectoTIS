import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import { Routes, Route } from 'react-router-dom';
import EditColegios from "./pages/EditColegio";
// import DetalleInscripcion from "./components/DetalleInscripcion";
import CrearConvForm from "./pages/CrearConvForm";
import DetalleConv from "./pages/DetalleConv";
import Inicio from "./views/Inicio";
import Disciplinas from "./views/Disciplinas";
// import Registro from "./pages/Registro";

import Convocatorias from "./views/Convocatorias";
import TipoInscripcion from "./pages/TipoInscripcion";
import InscripcionManual from "./pages/InscripcionManual";
import Registro from "./components/Recibo";
//import EditarDesdeRuta from './components/EditarDesdeRuta';

import OrdenPago from "./components/OrdenPago";
import Recibo from "./components/Recibo";
import RegistroPago from "./components/RegistroPago";

//Excel
import InscripcionExcel from "./pages/InscripcionExcel";

import Historial from "./components/Historial";
import GeneratePDF from "./components/GeneratePDF";
import PDFTutor from "./components/PDFTutor";
import Categoria from "./pages/Categoria";

import PruebaRegister from './pages/PruebaRegister';
import PruebaLogin from './pages/PruebaLogin';
import RegistrarColegio from './pages/RegistrarColegio';

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/colegios" element={<GestionColegios />} />
        <Route path="/registro-colegios" element={<AddColegios />} />
        <Route path="/edit-colegios" element={<EditColegios />} />
        {/* <Route path="/detalle-inscripcion" element={<DetalleInscripcion/>} /> */}
        <Route path="/crear-convocatoria" element={<CrearConvForm/>} />
        <Route path="/detalle-convocatoria" element={<DetalleConv />} />
        <Route path="/disciplinas" element={<Disciplinas/>} />
        {/* <Route path="/registro-postulante" element={<Registro />} /> */}

        <Route path="/convocatorias" element={<Convocatorias />} />
        <Route path="/convocatoria/:idConvocatoria/tipo-inscripcion" element={<TipoInscripcion />} />
        <Route path="/convocatoria/:idConvocatoria/inscripcion-manual" element={<InscripcionManual />} />
        {/* <Route path="/editar" element={<EditarDesdeRuta />} /> */}
        <Route path="/ordenPago" element={<OrdenPago />} />
        <Route path="/convocatoria/:idConvocatoria/ordenPago" element={<OrdenPago />} />
        <Route path="/Recibo" element={<Recibo />} />
        <Route path="/RegistroPago" element={<RegistroPago />} />
        <Route path="/pdf" element={<GeneratePDF/>} />
        <Route path="/pdftutor" element={<PDFTutor/>} />
        <Route path="/categorias" element={<Categoria />} />
        {/* Excel */}
        <Route path="/convocatoria/:idConvocatoria/inscripcion-excel" element={<InscripcionExcel />} />

        <Route path="/ordenes-pago" element={<Historial />} />

        {/*pruebas */}
        <Route path="/registro-tutor" element={<PruebaRegister />} />
        <Route path="/login" element={<PruebaLogin />} />
        <Route path="/Navbaradmin" element={<Navbar />} />

        {/* Agregar la ruta para RegistrarColegio */}
        <Route path="/registro-colegio" element={<RegistrarColegio />} /> 

        
      </Routes>
    </div>
    
  )
}

export default App;
