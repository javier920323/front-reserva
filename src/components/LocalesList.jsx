import { useEffect, useState } from "react";

const LocalesList = ({ setLocal }) => {
  const [locales, setLocales] = useState([]);
  const [cupoLocal, setCupoLocal] = useState({});

  useEffect(() => {
    fetch("https://api-reserva-0pxp.onrender.com/api/locales")
      .then((res) => res.json())
      .then((data) => setLocales(data));
  }, []);

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
      {cupoLocal && <h4>Cupos Disponibles: {cupoLocal.cupo}</h4>}
    </div>
  );
};

export default LocalesList;
