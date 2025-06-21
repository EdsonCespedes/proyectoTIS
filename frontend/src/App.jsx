import GestionColegios from "./pages/GestionColegio";
import AddColegios from "./pages/AddColegios";
import Header from "./layout/Header";
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import EditColegios from "./pages/EditColegio";
import CrearConvForm from "./pages/CrearConvForm";
import DetalleConv from "./pages/DetalleConv";
import Inicio from "./views/Inicio";
import DetalleEstructura from "./pages/DetalleEstructura"; // o "./views/DetalleEstructura" según tu estructura

import Convocatorias from "./views/Convocatorias";

import Recibo from "./components/Recibo";
import RegistroPago from "./components/RegistroPago";

//Excel
import InscripcionExcel from "./pages/InscripcionExcel";

import Historial from "./components/Historial";
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
import RecuperarContrasena from './pages/RecuperarContrasena';
import TablaNotificaciones from './pages/TablaNotificaciones';
import Nosotros from './pages/nosotros';

import { ConvocatoriaProvider, ConvocatoriaContext } from './context/ConvocatoriaContext';
import RequirePermission from './routes/RequirePermission';
import { useAuth } from "./context/AuthContext"
//import AppRoutes from "./AppRoutes"

import PrivateRoute from "./routes/PrivateRoute";
import { RutasInscripcion } from "./routes/RutasInscripcion";

import NoAutorizado from "./pages/NoAutorizado";

import EditConvForm from "./pages/EditConvForm";
import CategoriaEdit from "./pages/CategoriaEdit";
import ReportePostulantes from "./pages/ReportePostulantes";
import Footer from "./layout/Footer";

import LogsTablePrueba from "./pages/LogsTablePrueba";

import SeleccionarRol from "./pages/SeleccionarRol"

function SeleccionConvocatoria() {
  const { cambiarConvocatoria } = useContext(ConvocatoriaContext);
  const navigate = useNavigate();
}


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/seleccionar-rol" element={<SeleccionarRol />} />

      {/* Gestión de colegios libre */}
      <Route path="/colegios" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Colegios"]}><GestionColegios /></PrivateRoute>} />
      <Route path="/registro-colegios" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Colegios"]}><AddColegios /></PrivateRoute>} />
      <Route path="/edit-colegios" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Colegios"]}><EditColegios /></PrivateRoute>} />

      {/* Convocatorias */}
      <Route path="/crear-convocatoria" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Convocatorias"]}><CrearConvForm /></PrivateRoute>} />
      <Route path="/editar-convocatoria/:id" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Convocatorias"]}><EditConvForm /></PrivateRoute>} />
      <Route path="/detalle-convocatoria" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Convocatorias"]}><DetalleConv /></PrivateRoute>} />
      <Route path="/area" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Convocatorias"]}><Categoria /></PrivateRoute>} />
      <Route path="/editar-convocatoria/:id/edit-area" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Convocatorias"]}><CategoriaEdit /></PrivateRoute>} />
      <Route path="/crear-convocatoria/:id/tablaNotif" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Convocatorias"]}><TablaNotificaciones /></PrivateRoute>} />
      <Route path="/editar-convocatoria/:id/tablaNotif" element={<PrivateRoute allowedRoles={["admin"]} allowedPermissions={["Gestion de Convocatorias"]}><TablaNotificaciones /></PrivateRoute>} />

      {/* Rutas con rol tutor|admin */}
      <Route
        path="/convocatorias"
        element={
          <PrivateRoute allowedRoles={["tutor", "admin"]}>
            <Convocatorias />
          </PrivateRoute>
        }
      />
<Route
  path="/detalle-estructura/:id"
  element={
    <PrivateRoute allowedRoles={["tutor", "admin"]}>
      <DetalleEstructura />
    </PrivateRoute>
  }
