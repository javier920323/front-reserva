import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ReservaSuccess from "./pages/ReservaSuccess";
import Reserva from "./pages/Reserva";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PrivateRoute from "./components/PrivateRoute";

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
      </Routes>
    </>
  );
}

export default App;
