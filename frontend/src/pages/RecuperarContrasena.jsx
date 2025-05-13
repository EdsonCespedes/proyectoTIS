import React, { useState } from 'react';
import './styles/RecuperarContrasena.css';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [verificado, setVerificado] = useState(false);
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mostrar, setMostrar] = useState(false);

  const handleVerificar = (e) => {
    e.preventDefault();
    // Aquí va la lógica de verificación de email
    setVerificado(true);
  };

  const handleCambio = (e) => {
    e.preventDefault();
    if (nueva !== confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí va la lógica para guardar la nueva contraseña
    alert("Contraseña actualizada correctamente");
  };

  return (
    <div className="recuperar-container">
      {!verificado ? (
        <>
          <h2>¿Has olvidado la contraseña?</h2>
          <form onSubmit={handleVerificar} className="recuperar-form">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Se verificará este email para restablecer su contraseña</p>
            <button type="submit">Verificar</button>
          </form>
        </>
      ) : (
        <>
          <h2>Cambiar contraseña</h2>
          <form onSubmit={handleCambio} className="recuperar-form">
            <label>Contraseña nueva*</label>
            <div className="input-con-icono">
              <input
                type={mostrar ? "text" : "password"}
                value={nueva}
                required
                onChange={(e) => setNueva(e.target.value)}
              />
              <span onClick={() => setMostrar(!mostrar)}>👁️</span>
            </div>

            <label>Confirmar contraseña*</label>
            <div className="input-con-icono">
              <input type={mostrar ? "text" : "password"} value={confirmar} required  onChange={(e) => setConfirmar(e.target.value)}/>
              <span onClick={() => setMostrar(!mostrar)}>👁️</span>
            </div>

            <button type="submit">Confirmar cambio</button>
          </form>
        </>
      )}
    </div>
  );
};

export default RecuperarContrasena;

