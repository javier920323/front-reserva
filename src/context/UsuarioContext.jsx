import { createContext, useEffect, useState } from "react";
import { loginUsuario } from "../api/api";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Realizar la llamada a la API para registrar el usuario
      setError("");
      const data = await loginUsuario(email, password);
      if (data.error) {
        setError(data.error);
        return;
      }
      setUsuario(data.usuario);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      localStorage.setItem("token", data.token); // 🔥 Guarda el token
    } catch (err) {
      console.error("Error en el login", err);
    }
  };

  const logout = async () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  return (
    <UsuarioContext.Provider value={{ usuario, error, login, logout, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
};
