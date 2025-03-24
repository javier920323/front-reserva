const API_URL = "https://api-reserva-0pxp.onrender.com/api";

const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  requireAuth = false,
  extraOptions = {}
) => {
  const headers = {
    "Content-Type": "application/json",
    ...extraOptions.headers,
  };

  if (requireAuth) {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible");
      return { error: "Token no disponible" };
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    ...extraOptions,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    if (!response.ok) {
      return { error: data.error || "Error en la petición" };
    }
    return data;
  } catch (error) {
    console.error(`Error en ${method} ${endpoint}:`, error);
    return { error: error.message || "Error en la conexión" };
  }
};

/* === Endpoints de la API === */

// Obtener Locales
export const obtenerLocales = () => apiRequest("/locales");

// Crear un nuevo Local (requiere token)
export const crearLocales = ({ nombre, cupo }) =>
  apiRequest("/locales", "POST", { nombre, cupo }, true);

// Actualizar un Local (requiere token)
export const actualizarLocales = ({ _id: id, nombre, cupo }) =>
  apiRequest("/locales", "PUT", { id, nombre, cupo }, true);

export const eliminarLocal = (id) => apiRequest("/locales", "DELETE", { id }, true);

// Obtener todas las reservas (requiere token)
export const allReservas = () => apiRequest("/reservas", "GET", null, true);

// Obtener todas las reservas de un usuario (según el ID del usuario)
export const allReservaUser = (user_id) => apiRequest(`/reservas/user/${user_id}`);

// Obtener el detalle de un local (reservas de un local, requiere token)
export const detalleLocal = (localid) => apiRequest(`/reservas/${localid}`, "GET", null, true);

// Realizar una reserva (este ejemplo no usa token, pero ajústalo si es necesario)
export const realizaReserva = (localId, usuarioId, fecha) =>
  apiRequest("/reservas", "POST", { local_id: localId, user_id: usuarioId, fecha });

// Realizar una reserva (este ejemplo no usa token, pero ajústalo si es necesario)
export const actualizarReserva = (reserva_id, localId, fecha) =>
  apiRequest(`/reservas/${reserva_id}`, "PUT", { local_id: localId, fecha });

export const eliminarReserva = (reserva_id) => apiRequest(`/reservas/${reserva_id}`, "DELETE");

// Iniciar sesión (incluye credentials para enviar cookies, si es necesario)
export const loginUsuario = (email, password) =>
  apiRequest("/auth/login", "POST", { email, password }, false, { credentials: "include" });

// Registrar un usuario
export const registrarUsuario = ({ nombre, email, password, rol }) =>
  apiRequest("/auth/registro", "POST", { nombre, email, password, rol });

export const updateUsuario = ({ id, nombre, password }) =>
  apiRequest("/auth/actualizar", "PUT", { id, nombre, password });
