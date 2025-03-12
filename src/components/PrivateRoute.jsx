import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";

const PrivateRoute = () => {
  const { usuario, loading } = useContext(UsuarioContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Si el usuario no está autenticado, redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza el contenido de la ruta
  return <Outlet />;
};

export default PrivateRoute;
