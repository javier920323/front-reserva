import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../../components/DataPicker/DatePicker";
import { useState } from "react";
import { actualizarReserva } from "../../api/api";

const ProfileUpdateReserva = () => {
  const location = useLocation();
  const reserva = location.state || {};
  const [fecha, setFecha] = useState(reserva.fecha);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!fecha) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      await actualizarReserva(reserva._id, reserva.local_id?._id, fecha);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app-container container">
      <h2>Edita tu reserva</h2>
      <h4>Local: {reserva.local_id.nombre}</h4>
      <form onSubmit={handleSubmit}>
        <DatePicker fecha={fecha} onDateChange={setFecha} />
        {error && <p className="error">{error}</p>}
        {loading && <p>Actualizando reserva... </p>}
        <button type="submit">Actualizar Reserva</button>
      </form>
    </div>
  );
};

export default ProfileUpdateReserva;
