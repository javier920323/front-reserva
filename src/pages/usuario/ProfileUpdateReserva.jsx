import { useLocation } from "react-router-dom";
import DatePicker from "../../components/DataPicker/DatePicker";
import { useState } from "react";

const ProfileUpdateReserva = () => {
  const location = useLocation();
  const reserva = location.state || {};
  const [fecha, setFecha] = useState(reserva.fecha);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!fecha) {
      setError("Todos los campos son obligatorios");
      return;
    }
    console.log("ok");
  };

  return (
    <div className="app-container container">
      <h2>Edita tu reserva</h2>
      <h4>Local: {reserva.local_id.nombre}</h4>
      <form onSubmit={handleSubmit}>
        <DatePicker onDateChange={setFecha} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Actualizar Reserva</button>
      </form>
    </div>
  );
};

export default ProfileUpdateReserva;