/>

      {/* Inscripciones */}
      {RutasInscripcion()}

      {/* Recibos y pagos */}
      <Route path="/Recibo" element={<PrivateRoute allowedRoles={["tutor", "admin"]}><Recibo /></PrivateRoute>} />
      <Route path="/RegistroPago" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion de Ordenes de Pago"]}><RegistroPago /></PrivateRoute>} />
      <Route
        path="/ordenes-pago"
        element={
          <PrivateRoute allowedRoles={["tutor", "admin"]}>
            <Historial />
          </PrivateRoute>
        }
      />

      {/* Selección de convocatoria */}
      <Route
        path="/seleccionar-convocatoria"
        element={
          <PrivateRoute allowedRoles={["tutor", "admin"]}>
            <SeleccionConvocatoria />
          </PrivateRoute>
        }
      />

      {/* Ejemplo: sólo si tiene permiso `ver_estudiantes` */}
      <Route
        path="/gestion-estudiantes"
        element={
          <PrivateRoute allowedRoles={["tutor", "admin"]}>
            <RequirePermission permiso="ver_estudiantes">
              <GestionColegios />
            </RequirePermission>
          </PrivateRoute>
        }
      />

      {/* Autenticación de prueba */}
      <Route path="/registro-tutor" element={<PruebaRegister />} />
      <Route path="/login" element={<PruebaLogin />} />

      {/* Registro colegio */}
      <Route path="/registro-colegio" element={<RegistrarColegio />} />

      {/* Roles dinámicos */}
      <Route path="/addRoles" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Asignacion de Roles"]}><AddRoles /></PrivateRoute>} />
      <Route path="/editRoles/:id" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Asignacion de Roles"]}><AddRoles /></PrivateRoute>} />
      <Route path="/tablaRoles" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Asignacion de Roles"]}><RolesTable /></PrivateRoute>} />

      {/* Usuarios */}
      <Route path="/addUser" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Registro de Usuarios"]}><AddUser /></PrivateRoute>} />
      <Route path="/addUser/:id" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Registro de Usuarios"]}><AddUser /></PrivateRoute>} />
      <Route path="/tablaUsuarios" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Registro de Usuarios"]}><TablaUsuarios /></PrivateRoute>} />
      <Route path="/asignarRoles" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Asignacion de Roles"]}><AsignarRoles /></PrivateRoute>} />
      <Route path="/listaRoles" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Gestion y Asignacion de Roles"]}><ListaRoles /></PrivateRoute>} />

      {/* Recuperación y notificaciones */}
      <Route path="/recuperacionC" element={<RecuperarContrasena />} />
      
      {/* No autorizado */}
      <Route path="/no-autorizado" element={<NoAutorizado />} />

      {/* Fallback */}
      <Route path="*" element={<NoAutorizado />} />

      {/* Reportes */}
      

      <Route path="/logs" element={<PrivateRoute allowedRoles={["admin"]}  allowedPermissions={["Visualizacion de Logs"]}><LogsTablePrueba /></PrivateRoute>} />
      <Route path="/reportes" element={<PrivateRoute allowedRoles={["admin"]}   allowedPermissions={["Hacer Reportes"]}><ReportePostulantes /></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  const { user } = useAuth()
  console.log("User desde useAuth:", user); // <-- Aquí
  return (
    //<BrowserRouter>
    <ConvocatoriaProvider>
      <div className="app-container">
        <Header />
        <div className="content-wrap">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </ConvocatoriaProvider>
    //</BrowserRouter>
  );
}


// function App() {

//   return (
//     <div>
//       <Header/>
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<Inicio/>} />

//         <Route path="/colegios" element={<GestionColegios />} />
//         <Route path="/registro-colegios" element={<AddColegios />} />
//         <Route path="/edit-colegios" element={<EditColegios />} />

//         <Route path="/crear-convocatoria" element={<CrearConvForm/>} />
//         <Route path="/editar-convocatoria/:id" element={<EditConvForm/>} />
//         <Route path="/area" element={<Categoria/>} />
//         <Route path="/editar-convocatoria/:id/edit-area" element={<CategoriaEdit/>} />
//         <Route path="/detalle-convocatoria" element={<DetalleConv />} />

//         <Route path="/convocatorias" element={<PrivateRoute allowedRoles={['tutor', 'admin']}><Convocatorias /></PrivateRoute>} />
//         {RutasInscripcion()}

//         <Route path="/Recibo" element={<Recibo />} />
//         <Route path="/RegistroPago" element={<RegistroPago />} />      

//         <Route path="/ordenes-pago" element={<PrivateRoute allowedRoles={['tutor', 'admin']}><Historial /></PrivateRoute>} />

//         {/*pruebas */}
//         <Route path="/registro-tutor" element={<PruebaRegister />} />
//         <Route path="/login" element={<PruebaLogin />} />

//         {/* Agregar la ruta para RegistrarColegio */}
//         <Route path="/registro-colegio" element={<RegistrarColegio />} /> 

//        {/* Katy */}
//        <Route path="/addRoles" element={<AddRoles />} />
//        <Route path="/editRoles/:id" element={<AddRoles />} />

//        <Route path="/tablaRoles" element={<RolesTable />} />
//        <Route path="/addUser" element={<AddUser />} /> 
//        <Route path="/tablaUsuarios" element={<TablaUsuarios />} /> 
//        <Route path="/addUser/:id" element={<AddUser />} />
//        <Route path="/asignarRoles" element={<AsignarRoles />} /> 
//        <Route path="/listaRoles" element={<ListaRoles />} /> 
//        <Route path="/recuperacionC" element={<RecuperarContrasena />} />
//        <Route path="/tablaNotif" element={<TablaNotificaciones />} />

//         <Route path="/no-autorizado" element={<NoAutorizado />} />
//       </Routes>
//       </div>

//   )
// }

export default App;
