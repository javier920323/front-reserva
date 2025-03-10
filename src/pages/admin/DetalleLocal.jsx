import { useEffect, useState } from "react";
import { detalleLocal } from "../../api/api";
import { useParams } from "react-router-dom";

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h2>Información del Local</h2>
      <p>
        <strong>Local:</strong> {detalle.local}
      </p>
      <p>
        <strong>Cupos Disponibles:</strong> {detalle.cupo_total}
      </p>
      <p>
        <strong>Cantidad total de reservas:</strong> {detalle.cupo_ocupado}
      </p>
      <h3>Reservas</h3>
      <ul>
        {detalle.reservas.length > 0 ? (
          detalle.reservas.map((reserva, index) => <li key={index}>{reserva.fecha}</li>)
        ) : (
          <p>No hay reservas.</p>
        )}
      </ul>
    </div>
  );
};

export default DetalleLocal;
