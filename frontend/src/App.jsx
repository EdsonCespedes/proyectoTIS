import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import Home from "./views/Home";
import Header from "./layout/Header";
import { Routes, Route } from 'react-router-dom';
import EditColegios from "./pages/EditColegio";
import DetalleInscripcion from "./pages/DetalleInscripcion";

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/colegios" element={<GestionColegios />} />
        <Route path="/registro-colegios" element={<AddColegios />} />
        <Route path="/edit-colegios" element={<EditColegios />} />
        <Route path="/detalle-inscripcion" element={<DetalleInscripcion/>} />
      </Routes>
    </div>
    
  )
}

export default App
