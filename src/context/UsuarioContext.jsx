import { createContext, useState } from "react";
import { loginUsuario } from "../api/api";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = async (email, password) => {
    try {
      // Realizar la llamada a la API para registrar el usuario
      const data = await loginUsuario(email, password);
      if (data.error) {
        return;
      }
      setUsuario(data.usuario);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
    } catch (err) {
      console.error("Error en el login", err);
    }
  };

  const logout = async () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>{children}</UsuarioContext.Provider>
  );
};
