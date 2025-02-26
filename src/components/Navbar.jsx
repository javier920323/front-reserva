import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";
import { useContext } from "react";

const Navbar = () => {
  const { usuario, logout } = useContext(UsuarioContext);
  const navigate = useNavigate();

  return (
    <nav>
      <h1>Reserva App</h1>
      {usuario ? (
        <>
          <span>
            {usuario.nombre} ({usuario.rol})
          </span>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      )}
    </nav>
  );
};

export default Navbar;
