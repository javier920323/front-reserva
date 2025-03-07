import { Outlet, Link, Navigate, useLocation } from "react-router-dom";
import styles from "./AdminPage.module.css";
import { useContext } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";

const AdminPage = () => {
  const { usuario } = useContext(UsuarioContext);
  const { pathname } = useLocation();
  // Si el usuario no está autenticado, redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        {/* Barra lateral de navegación */}
        <h2 className={styles.sidebarTitle}>Dashboards</h2>
        <ul className={styles.navList}>
          <li>
            <Link to="consultar-locales" className={styles.navItem}>
              <i>🏬</i>
              <span className="menu-text"> Consultar Local</span>
              <i className={styles.navItemI}>➜</i>
            </Link>
          </li>
          <li>
            <Link to="crear-local" className={styles.navItem}>
              <i>➕🏬</i>
              <span className="menu-text"> Crear Local</span>
              <i className={styles.navItemI}>➜</i>
            </Link>
          </li>
          <li>
            <Link to="consultar-reservas" className={styles.navItem}>
              <i>📅</i>
              <span className="menu-text"> Consultar Reservas</span>
              <i className={styles.navItemI}>➜</i>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.content}>
        {pathname === "/dashboard" && (
          <div className={styles.dashboardFirts}>
            <h3>Bienvenido {usuario.nombre}</h3>
            <p>
              En el Dashboards podras hacer muchas cosas ya que eres
              <strong> {usuario.rol}</strong> y este rol te da super poderes.
            </p>
            <p>Puedes navegar por el menu lateral para administrar la web de Reservas 🚀🚀</p>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
