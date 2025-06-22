import { createContext, useContext, useState, useEffect } from "react";

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Lee el token y el user de localStorage al montar
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // Si más tarde cambias token o user, sincroniza localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (userData, tokenData) => {
    let tutorRespaldo = null;
    localStorage.setItem('token', tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('🔐 [Login] token y user guardados en localStorage');
    setUser(userData);
    setToken(tokenData);

    console.log(userData);

    if (userData.rol === null) {
      try {
        const res = await fetch(`${apiUrl}/tutor/usuario/${userData.id}`);

        if (res.ok) {
          const tutorData = await res.json();
          console.log("Tutor encontrado:", tutorData);

          // Actualiza userData con rol tutor
          tutorRespaldo = tutorData;
          userData.rol = 'tutor';

          // Guarda también en localStorage actualizado
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
        } else {
          console.log("No tiene tutor asociado");
        }
      } catch (err) {
        console.error("Error al verificar tutor:", err.message);
      }
    }

    if (userData.rol === null) {
      try {
        const response = await fetch(`${apiUrl}/user/${userData.id}/roles`, {
          //method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenData}`,
            //'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo obtener los roles`);
        }

        const data = await response.json();

        console.log("Datos de roles del usuario:", data);
        localStorage.setItem('roles', JSON.stringify(data.assignments));

        // 🚨 Devolver bandera para redirigir a la pantalla de selección
        return { needsRoleSelection: true };
      } catch (error) {
        console.error("Error al obtener roles del usuario:", error);
        return { needsRoleSelection: false };
      }
    } else if (userData.rol.toLowerCase() === 'tutor' || userData.rol.toLowerCase() === 'admin') {
      console.log('🔐 [Login] usuario es tutor, solicitando datos de tutor...');
      console.log("🔐 [Token enviado]:", tokenData);

      //const resTutor = await axios.get('http://localhost:8000/api/tutor', {
      if (tutorRespaldo) {
        console.log('🔐 [Login] respuesta tutor:', tutorRespaldo);
        localStorage.setItem('tutor', JSON.stringify(tutorRespaldo));
        console.log('Tutor asociado:', tutorRespaldo);
      } else {
        const resTutor = await axios.get(`${apiUrl}/tutor`, {
          headers: { Authorization: `Bearer ${tokenData}` }
        });
        console.log('🔐 [Login] respuesta tutor:', resTutor);
        localStorage.setItem('tutor', JSON.stringify(resTutor.data.tutor));
        console.log('Tutor asociado:', resTutor.data.tutor);
      }

      return { needsRoleSelection: false };
    }

    return { needsRoleSelection: false };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tutor');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};