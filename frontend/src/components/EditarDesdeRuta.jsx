import { useLocation, useNavigate } from 'react-router-dom';
import EditarEstudiante from './EditarEstudiante';

const EditarDesdeRuta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener el estudiante de location.state
  const estudiante = location.state?.estudiante;

  // Verificar si el estudiante existe
  if (!estudiante) {
    return <p>⚠️ No se proporcionó un estudiante para editar.</p>;
  }

  // Definir la función de guardado
  const handleGuardarEstudiante = (estudianteEditado) => {
    console.log("Estudiante guardado:", estudianteEditado);
    // Aquí haces lo que sea necesario, como hacer un POST o actualizar en el estado global
    navigate(-1); // Volver atrás después de guardar
  };

  return (
    <EditarEstudiante
      estudiante={estudiante}
      onGuardar={handleGuardarEstudiante}
    />
  );
};

export default EditarDesdeRuta;
