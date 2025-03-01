import { useState } from "react";
import LocalesList from "../components/LocalesList";
import DatePicker from "../components/DataPicker/DatePicker";
import { useNavigate } from "react-router-dom";
import { realizaReserva } from "../api/api";

function Reserva() {
  const [local, setLocal] = useState({});
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!local || !fecha) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      // Llamamos a la función realizaReserva para hacer la reserva
      await realizaReserva(local._id, fecha);

      // Si todo va bien, redirigimos al usuario
      navigate("/reserva-success", {
        state: { local_nombre: local.nombre, fecha },
      });
    } catch (error) {
      // Si hay un error, mostramos el mensaje de error
      setError(error.message);
    }
  };

  return (
    <div className="app-container container">
      <h1>Reserva tu turno</h1>
      <form onSubmit={handleSubmit}>
        <LocalesList setLocal={setLocal} />
        <DatePicker onDateChange={setFecha} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Realizar Reserva</button>
      </form>
    </div>
  );
}

export default Reserva;
