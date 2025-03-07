import { useState } from "react";
import { useLocales } from "../../context/LocalesContext";
import ModalContent from "../../components/Modal/ModalContent";
import { actualizarLocales } from "../../api/api";

const ConsultarLocales = () => {
  const { locales } = useLocales();
  const [filtroLocal, setFiltroLocal] = useState(locales);
  const [showModal, setShowModal] = useState(false);
  const [localSeleccionado, setLocalSeleccionado] = useState(null);

  const handleFilter = (e) => {
    const localesFiltrados = locales.filter((local) =>
      local.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltroLocal(localesFiltrados);
  };

  const openModal = (local) => {
    setLocalSeleccionado(local);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSeleccionado((prev) => ({
      ...prev,
      [name]: name === "cupo" ? Number(value) || 0 : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const actualizado = await actualizarLocales(localSeleccionado);

    if (!actualizado.error) {
      setFiltroLocal((prevLocales) =>
        prevLocales.map((local) => (local._id === actualizado._id ? actualizado : local))
      );
    }
    closeModal();
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
            </tr>
          </thead>
          <tbody>
            {filtroLocal.map((local) => (
              <tr key={local._id} onClick={() => openModal(local)}>
                <td>{local.nombre}</td>
                <td>{local.cupo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <ModalContent isOpen={showModal} onClose={closeModal}>
          <h2>Editar el local</h2>
          <form onSubmit={handleSubmit}>
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
              <button onClick={closeModal} type="button">
                Cancelar
              </button>
              <button type="submit">Editar</button>
            </div>
          </form>
        </ModalContent>
      )}
    </div>
  );
};

export default ConsultarLocales;
