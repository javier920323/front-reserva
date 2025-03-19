import { createContext, useContext, useEffect, useState } from "react";
import { obtenerLocales } from "../api/api";

const LocalesContext = createContext();

export function LocalesProvider({ children }) {
  const [locales, setLocales] = useState([]);
  const [error, setError] = useState("");

  const fetchLocales = async () => {
    setError("");
    const data = await obtenerLocales();
    if (data.error) {
      setError(data.error);
    } else {
      setLocales(data);
    }
  };

  useEffect(() => {
    fetchLocales(); // Llamar la primera vez
  }, []);

  return (
    <LocalesContext.Provider value={{ locales, error, setLocales, fetchLocales }}>
      {children}
    </LocalesContext.Provider>
  );
}

export function useLocales() {
  return useContext(LocalesContext);
}
