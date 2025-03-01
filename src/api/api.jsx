const API_URL = "https://api-reserva-0pxp.onrender.com/api"; // Cambia esto si tu backend está en otro puerto o dominio

// Función realizar Reserva
export const realizaReserva = async (localid, fecha) => {
  try {
    // Hacemos la solicitud a la API para crear la reserva
    const response = await fetch(`${API_URL}/reservas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ local_id: localid, fecha }),
    });

    const data = await response.json();

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(data.error || "No se pudo completar la reserva.");
    }

    return data; // Retornamos los datos de la respuesta si fue exitosa
  } catch (error) {
    // Si ocurre un error (en la solicitud o en la API)
    throw new Error(error.message || "Error en la conexión con el servidor.");
  }
};

// Función para registrar un usuario
export const registrarUsuario = async ({ nombre, email, password, rol }) => {
  try {
    const response = await fetch(`${API_URL}/auth/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password, rol }),
    });

    return await response.json(); // Retorna la respuesta del backend
  } catch (error) {
    console.error("Error en el registro:", error);
    return { error: "No se pudo registrar el usuario" };
  }
};

// Función para iniciar sesión
export const loginUsuario = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Importante para que el navegador envíe las cookies de sesión
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error en el login:", error);
    return { error: "No se pudo iniciar sesión" };
  }
};
