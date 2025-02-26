import { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario", // Por defecto, "usuario", puede cambiar a "admin"
  });

  

  const login = () => {};

  const logout = () => {};

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};
