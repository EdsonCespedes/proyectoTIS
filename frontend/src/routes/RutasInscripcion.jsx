import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import TipoInscripcion from '../pages/TipoInscripcion';
import InscripcionManual from '../pages/InscripcionManual';
import InscripcionExcel from '../pages/InscripcionExcel';
import OrdenPago from '../components/OrdenPago';

export const RutasInscripcion = () => (
  <>
    <Route
      path="/convocatoria/:idConvocatoria/tipo-inscripcion"
      element={
        <PrivateRoute allowedRoles={['tutor', 'admin']}>
          <TipoInscripcion />
        </PrivateRoute>
      }
    />
    <Route
      path="/convocatoria/:idConvocatoria/inscripcion-manual"
      element={
        <PrivateRoute allowedRoles={['tutor', 'admin']}>
          <InscripcionManual />
        </PrivateRoute>
      }
    />
    <Route
      path="/convocatoria/:idConvocatoria/inscripcion-excel"
      element={
        <PrivateRoute allowedRoles={['tutor', 'admin']}>
          <InscripcionExcel />
        </PrivateRoute>
      }
    />
    <Route
      path="/ordenPago"
      element={
        <PrivateRoute allowedRoles={['tutor', 'admin']}>
          <OrdenPago />
        </PrivateRoute>
      }
    />
    <Route
      path="/convocatoria/:idConvocatoria/ordenPago"
      element={
        <PrivateRoute allowedRoles={['tutor', 'admin']}>
          <OrdenPago />
        </PrivateRoute>
      }
    />
  </>
);
