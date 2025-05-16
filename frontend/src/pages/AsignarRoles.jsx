// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// 

// const AsignarRoles = () => {
//   //const [filas, setFilas] = useState([{ nombre: "", convocatoria: "", rol: "" }]);
//   const location = useLocation();

//   // const [convocatoria, setConvocatoria] = useState({
//   //   idConvocatoria: "",
//   //   tituloConvocatoria: "",
//   //   descripcion: "",
//   //   fechaPublicacion: "",
//   //   fechaInicioInsc: "",
//   //   fechaFinInsc: "",
//   //   portada: "",
//   //   habilitada: true,
//   //   fechaInicioOlimp: "",
//   //   fechaFinOlimp: "",
//   //   maximoPostPorArea: 0,
//   //   created_at: null,
//   //   updated_at: null,
//   //   eliminado: false
//   // });

//   // useEffect(() => {
//   //   if (idConvocatoria) {
//   //     const fetchConv = async () => {
//   //       try {
//   //         const res = await fetch(`http://localhost:8000/api/veridconvocatorias/${idConvocatoria}`);
//   //         if (!res.ok) throw new Error("Error al obtener la convocatoria");
//   //         const data = await res.json();
//   //         const { areas, portada, ...conv } = data;
//   //         setConvocatoria(conv);
//   //       } catch (error) {
//   //         console.error("Error cargando permisos:", error);
//   //       }
//   //     };
//   //     fetchConv();
//   //   }
//   // }, []);


//   const [nombre, setNombre] = useState(location.state?.rol.name || "");
//   const [role, setRole] = useState(location.state?.rol.role || "");
//   const [userId, setUserId] = useState(location.state?.rol.user_id || "");
//   const [idConvocatoria, setIdConvocatoria] = useState(location.state?.idConvocatoria || null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [nombreNoEncontrado, setNombreNoEncontrado] = useState(false);
//   const navigate = useNavigate();

//   // const convocatorias = [
//   //   { id: 1, nombre: "Convocatoria 1" },
//   //   { id: 2, nombre: "Convocatoria 2" }
//   // ];
//   const [convocatorias, setConvocatorias] = useState([]);

//   useEffect(() => { //para hacer un get
//     fetch("http://localhost:8000/api/todasconvocatorias")
//       .then(response => response.json())
//       // .then(data => setConvocatorias(data))
//       .then(data => {
//         const convocatoriasHabilitadas = data.filter(conv => (conv.habilitada === 1 && conv.eliminado === 0));
//         setConvocatorias(convocatoriasHabilitadas);
//         console.log("Convocatorias:", convocatoriasHabilitadas);
//       })
//       .catch(error => console.error("Error al obtener convocatorias:", error));
//   }, []);

//   // const roles = [
//   //   { id: "aux", nombre: "Auxiliar" },
//   //   { id: "op", nombre: "Operador" },
//   //   { id: "admin", nombre: "Administrador" },
//   //   { id: "eval", nombre: "Evaluador" }
//   // ];
//   const [roles, setRoles] = useState([]);

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/roles");
//         if (!res.ok) throw new Error("Error al obtener roles");
//         const data = await res.json();
//         setRoles(data);
//       } catch (error) {
//         console.error("Error cargando permisos:", error);
//       }
//     };

//     fetchRoles();
//   }, []);

//   const [personas, setPersonas] = useState([]);

//   useEffect(() => {
//     // const rolEditar = JSON.parse(localStorage.getItem("rolEditar"));
//     // if (rolEditar) {
//     //   setFilas([rolEditar]);
//     //   setSearchTerm(rolEditar.nombre);
//     //   localStorage.removeItem("rolEditar");
//     // }

//     // const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
//     // const usuariosFormateados = usuariosGuardados.map((u) => ({
//     //   id: u.id,
//     //   nombre: u.nombre
//     // }));

//     // const personasFijas = [
//     //   { id: 1, nombre: "Carlos Pérez" },
//     //   { id: 2, nombre: "Ana García" },
//     //   { id: 3, nombre: "José López" },
//     //   { id: 4, nombre: "Maria González" }
//     // ];

//     // setPersonas([...personasFijas, ...usuariosFormateados]);
//     cargarUsuarios();
//   }, []);

