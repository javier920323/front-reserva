import { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = async (email, password) => {
    try {
      const respuesta = await fetch("https://api-reserva-0pxp.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setUsuario(data.usuario);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
      } else {
        throw new Error(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en login:", error.message);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>{children}</UsuarioContext.Provider>
  );
};
