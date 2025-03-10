import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { usuario, error, login } = useContext(UsuarioContext); // Usar el contexto
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      if (usuario.rol === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/reserva");
      }
    }
  }, [usuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="app-container container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            className="input-field"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="input-label">Correo</label>
        </div>

        <div className="input-container">
          <input
            className="input-field"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="input-label">Contraseña</label>
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
