import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import { Routes, Route } from 'react-router-dom';
import EditColegios from "./pages/EditColegio";
import CrearConvForm from "./pages/CrearConvForm";
import DetalleConv from "./pages/DetalleConv";
import Inicio from "./views/Inicio";
import Disciplinas from "./views/Disciplinas";

import Convocatorias from "./views/Convocatorias";

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

//katy
import AddRoles from './pages/AddRoles';
import AddUser from './pages/AddUser';
import AsignarRoles from './pages/AsignarRoles';
import ListaRoles from './pages/ListaRoles';
import TablaUsuarios from './pages/TablaUsuarios';
import RolesTable from './pages/RolesTable';



import PrivateRoute from "./routes/PrivateRoute";
import { RutasInscripcion } from "./routes/RutasInscripcion";

import NoAutorizado from "./pages/NoAutorizado";


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

        <Route path="/convocatorias" element={<PrivateRoute allowedRoles={['tutor', 'admin']}><Convocatorias /></PrivateRoute>} />
        {RutasInscripcion()}

        <Route path="/Recibo" element={<Recibo />} />
        <Route path="/RegistroPago" element={<RegistroPago />} />      

        <Route path="/ordenes-pago" element={<PrivateRoute allowedRoles={['tutor', 'admin']}><Historial /></PrivateRoute>} />

        {/*pruebas */}
        <Route path="/registro-tutor" element={<PruebaRegister />} />
        <Route path="/login" element={<PruebaLogin />} />

        {/* Agregar la ruta para RegistrarColegio */}
        <Route path="/registro-colegio" element={<RegistrarColegio />} /> 

       {/* Katy */}
       <Route path="/addRoles" element={<AddRoles />} />
       <Route path="/tablaRoles" element={<RolesTable />} />
       <Route path="/addUser" element={<AddUser />} /> 
       <Route path="/tablaUsuarios" element={<TablaUsuarios />} /> 
       <Route path="/addUser/:id" element={<AddUser />} />
       <Route path="/asignarRoles" element={<AsignarRoles />} /> 
       <Route path="/listaRoles" element={<ListaRoles />} /> 
       
       
      
      
        <Route path="/no-autorizado" element={<NoAutorizado />} />
      </Routes>
    </div>
    
  )
}

export default App;
