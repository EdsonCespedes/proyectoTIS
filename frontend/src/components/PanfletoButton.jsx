import { generarPanfletoPDF } from '../utils/generarPanfleto';

function PanfletoButton({ convocatoria }) {
  const handleClick = () => {
    generarPanfletoPDF(convocatoria);
  };

  return (
    <button onClick={handleClick}>
      Areas Disponibles
    </button>
  );
}

export default PanfletoButton;