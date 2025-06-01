import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import AdminLayout from '../components/admin/layout/AdminLayout';

// Páginas públicas
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RegistroEmpresa from '../pages/RegistroEmpresa';
import RegistroAdmin from '../pages/RegistroAdmin';
import Recuperar from '../pages/Recuperar';

// Páginas admin
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import EmpresasAdmin from '../pages/admin/EmpresasAdmin';
import ClientesAdmin from '../pages/admin/ClientesAdmin';
import AdministradoresAdmin from '../pages/admin/AdministradoresAdmin';
import Administracion from '../pages/Administracion'; // nuevo componente

export default function AppRouter() {
  return (
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/registro/empresa" element={<RegistroEmpresa />} />
        <Route path="/registro/admin" element={<RegistroAdmin />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* Rutas admin anidadas dentro de AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="empresas" element={<EmpresasAdmin />} />
          <Route path="clientes" element={<ClientesAdmin />} />
          <Route path="administradores" element={<AdministradoresAdmin />} />
          <Route path="administracion" element={<Administracion />} />
        </Route>
      </Routes>
  );
}
