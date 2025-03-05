import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UsuarioProvider } from "./context/UsuarioContext.jsx";
import { LocalesProvider } from "./context/LocalesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <LocalesProvider>
          <App />
        </LocalesProvider>
      </UsuarioProvider>
    </BrowserRouter>
  </StrictMode>
);
