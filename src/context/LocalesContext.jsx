import { createContext, useContext, useEffect, useState } from "react";
import { obtenerLocales } from "../api/api";

const LocalesContext = createContext();

export function LocalesProvider({ children }) {
  const [locales, setLocales] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocales = async () => {
      setError("");
      const data = await obtenerLocales();
      if (data.error) {
        setError(data.error);
      } else {
        setLocales(data);
      }
    };
    fetchLocales();
  }, []);

  return <LocalesContext.Provider value={{ locales, error }}>{children}</LocalesContext.Provider>;
}

export function useLocales() {
  return useContext(LocalesContext);
}
