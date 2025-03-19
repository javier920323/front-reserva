import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";

const Home = () => {
  const { usuario } = useContext(UsuarioContext);
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a MIAPP</h1>
        <p>Reserva tu lugar de manera rápida y sencilla.</p>
      </header>

      <section className="home-content">
        <div className="info-box">
          <h2>¿Cómo funciona?</h2>
          <p>
            Nuestra plataforma te permite reservar de manera sencilla y rápida. Solo selecciona tu
            local y elige la fecha deseada.
          </p>
        </div>

        <div className="info-box">
          <h2>Beneficios</h2>
          <ul>
            <li>Acceso en tiempo real a la disponibilidad.</li>
            <li>Reservas rápidas y seguras.</li>
            <li>Confirmaciones instantáneas.</li>
          </ul>
        </div>
      </section>

      <section className="home-actions">
        <h2>Comienza ahora</h2>
        <div className="home-buttons">
          <Link to="/reserva">
            <button className="home-button">Hacer una Reserva</button>
          </Link>
          {!usuario && (
            <>
              <Link to="/login">
                <button className="home-button secondary">Iniciar Sesión</button>
              </Link>
              <Link to="/registro">
                <button className="home-button outline">Registrarse</button>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
