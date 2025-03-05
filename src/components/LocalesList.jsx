import { useState } from "react";
import { useLocales } from "../context/LocalesContext";

const LocalesList = ({ setLocal }) => {
  const { locales, error } = useLocales();
  const [cupoLocal, setCupoLocal] = useState({});

  const handlerCupos = (e) => {
    const localSelect = locales.find((local) => local.nombre === e.target.value);
    setCupoLocal(localSelect);
    setLocal(localSelect);
  };

  return (
    <div>
      <label htmlFor="local">Selecciona un local:</label>
      <select id="local" onChange={(e) => handlerCupos(e)} required>
        <option value="">Selecciona</option>
        {locales.map((local) => (
          <option key={local._id} value={local.nombre}>
            {local.nombre}
          </option>
        ))}
      </select>
      {error && <p className="error">{error}</p>}
      {cupoLocal && !error && <h4>Cupos Disponibles: {cupoLocal.cupo}</h4>}
    </div>
  );
};

export default LocalesList;