//   const cargarUsuarios = () => {
//     fetch("http://localhost:8000/api/todosusers")
//       .then(response => response.json())
//       .then(data => setPersonas(data))
//       .catch(error => console.error("Error al obtener usuarios:", error));
//   };

//   const normalize = (str) =>
//     str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

//   const handleNombre = (e) => {
//     // const nombreInput = e.target.value;
//     // setSearchTerm(nombreInput);

//     // const personaEncontrada = personas.find((persona) => {
//     //   const primerNombre = persona.nombre.split(" ")[0];
//     //   return normalize(primerNombre) === normalize(nombreInput);
//     // });

//     // if (personaEncontrada) {
//     //   setFilas([{ ...filas[0], nombre: personaEncontrada.nombre }]);
//     //   setNombreNoEncontrado(false);
//     // } else {
//     //   setNombreNoEncontrado(true);
//     //   setFilas([{ ...filas[0], nombre: "" }]); // limpia el select
//     // }
//   };

//   const handleChange = (e) => {
//     // const nuevasFilas = [...filas];
//     // nuevasFilas[index][field] = value;
//     // setFilas(nuevasFilas);
//     const newValue = e.target.value;
//     setData(nuevoDepartamento);
//   };

//   const guardarDatos = async () => {
//     // const datosGuardados = JSON.parse(localStorage.getItem("rolesAsignados")) || [];

//     // const nuevosDatos = datosGuardados.map((item) =>
//     //   item.nombre === filas[0].nombre ? filas[0] : item
//     // );

//     // const existe = datosGuardados.some((item) => item.nombre === filas[0].nombre);
//     // const actualizados = existe ? nuevosDatos : [...datosGuardados, ...filas];

//     // localStorage.setItem("rolesAsignados", JSON.stringify(actualizados));


//     try {
//       const response = await fetch("http://localhost:8000/api/convocatoria/role", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (!response.ok) throw new Error("Error al enviar datos");
//       setDepartamento("");
//       setProvincia("");
//       setProvincias([]);

//       navigate("/colegios");
//     } catch (error) {
//       console.error("Error en el envío:", error);
//       alert("Ocurrió un error al guardar el colegio.");
//     }

//     alert("Los datos han sido guardados.");
//     navigate("/listaRoles");
//   };

//   return (
//     <div className="roles-container">
//       <div className="roles-title">Asignar Roles</div>

//       <div className="roles-search">
//         <input
//           type="text"
//           placeholder="🔍 Buscar persona por nombre"
//           value={searchTerm}
//           onChange={handleNombre}
//         />
//       </div>

//       {!nombreNoEncontrado && (
//         <table className="roles-table">
//           <thead>
//             <tr>
//               <th>Persona</th>
//               <th>Convocatoria</th>
//               <th>Rol</th>
//             </tr>
//           </thead>
//           <tbody>

//               <tr key={index}>
//                 <td>
//                   <select
//                     value={nombre}
//                     onChange={handleChange}
//                   >
//                     <option value="">Seleccione</option>
//                     {personas.map((persona) => (
//                       // <option key={persona.id} value={persona.nombre}>
//                       //   {persona.nombre}
//                       // </option>
//                       <option key={persona.id} value={persona.name}>
//                         {persona.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     value={idConvocatoria}
//                     onChange={handleChange}
//                   >
//                     <option value="">Seleccione</option>
//                     {convocatorias.map((c) => (
//                       // <option key={c.id} value={c.id}>{c.nombre}</option>
//                       <option key={c.idConvocatoria} value={c.idConvocatoria}>{c.tituloConvocatoria}</option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     value={role}
//                     onChange={handleChange}
//                   >
//                     <option value="">Seleccione</option>
//                     {roles.map((r) => (
//                       // <option key={r.id} value={r.id}>{r.nombre}</option>
//                       <option key={r.id} value={r.id}>{r.name}</option>
//                     ))}
//                   </select>
//                 </td>
//               </tr>

//           </tbody>
//         </table>
//       )}

//       {nombreNoEncontrado && (
//         <div className="mensaje-no-encontrado">No se encontró registrado.</div>
//       )}

//       <div className="roles-buttons">
//         {!nombreNoEncontrado && (
//           <button className="btn-guardar" onClick={guardarDatos}>💾</button>
//         )}
//         {nombreNoEncontrado && (
//           <button className="btn-registrar">Registrar</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AsignarRoles;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/AsignarRoles.css";

