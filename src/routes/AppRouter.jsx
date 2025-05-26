import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/Register';
import Login from './pages/Login'; // Asegúrate de tener este archivo
import ProtectedRoute from './components/ProtectedRoute';

// Páginas admin
import DashboardAdmin from './pages/admin/DashboardAdmin';
import EmpresasAdmin from './pages/admin/EmpresasAdmin';
import ClientesAdmin from './pages/admin/ClientesAdmin';
import AdministradoresAdmin from './pages/admin/AdministradoresAdmin';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas para administradores */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/empresas"
          element={
            <ProtectedRoute>
              <EmpresasAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clientes"
          element={
            <ProtectedRoute>
              <ClientesAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/administradores"
          element={
            <ProtectedRoute>
              <AdministradoresAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
