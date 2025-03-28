import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import Header from "./layout/Header";
import { Routes, Route } from 'react-router-dom';
import EditColegios from "./pages/EditColegio";
import DetalleInscripcion from "./pages/DetalleInscripcion";

import Inicio from "./pages/Inicio";
import Disciplinas from "./pages/Disciplinas";
import Registro from "./pages/Registro";

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/colegios" element={<GestionColegios />} />
        <Route path="/registro-colegios" element={<AddColegios />} />
        <Route path="/edit-colegios" element={<EditColegios />} />
        <Route path="/detalle-inscripcion" element={<DetalleInscripcion />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/registro-postulante" element={<Registro/>} />
      </Routes>
    </div>
    
  )
}

export default App
