import { useEffect, useState } from "react";
import { allReservas } from "../../api/api";
import Loading from "../../components/Loading";

const ConsultarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function listarReservas() {
      setError("");
      const data = await allReservas();
      if (data.error) {
        setError(data.error);
      } else {
        setReservas(data);
        setLoading(false);
      }
    }
    listarReservas();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Reservas en APP</h2>
      {error && <p>{error}</p>}
      {reservas.length === 0 ? (
        <p>No hay reservas disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Correo</th>
              <th>Local</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td>{reserva.user_id.nombre}</td>
                <td>falta agregar en la api el correo</td>
                <td>{reserva.local_id.nombre}</td>
                <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultarReservas;
