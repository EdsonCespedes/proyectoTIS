import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import Header from "./layout/Header";
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
      </Routes>
    </div>
    
  )
}

export default App;
