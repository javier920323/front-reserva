const API_URL = "https://api-reserva-0pxp.onrender.com/api"; // Cambia esto si tu backend está en otro puerto o dominio

// Función obtener Locales
export const obtenerLocales = async () => {
  try {
    const response = await fetch(`${API_URL}/locales`);

    return await response.json();
  } catch (error) {
    console.error("Error obtener Locales:", error);
    return { error: "Error al obtener Locales" };
  }
};
// Crear un nuevo Local
export const crearLocales = async ({ nombre, cupo }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No hay token disponible");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/locales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, cupo }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creando Local", error);
    return { error: "Error creando Local" };
  }
};
// Función actualizar un Local
export const actualizarLocales = async ({ _id: id, nombre, cupo }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No hay token disponible");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/locales`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, nombre, cupo }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error altualizando Local", error);
    return { error: "Error altualizando Local" };
  }
};

// Función para obtener todas reservas de un local
export const detalleLocal = async (localid) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No hay token disponible");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/reservas/${localid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error obtener todas reservas de un local:", error);
    return { error: "Error al obtener obtener todas reservas de un local" };
  }
};

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
    const response = await fetch(`${API_URL}/auth/login`, {
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
