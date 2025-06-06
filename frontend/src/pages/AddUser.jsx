import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/AddUser.css";
import { sub } from "date-fns";
import FullScreenSpinner from "../components/FullScreenSpinner";
import SpinnerInsideButton from "../components/SpinnerInsideButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const apiUrl = import.meta.env.VITE_API_URL;

const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const [nombre, setNombre] = useState("");
  const [apellido, setApellidos] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const [cargando, setCargando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  
  
const [errores, setErrores] = useState({
    nombre: "",
    apellido: ""
  });


  useEffect(() => {
    if (id) {
      setCargando(true);
      const metodo = async () => {

        fetch(`${apiUrl}/especificousers/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);

            const usuario = {
              nombre: data.name,
              apellido: data.apellido,
              email: data.email
            }
            if (usuario) {
              setNombre(usuario.nombre);
              setApellidos(usuario.apellido);
              setEmail(usuario.email);
              console.log(usuario);
            }
          })
          .catch(error => console.error("Error al obtener colegios:", error))
          .finally(() => setCargando(false));
      }
      metodo();
    }
  }, [id]);


   const handleNombreChange = (e) => {
    const valor = e.target.value;
    setNombre(valor);

    const palabras = valor.trim().split(/\s+/);
    if (palabras.length > 2) {
      setErrores(prev => ({ ...prev, nombre: "Máximo en nombres." }));
    } else if (!palabras.every(p => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(p) && p.length <= 10)) {
      setErrores(prev => ({ ...prev, nombre: "Solo letras y hasta 10 caracteres por palabra." }));
    } else {
      setErrores(prev => ({ ...prev, nombre: "" }));
    }
  };

  const handleApellidoChange = (e) => {
    const valor = e.target.value;
    setApellidos(valor);

    const palabras = valor.trim().split(/\s+/);
    if (palabras.length > 2) {
      setErrores(prev => ({ ...prev, apellido: "Máximo en apellidos." }));
    } else if (!palabras.every(p => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(p) && p.length <= 10)) {
      setErrores(prev => ({ ...prev, apellido: "Solo letras y hasta 10 caracteres por palabra." }));
    } else {
      setErrores(prev => ({ ...prev, apellido: "" }));
    }
  };



  const handleCancelar = () => {
    navigate("/tablaUsuarios");
  };

  const handleGuardar = async () => {
    setSubiendo(true);

    if (!nombre || !apellido || !email) {
      alert("Debe llenar todos los campos");
      setSubiendo(false);
      return;
    }

    if(!id && !password) {
        alert("Debe llenar todos los campos");
        setSubiendo(false);
        return;
      }
    


     if (errores.nombre || errores.apellido) {
      alert("Corrige los errores antes de guardar.");
      setSubiendo(false);
      return;
    }



    if (id) {
      const dataToSend = {
        name: nombre,
        apellido: apellido,
        email: email,
      }
      try {
        const res = await fetch(`${apiUrl}/editausers/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error:", errorData);
          alert("Error al actualizar el usuario");
          return;
        }
      } catch (error) {
        console.error('Error al actualizar el usuario: ', error);
      } finally {
        setSubiendo(false);
      }
    } else {
      const dataToSend = {
        name: nombre,
        apellido: apellido,
        email: email,
        password: password
      }
      try {
        const res = await fetch(`${apiUrl}/guardausers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error:", errorData);
          alert("Error al guardar el usuario");
          return;
        }
      } catch (error) {
        console.error('Error al guardar el usuario: ', error);
      } finally {
        setSubiendo(false);
      }
    }

    navigate("/tablaUsuarios");
  };

  return (
    <div className="form-container">
      <div className="form-title">{id ? "Editar Usuario" : "Registrar Usuarios"}</div>
      <div className="form-body">
        {cargando ? <FullScreenSpinner /> : (
          <>

            <div className="form-group">
              <label>Nombre(s):</label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                disabled={cargando || subiendo}
              />
              {errores.nombre && <small className="error">{errores.nombre}</small>}
            </div>

            
            <div className="form-group">
              <label>Apellidos</label>
              <input
                type="text"
                value={apellido}
                onChange={handleApellidoChange}
                disabled={cargando || subiendo}
              />
              {errores.apellido && <small className="error">{errores.apellido}</small>}
            </div>


             {!id && (
              <div className="form-group">
                <label htmlFor="password">Contraseña *</label>
                <div className="password-wrapper">
                  <input
                    type={mostrarContraseña ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={cargando || subiendo}
                  />
                  <span
                    className="eye-icon-inside"
                    onClick={() => setMostrarContraseña(!mostrarContraseña)}
                    title={mostrarContraseña ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {mostrarContraseña ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            )}

            
            <div className="form-group">
              <label>Email :</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={cargando || subiendo} />
            </div>
          </>
        )}

        <div className="form-buttons">

          <button className="btn-agregar-addusr" onClick={handleGuardar}>
            {id ? "Editar" : "Guardar"}
          </button>
          <button className="btn-cancelar-addusr" onClick={handleCancelar}>Cancelar</button>

        </div>
      </div>
    </div>
  );
};

export default AddUser;
