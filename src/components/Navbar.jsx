import { useState } from "react";
import { Link } from "react-router-dom"; // Usamos react-router-dom para navegación

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar el menú hamburguesa

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna el estado del menú
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
        <Link to="/login" onClick={() => setIsOpen(false)}>
          Login
        </Link>
        <Link to="/registro" onClick={() => setIsOpen(false)}>
          Registro
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Navbar;
