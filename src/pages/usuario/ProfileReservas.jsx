import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { allReservaUser } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const ProfileReservas = () => {
  const { usuario } = useContext(UsuarioContext);
  const [reservaUser, setReservaUser] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function listarReservasUser() {
      setError("");
      const data = await allReservaUser(usuario.id);
      if (data.error) {
        setError(data.error);
      } else {
        setReservaUser(data);
      }
    }
    listarReservasUser();
  }, []);

  const handleClick = (reserva) => {
    navigate(`${reserva._id}`, { state: reserva });
  };

  return (
    <div className="app-container container">
      <h2>Reservas de {usuario.nombre}</h2>
      {error && <p>{error}</p>}
      {reservaUser.length === 0 ? (
        <div>
          <p>No has hecho reserva.</p>
          <Link to="/reserva"> reservas</Link>
        </div>
      ) : (
        <>
          <h4>Para cambiar una reserva has click en una </h4>
          <table>
            <thead>
              <tr>
                <th>Local</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {reservaUser.map((reserva) => (
                <tr
                  key={reserva._id}
                  onClick={() => handleClick(reserva)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{reserva.local_id?.nombre}</td>
                  <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProfileReservas;
