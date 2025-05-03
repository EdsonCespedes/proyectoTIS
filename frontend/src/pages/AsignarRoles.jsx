import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AsignarRoles.css";

const AsignarRoles = () => {
  const [filas, setFilas] = useState([{ nombre: "", convocatoria: "", rol: "" }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nombreNoEncontrado, setNombreNoEncontrado] = useState(false);
  const navigate = useNavigate();

  const convocatorias = [
    { id: 1, nombre: "Convocatoria 1" },
    { id: 2, nombre: "Convocatoria 2" }
  ];

  const roles = [
    { id: "aux", nombre: "Auxiliar" },
    { id: "op", nombre: "Operador" },
    { id: "admin", nombre: "Administrador" },
    { id: "eval", nombre: "Evaluador" }
  ];

  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const rolEditar = JSON.parse(localStorage.getItem("rolEditar"));
    if (rolEditar) {
      setFilas([rolEditar]);
      setSearchTerm(rolEditar.nombre);
      localStorage.removeItem("rolEditar");
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosFormateados = usuariosGuardados.map((u) => ({
      id: u.id,
      nombre: u.nombre
    }));

    const personasFijas = [
      { id: 1, nombre: "Carlos Pérez" },
      { id: 2, nombre: "Ana García" },
      { id: 3, nombre: "José López" },
      { id: 4, nombre: "Maria González" }
    ];

    setPersonas([...personasFijas, ...usuariosFormateados]);
  }, []);

  const handleNombre = (e) => {
    const nombre = e.target.value;
    setSearchTerm(nombre);
    const nuevasFilas = [...filas];
    nuevasFilas[0].nombre = nombre;
    setFilas(nuevasFilas);

    const isNombreExistente = personas.some(persona =>
      persona.nombre.toLowerCase() === nombre.toLowerCase()
    );
    setNombreNoEncontrado(!isNombreExistente);
  };

  const handleChange = (index, field, value) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index][field] = value;
    setFilas(nuevasFilas);
  };

  const guardarDatos = () => {
    const datosGuardados = JSON.parse(localStorage.getItem("rolesAsignados")) || [];

    const nuevosDatos = datosGuardados.map((item) =>
      item.nombre === filas[0].nombre ? filas[0] : item
    );

    const existe = datosGuardados.some((item) => item.nombre === filas[0].nombre);
    const actualizados = existe ? nuevosDatos : [...datosGuardados, ...filas];

    localStorage.setItem("rolesAsignados", JSON.stringify(actualizados));
    alert("Los datos han sido guardados.");
    navigate("/listaRoles");
  };

  return (
    <div className="roles-container">
      <div className="roles-title">Asignar Roles</div>

      <div className="roles-search">
        <input
          type="text"
          placeholder="🔍 Buscar persona por nombre"
          value={searchTerm}
          onChange={handleNombre}
        />
      </div>

      {!nombreNoEncontrado && (
        <table className="roles-table">
          <thead>
            <tr>
              <th>Persona</th>
              <th>Convocatoria</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={fila.nombre}
                    onChange={(e) => handleChange(index, "nombre", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    {personas.map((persona) => (
                      <option key={persona.id} value={persona.nombre}>
                        {persona.nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={fila.convocatoria}
                    onChange={(e) => handleChange(index, "convocatoria", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    {convocatorias.map((c) => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={fila.rol}
                    onChange={(e) => handleChange(index, "rol", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>{r.nombre}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {nombreNoEncontrado && (
        <div className="mensaje-no-encontrado">No se encontró registrado.</div>
      )}

      <div className="roles-buttons">
        {!nombreNoEncontrado && (
          <button className="btn-guardar" onClick={guardarDatos}>💾</button>
        )}
        {nombreNoEncontrado && (
          <button className="btn-registrar">Registrar</button>
        )}
      </div>
    </div>
  );
};

export default AsignarRoles;
