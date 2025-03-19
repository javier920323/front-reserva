import { useEffect, useState } from "react";
import { detalleLocal } from "../../api/api";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const DetalleLocal = () => {
  const [detalle, setDetalle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    async function getDetalleLocal() {
      setError("");
      const data = await detalleLocal(id);
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setDetalle(data);
        setLoading(false);
      }
    }
    getDetalleLocal();
  }, []);

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;
  return (
    <div className="local-container">
      <div className="local-header">
        <h2>Información del Local</h2>
      </div>
      <div className="local-info">
        <p>
          <strong>Local:</strong> {detalle.local}
        </p>
        <p>
          <strong>Cupos Disponibles:</strong> {detalle.cupo_total}
        </p>
        <p>
          <strong>Cantidad total de reservas:</strong> {detalle.cupo_ocupado}
        </p>
      </div>
      <div className="reservations">
        <h3>Reservas</h3>
        {detalle.reservas.length > 0 ? (
          <div className="table-container">
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                </tr>
              </thead>
              <tbody>
                {detalle.reservas.map((reserva, index) => (
                  <tr key={index}>
                    <td>{reserva.fecha}</td>
                    <td>{reserva.user_id?.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay reservas.</p>
        )}
      </div>
    </div>
  );
};

export default DetalleLocal;
