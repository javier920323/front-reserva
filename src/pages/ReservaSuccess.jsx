import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReservaSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener datos de la reserva desde el estado de navegación
  const { local_nombre, fecha } = location.state || {};

  // Si no hay datos, redirigir al usuario al inicio después de renderizar
  useEffect(() => {
    if (!local_nombre || !fecha) {
      navigate("/");
    }
  }, [local_nombre, fecha, navigate]);

  // Evitar mostrar contenido si los datos no están disponibles (mientras redirige)
  if (!local_nombre || !fecha) return null;

  return (
    <div className="reserva-exitosa-container container">
      <h2>¡Reserva Exitosa! 🎉</h2>
      <p>
        <strong>Local:</strong> {local_nombre}
      </p>
      <p>
        <strong>Fecha:</strong> {new Date(fecha).toLocaleDateString()}
      </p>
      <button onClick={() => navigate("/profile/my-reserva")}>Ver mis Reservas</button>
    </div>
  );
};

export default ReservaSuccess;
