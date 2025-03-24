import { useContext, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { updateUsuario } from "../../api/api";

const ProfileUser = () => {
  const { usuario } = useContext(UsuarioContext);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuarioActualizado, seTUsuarioActualizado] = useState(usuario);

  const handleChange = (e) => {
    seTUsuarioActualizado({ ...usuarioActualizado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await updateUsuario(usuarioActualizado);
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error actualizado usuario", err);
    }
  };

  return (
    <div className="app-container container">
      <h2>Perfil de Usuario</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={usuarioActualizado.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            New password
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={usuarioActualizado.password}
              onChange={handleChange}
            />
          </label>
          {loading && <p>Actualizando Usuario... </p>}
          {error && <p className="error">{error}</p>}
          <div className="radioFlex">
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      ) : (
        <>
          <p>
            <strong>Nombre:</strong> {usuarioActualizado.nombre}
          </p>
          <p>
            <strong>Email:</strong> {usuarioActualizado.email}
          </p>
          <p>
            <strong>Rol:</strong> {usuarioActualizado.rol}
          </p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}
    </div>
  );
};

export default ProfileUser;
