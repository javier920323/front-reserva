import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ReservaSuccess from "./pages/ReservaSuccess";
import Reserva from "./pages/Reserva";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PrivateRoute from "./components/PrivateRoute";
import AdminPage from "./pages/admin/AdminPage ";
import ConsultarLocales from "./pages/admin/ConsultarLocales";
import ConsultarReservas from "./pages/admin/ConsultarReservas";
import CrearLocal from "./pages/admin/CrearLocal";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/reserva-success" element={<ReservaSuccess />} />
        </Route>

        <Route path="/dashboard" element={<AdminPage />}>
          <Route path="consultar-locales" element={<ConsultarLocales />} />
          <Route path="consultar-reservas" element={<ConsultarReservas />} />
          <Route path="crear-local" element={<CrearLocal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
