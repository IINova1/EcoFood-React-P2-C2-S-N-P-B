import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/Register'; // Asegúrate que este archivo existe

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<Register />} /> {/* Ruta para /registro */}
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default AppRouter;