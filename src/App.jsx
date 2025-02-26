import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ReservaSuccess from "./pages/ReservaSuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reserva-success" element={<ReservaSuccess />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
