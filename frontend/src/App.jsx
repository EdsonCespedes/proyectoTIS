import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import Header from "./layout/Header";
import { Routes, Route } from 'react-router-dom';
import EditColegios from "./pages/EditColegio";
import DetalleInscripcion from "./pages/DetalleInscripcion";
import CrearConvForm from "./pages/CrearConvForm";
import DetalleConv from "./pages/DetalleConv";

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/colegios" element={<GestionColegios />} />
        <Route path="/registro-colegios" element={<AddColegios />} />
        <Route path="/edit-colegios" element={<EditColegios />} />
        <Route path="/detalle-inscripcion" element={<DetalleInscripcion/>} />
        <Route path="/convocatoria" element={<CrearConvForm/>} />
        <Route path="/detalle-convocatoria" element={<DetalleConv/>} />
      </Routes>
    </div>
    
  )
}

export default App;
