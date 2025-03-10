import { useContext, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";

const ProfileUser = () => {
  const { usuario } = useContext(UsuarioContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="app-container container">
      <h2>Perfil de Usuario</h2>
      {isEditing ? (
        <form>
          <label>
            Nombre:
            <input type="text" name="nombre" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Rol:
            <input type="text" name="rol" />
          </label>
          <button>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <>
          <p>
            <strong>Nombre:</strong> {usuario.nombre}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Rol:</strong> {usuario.rol}
          </p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}
    </div>
  );
};

export default ProfileUser;
