import { Link, Outlet } from "react-router-dom";
import styles from "../admin/AdminPage.module.css";

const Profile = () => {
  return (
    <div>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Profile</h2>
        <ul className={styles.navList}>
          <li>
            <Link to="editar" className={styles.navItem}>
              <i>✏️</i>
              <span className="menu-text">Editar perfi</span>
              <i className={styles.navItemI}>➜</i>
            </Link>
          </li>
          <li>
            <Link to="my-reserva" className={styles.navItem}>
              <i>📅</i>
              <span className="menu-text"> Mis reservas</span>
              <i className={styles.navItemI}>➜</i>
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
