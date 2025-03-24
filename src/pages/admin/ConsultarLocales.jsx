import { useState } from "react";
import { useLocales } from "../../context/LocalesContext";
import ModalContent from "../../components/Modal/ModalContent";
import { actualizarLocales, eliminarLocal } from "../../api/api";
import { useNavigate } from "react-router-dom";

const ConsultarLocales = () => {
  const { locales, fetchLocales } = useLocales();
  const [filtroLocal, setFiltroLocal] = useState(locales);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localSeleccionado, setLocalSeleccionado] = useState(null);
  const navigate = useNavigate();

  const handleFilter = (e) => {
    const localesFiltrados = locales.filter((local) =>
      local.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltroLocal(localesFiltrados);
  };

  const handleEditar = (e, local) => {
    e.stopPropagation();
    setLocalSeleccionado(local);
    setShowModal(true);
  };

  const closeEditarModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSeleccionado((prev) => ({
      ...prev,
      [name]: name === "cupo" ? Number(value) || 0 : value,
    }));
  };

  const confirmarEditar = async (e) => {
    e.preventDefault();
    const actualizado = await actualizarLocales(localSeleccionado);

    if (!actualizado.error) {
      setFiltroLocal((prevLocales) =>
        prevLocales.map((local) => (local._id === actualizado._id ? actualizado : local))
      );
      fetchLocales();
    }
    closeEditarModal();
  };

  const handleClick = (id) => {
    navigate(id);
  };

  const handleEliminar = (e, local) => {
    e.stopPropagation();
    setLocalSeleccionado(local);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmarEliminar = async () => {
    const eliminado = await eliminarLocal(localSeleccionado._id);

    if (!eliminado.error) {
      setFiltroLocal((prevLocales) =>
        prevLocales.filter((local) => local._id !== localSeleccionado._id)
      );
      fetchLocales(); // Actualiza la lista de locales
    }
    closeDeleteModal(); // Cierra el modal
  };

  return (
    <div>
      <h2>Todos los Locales</h2>
      <div>
        <input onChange={handleFilter} type="text" placeholder="buscar" />
      </div>

      {filtroLocal.length === 0 ? (
        <>
          <p>No hay locales.</p>
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre del Local</th>
              <th>Cantidad de Cupos</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtroLocal.map((local) => (
              <tr key={local._id} onClick={() => handleClick(local._id)}>
                <td>{local.nombre}</td>
                <td>{local.cupo}</td>
                <td onClick={(e) => handleEditar(e, local)}> ✏️ Editar</td>
                <td onClick={(e) => handleEliminar(e, local)}>🗑️ Eliminar</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <ModalContent isOpen={showModal} onClose={closeEditarModal}>
          <h2>Editar el local</h2>
          <form onSubmit={confirmarEditar}>
            <label>
              Nuevo Nombre:
              <input
                type="text"
                name="nombre"
                onChange={handleChange}
                value={localSeleccionado.nombre}
              />
            </label>
            <label>
              Cupos disponibles:
              <input
                type="number"
                onChange={handleChange}
                name="cupo"
                min={0}
                value={localSeleccionado.cupo}
              />
            </label>
            <div className="radioFlex">
              <button onClick={closeEditarModal} type="button">
                Cancelar
              </button>
              <button type="submit">Editar</button>
            </div>
          </form>
        </ModalContent>
      )}

      {showDeleteModal && (
        <ModalContent isOpen={showDeleteModal} onClose={closeDeleteModal}>
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

export default ConsultarLocales;
