import { useState } from "react";
import { crearLocales } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useLocales } from "../../context/LocalesContext";

const CrearLocal = () => {
  const { setLocales } = useLocales();
  const [local, setLocal] = useState({
    nombre: "",
    cupo: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal((prev) => ({
      ...prev,
      [name]: name === "cupo" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await crearLocales(local);

      if (data.error) {
        setError(data.error);
      } else {
        setLocales((prevLocales) => [...prevLocales, data]);
        navigate("/dashboard/consultar-locales");
      }
    } catch (err) {
      console.error("Error al creando local", err);
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Local</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del Local</label>
          <input
            placeholder="Nombre"
            name="nombre"
            value={local.nombre}
            onChange={handleChange}
            type="text"
            id="nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="cupos">Cupos</label>
          <input
            type="number"
            min={1}
            name="cupo"
            id="cupos"
            value={local.cupo}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Crear Local</button>
      </form>
    </div>
  );
};

export default CrearLocal;
