import { Routes, Route } from 'react-router-dom';
import RegistroCliente from './pages/Register';
import Home from './pages/home';
import Login from './pages/Login';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistroCliente />} />
      <Route path="/registro" element={<RegistroCliente />} /> {/* Si quieres ambas rutas */}
    </Routes>
  );
}

export default AppRouter;