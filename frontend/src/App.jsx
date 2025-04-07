import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import EditColegios from "./pages/EditColegio";
import Header from "./layout/Header";
import { Routes, Route } from 'react-router-dom';
import CrearConvForm from "./pages/CrearConvForm";
import DetalleConv from "./pages/DetalleConv";
import Inicio from "./views/Inicio";
import Disciplinas from "./views/Disciplinas";
import Convocatorias from "./views/Convocatorias";
import TipoInscripcion from "./pages/TipoInscripcion";
import InscripcionManual from "./pages/InscripcionManual";
import Registro from "./components/Registro";
import EditarDesdeRuta from './components/EditarDesdeRuta';

import Niveles from "./pages/Niveles";



function App() {

  
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/colegios" element={<GestionColegios />} />
        <Route path="/registro-colegios" element={<AddColegios />} />
        <Route path="/edit-colegios" element={<EditColegios />} />
        <Route path="/crear-convocatoria" element={<CrearConvForm/>} />
        <Route path="/detalle-convocatoria" element={<DetalleConv />} />
        <Route path="/disciplinas" element={<Disciplinas/>} />
        <Route path="/convocatorias" element={<Convocatorias />} />
        <Route path="/convocatoria/:idConvocatoria/tipo-inscripcion" element={<TipoInscripcion />} />
        <Route path="/convocatoria/:idConvocatoria/inscripcion-manual" element={<InscripcionManual />} />
<<<<<<< HEAD

        <Route path="/editar" element={<EditarDesdeRuta />} />
        <Route path="/nivel" element={<Niveles />} />

=======
        <Route path="/nivel" element={<Niveles />} />
>>>>>>> 407c01855f01ed9f35c681dd7555977822c4ec2f
      </Routes>
    </div>
  )
}

export default App;
