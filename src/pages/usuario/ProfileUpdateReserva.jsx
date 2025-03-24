import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../../components/DataPicker/DatePicker";
import ModalContent from "../../components/Modal/ModalContent";
import { useLocales } from "../../context/LocalesContext";
import { actualizarReserva, eliminarReserva } from "../../api/api";

const ProfileUpdateReserva = () => {
  const { fetchLocales } = useLocales();
  const location = useLocation();
  const reserva = location.state || {};
  const [fecha, setFecha] = useState(reserva.fecha);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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

  const handleEliminar = () => {
    setShowModal(true);
  };
  const closeDeleteModal = () => {
    setShowModal(false);
  };

  const confirmarEliminar = async () => {
    const eliminado = await eliminarReserva(reserva._id);

    if (!eliminado.error) {
      fetchLocales();
      navigate(-1);
    }
    closeDeleteModal(); // Cierra el modal
  };

  return (
    <div className="app-container relative container">
      <h2>Edita tu reserva</h2>
      <h4>Local: {reserva.local_id.nombre}</h4>
      <form onSubmit={handleSubmit}>
        <DatePicker fecha={fecha} onDateChange={setFecha} />
        {error && <p className="error">{error}</p>}
        {loading && <p>Actualizando reserva... </p>}
        <button type="submit">Actualizar Reserva</button>
      </form>
      <div className="delete-section">
        <h2>Eliminar tu reserva</h2>
        <button onClick={handleEliminar} className="btn btn-danger">
          Eliminar Reserva
        </button>
        <p className="delete-info">Si eliminas la reserva, no podrás recuperarla.</p>
      </div>
      {showModal && (
        <ModalContent isOpen={showModal} onClose={closeDeleteModal}>
          <div className="notification">
            <p>¿Estás seguro de que quieres eliminar?</p>
            <div className="radioFlex">
              <button onClick={closeDeleteModal}>Cancelar</button>
              <button
                onClick={confirmarEliminar}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </ModalContent>
      )}
    </div>
  );
};

export default ProfileUpdateReserva;