// Función para normalizar nombres (quitar acentos, espacios, mayúsculas)
const normalize = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "");

const AsignarRoles = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [personas, setPersonas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [convocatorias, setConvocatorias] = useState([]);
  const [nombreNoEncontrado, setNombreNoEncontrado] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formulario, setFormulario] = useState({
    user_id: location.state?.rol?.user_id || "",
    nombre: location.state?.rol?.name || "",
    // role: location.state?.rol?.role || "",
    role_name: location.state?.rol?.role || "",
    // idConvocatoria: location.state?.idConvocatoria || ""
    convocatoria_id: location.state?.idConvocatoria || ""
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/todosusers")
      .then((res) => res.json())
      .then((data) => setPersonas(data));

    fetch("http://localhost:8000/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));

    fetch("http://localhost:8000/api/todasconvocatorias")
      .then(response => response.json())
      .then(data => {
        const convocatoriasHabilitadas = data.filter(conv => (conv.habilitada === 1 && conv.eliminado === 0));
        setConvocatorias(convocatoriasHabilitadas);
      })
      .catch(error => console.error("Error al obtener convocatorias:", error));
  }, []);

  const handleNombre = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    const personaEncontrada = personas.find((p) =>
      normalize(p.name).includes(normalize(input))
    );

    if (personaEncontrada) {
      setFormulario((prev) => ({
        ...prev,
        user_id: personaEncontrada.id,
        nombre: personaEncontrada.name
      }));
      setNombreNoEncontrado(false);
    } else {
      setFormulario((prev) => ({ ...prev, user_id: "", nombre: "" }));
      setNombreNoEncontrado(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  // const guardarDatos = async () => {
  //   if (!formulario.user_id || !formulario.role_name || !formulario.convocatoria_id) {
  //     alert("Completa todos los campos antes de guardar.");
  //     return;
  //   }

  //   const { nombre, ...formularioSend } = formulario;

  //   console.log(formularioSend);


  //   try {
  //     const res = await fetch(`http://localhost:8000/api/convocatoria/role`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formularioSend)
  //     });

  //     if (!res.ok) throw new Error("Error al enviar datos");

  //     alert("Rol asignado correctamente.");
  //     navigate("/listaRoles");
  //   } catch (error) {
  //     console.error("Error al asignar rol:", error);
  //     alert("Ocurrió un error al guardar.");
  //   }
  // };
  const guardarDatos = async () => {
    if (!formulario.user_id || !formulario.role_name || !formulario.convocatoria_id) {
      alert("Completa todos los campos antes de guardar.");
      return;
    }

    //const { nombre, ...formularioSend } = formulario;
    const formData = new FormData();
    formData.append('user_id', formulario.user_id);
    formData.append('convocatoria_id', formulario.convocatoria_id);
    formData.append('role_name', formulario.role_name);

    try {
      const res = await fetch("http://localhost:8000/api/convocatoria/role", {
        method: "POST",
        //headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(formularioSend)
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          // Mostrar errores de validación
          const mensajes = Object.values(data.errors).flat().join("\n");
          alert("Errores de validación:\n" + mensajes);
        } else {
          alert("Error del servidor:\n" + (data.message || "Desconocido"));
        }
        return;
      }

      alert(data.message || "Rol asignado correctamente.");
      navigate("/listaRoles");

    } catch (error) {
      console.error("Error al asignar rol:", error);
      alert("Ocurrió un error inesperado.");
    }
  };


  return (
    <div className="roles-container">
      <div className="roles-title">Asignar Roles</div>

      <div className="roles-search">
        <label>Buscar por nombre:</label>
        <input type="text" value={searchTerm} onChange={handleNombre} placeholder="🔍 Buscar persona por nombre" />
      </div>


      <table className="roles-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Convocatoria</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select name="user_id" value={formulario.user_id} onChange={handleChange}>
                <option value="">Seleccione</option>
                {personas.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} {p.apellido}</option>
                ))}
              </select>
            </td>
            <td>
              <select name="convocatoria_id" value={formulario.convocatoria_id} onChange={handleChange}>
                <option value="">Seleccione</option>
                {convocatorias.map((c) => (
                  <option key={c.idConvocatoria} value={c.idConvocatoria}>
                    {c.tituloConvocatoria}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="role_name" value={formulario.role_name} onChange={handleChange}>
                <option value="">Seleccione</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>

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
