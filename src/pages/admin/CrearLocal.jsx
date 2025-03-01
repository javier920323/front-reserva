const CrearLocal = () => {
  return (
    <div>
      <h1>Crear Nuevo Local</h1>
      <form>
        <div>
          <label htmlFor="nombre">Nombre del Local</label>
          <input type="text" id="nombre" required />
        </div>
        <div>
          <label htmlFor="cupos">Cupos</label>
          <input type="text" id="cupos" required />
        </div>
        <button type="submit">Crear Local</button>
      </form>
    </div>
  );
};

export default CrearLocal;
