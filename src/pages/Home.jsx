import { useState } from "react";
import LocalesList from "../components/LocalesList";
import DatePicker from "../components/DataPicker/DatePicker";
import { useNavigate } from "react-router-dom";

function Home() {
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
      const response = await fetch("https://api-reserva-0pxp.onrender.com/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ local_id: local._id, fecha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir a la página de éxito con datos de la reserva
        navigate("/reserva-success", {
          state: { local_nombre: local.nombre, fecha },
        });
      } else {
        setError(data.error || "No se pudo completar la reserva.");
      }
    } catch (error) {
      console.error("Error al reservar:", error);
      setError("Error en la conexión con el servidor.");
    }
  };

  return (
    <div className="app-container">
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

export default Home;
