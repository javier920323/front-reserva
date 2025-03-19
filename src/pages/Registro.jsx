import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../api/api";

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario", // Por defecto, "usuario", puede cambiar a "admin"
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Realizar la llamada a la API para registrar el usuario
      const data = await registrarUsuario(usuario);

      if (data.error) {
        setError(data.error);
      } else {
        navigate("/login"); // Redirigir a la página de login después de registrarse exitosamente
      }
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
        <div className="radioFlex">
          <label>
            default
            <input type="radio" name="rol" value="usuario" onChange={handleChange} />
          </label>

          {/* <label>
            admin
            <input type="radio" name="rol" value="admin" onChange={handleChange} />
          </label> */}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Registro</button>
      </form>
    </div>
  );
};

export default Registro;
