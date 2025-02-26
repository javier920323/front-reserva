import { useState } from "react";
// import { UsuarioContext } from "./UsuarioContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useContext(UsuarioContext); // Usar el contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ok login");
    navigate("/reserva");

    // const response = await fetch("http://localhost:5000/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (response.ok) {
    //   const data = await response.json(); // Recibir usuario con su rol
    //   login(data); // Guardar en contexto
    //   navigate("/"); // Redirigir a la página principal
    // } else {
    //   alert("Credenciales incorrectas");
    // }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
