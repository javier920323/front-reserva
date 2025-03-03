import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú hamburguesa
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const { usuario, logout } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout();
    // Navegamos inmediatamente al home
    navigate("/");
    // Cierra el modal
    setIsModalOpen(false);
  };

  return (
    <header className={`navbar ${isOpen ? "open" : ""}`}>
      <Link to="/" className="logo">
        MiApp
      </Link>
      <div className={`menu ${isOpen ? "mobile" : ""}`}>
        <Link to="/reserva" onClick={() => setIsOpen(false)}>
          Reserva
        </Link>

        {!usuario ? (
          <Link to="/login" className="logout-btn" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        ) : (
          <button className="logout-btn" onClick={() => setIsModalOpen(true)}>
            Logout
          </button>
        )}

        <Link to="/registro" onClick={() => setIsOpen(false)}>
          Registro
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Seguro que quieres cerrar sesión?</h3>
            <div className="modal-botones">
              <button onClick={handleLogout}>Sí, cerrar sesión</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
