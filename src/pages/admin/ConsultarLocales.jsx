import { useState } from "react";

const ConsultarLocales = () => {
  const [reservas] = useState([
    { _id: "1", cliente: "Juan Pérez", fecha: "2025-03-01", hora: "10:00 AM" },
    { _id: "2", cliente: "María Gómez", fecha: "2025-03-02", hora: "2:00 PM" },
    { _id: "3", cliente: "Carlos López", fecha: "2025-03-03", hora: "4:30 PM" },
  ]);

  return (
    <div>
      <h2>Reservas del Local</h2>
      {reservas.length === 0 ? (
        <p>No hay reservas disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td>{reserva.cliente}</td>
                <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                <td>{reserva.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultarLocales;
