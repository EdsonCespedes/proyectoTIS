import React, { useState } from 'react';
import './styles/RecuperarContrasena.css';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [verificado, setVerificado] = useState(false);
  const [token, setToken] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mostrar, setMostrar] = useState(false);

  const handleVerificar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Correo enviado. Revisa tu bandeja de entrada.');
        setVerificado(true);
      } else {
        alert(data.message || 'Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error en la verificación:', error);
    }
  };

  const handleCambio = async (e) => {
    e.preventDefault();
    if (nueva !== confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: nueva, password_confirmation: confirmar }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Contraseña actualizada correctamente');
        setVerificado(false);
        setEmail('');
        setNueva('');
        setConfirmar('');
        setToken('');
      } else {
        alert(data.message || 'Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error en el cambio de contraseña:', error);
    }
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
            <p>Se enviará un enlace de restablecimiento a este email</p>
            <button type="submit">Enviar</button>
          </form>
        </>
      ) : (
        <>
          <h2>Restablecer contraseña</h2>
          <form onSubmit={handleCambio} className="recuperar-form">
            <label>Token recibido por correo *</label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <label>Nueva contraseña *</label>
            <div className="input-con-icono">
              <input
                type={mostrar ? 'text' : 'password'}
                required
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
              />
              <span onClick={() => setMostrar(!mostrar)}>👁️</span>
            </div>
            <label>Confirmar nueva contraseña *</label>
            <div className="input-con-icono">
              <input
                type={mostrar ? 'text' : 'password'}
                required
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
              />
              <span onClick={() => setMostrar(!mostrar)}>👁️</span>
            </div>
            <button type="submit">Restablecer contraseña</button>
          </form>
        </>
      )}
    </div>
  );
};

export default RecuperarContrasena;

