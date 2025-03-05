import { useLocales } from "../../context/LocalesContext";

const ConsultarLocales = () => {
  
  const { locales } = useLocales();

  return (
    <div>
      <h2>Todos los Locales</h2>
      {locales.length === 0 ? (
        <p>No hay locales.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Local</th>
              <th>Cupos</th>
            </tr>
          </thead>
          <tbody>
            {locales.map((local) => (
              <tr key={local._id}>
                <td>{local.nombre}</td>
                <td>{local.cupo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultarLocales;
