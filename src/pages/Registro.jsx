// src/pages/Registro.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";

const Registro = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la llamada a la API para registrar el usuario
      //await registrarUsuario(datos);
      navigate("/login"); // Redirigir a la página de login después de registrarse exitosamente
    } catch (err) {
      console.error("Error en el registro", err);
    }
  };

  return (
    <div className="app-container container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={usuario.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={usuario.password}
          onChange={handleChange}
        />
        <button type="submit">Registro</button>
      </form>
    </div>
  );
};

export default Registro;
