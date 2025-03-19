import { useContext, useState } from "react";
import LocalesList from "../components/LocalesList";
import DatePicker from "../components/DataPicker/DatePicker";
import { useNavigate } from "react-router-dom";
import { realizaReserva } from "../api/api";
import { UsuarioContext } from "../context/UsuarioContext";
import { useLocales } from "../context/LocalesContext";

function Reserva() {
  const [local, setLocal] = useState({});
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { usuario } = useContext(UsuarioContext);
  const { fetchLocales } = useLocales();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!local || !fecha) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      // Realizar la llamada a la API para registrar el usuario
      const data = await realizaReserva(local._id, usuario.id, fecha);
      setLoading(false);
      if (data.error) {
        setError(data.error);
      } else {
        navigate("/reserva-success", {
          state: { local_nombre: local.nombre, fecha },
        });
        fetchLocales();
      }
    } catch (err) {
      console.error("Error reservando", err);
    }
  };

  return (
    <div className="app-container container">
      <h1>Reserva tu turno</h1>
      <form onSubmit={handleSubmit}>
        <LocalesList setLocal={setLocal} />
        <DatePicker onDateChange={setFecha} />
        {error && <p className="error">{error}</p>}
        {loading && <p>Creando reserva... </p>}
        <button type="submit">Realizar Reserva</button>
      </form>
    </div>
  );
}

export default Reserva;
