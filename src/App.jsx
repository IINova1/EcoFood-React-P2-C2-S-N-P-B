import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes de páginas
import RegistroClientes from "./pages/RegistroClientes";
import Login from "./pages/Login";
import Recuperar from "./pages/Recuperar";
import Landing from "./pages/Landing"; // antes Home

// Ruta protegida
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegistroClientes />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
