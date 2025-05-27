import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts y rutas protegidas
import ProtectedByRole from './routes/ProtectedByRole';
import AdminLayout from './components/admin/layout/AdminLayout';

// Páginas públicas
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegistroEmpresa from './pages/RegistroEmpresa';
import RegistroAdmin from './pages/RegistroAdmin';
import Recuperar from './pages/Recuperar';

// Páginas admin (subrutas)
import DashboardAdmin from './pages/admin/DashboardAdmin';
import EmpresasAdmin from './pages/admin/EmpresasAdmin';
import ClientesAdmin from './pages/admin/ClientesAdmin';
import AdministradoresAdmin from './pages/admin/AdministradoresAdmin';

export default function AppRouter() {
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/registro/empresa" element={<RegistroEmpresa />} />
        <Route path="/registro/admin" element={<RegistroAdmin />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* Rutas protegidas para ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedByRole allowed={["admin"]}>
              <AdminLayout />
            </ProtectedByRole>
          }
        >
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="empresas" element={<EmpresasAdmin />} />
          <Route path="clientes" element={<ClientesAdmin />} />
          <Route path="administradores" element={<AdministradoresAdmin />} />
        </Route>

      </Routes>
    </Router>
  );
}
