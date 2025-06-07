import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import AdminLayout from '../components/admin/layout/AdminLayout';
import ProtectedRoute from '../routes/ProtectedRoute'; // Asegúrate de importar esto

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
import Administracion from '../pages/Administracion';
import ListaClientes from "../pages/admin/clientes/ListaClientes";
import FormularioCliente from "../pages/admin/clientes/FormularioCliente";

export default function AppRouter() {
  return (
    <Routes>

      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar" element={<Recuperar />} />

      {/* RUTAS DE REGISTRO DE ADMIN Y EMPRESA → AHORA PROTEGIDAS */}
      <Route path="/registro/admin" element={
        <ProtectedRoute>
          <RegistroAdmin />
        </ProtectedRoute>
      } />

      <Route path="/registro/empresa" element={
        <ProtectedRoute>
          <RegistroEmpresa />
        </ProtectedRoute>
      } />

      {/* RUTAS ADMIN TODAS DENTRO DE PROTECTED ROUTE Y ADMINLAYOUT */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardAdmin />} />
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="empresas" element={<EmpresasAdmin />} />
        <Route path="clientes" element={<ClientesAdmin />} />
        <Route path="administradores" element={<AdministradoresAdmin />} />
        <Route path="administracion" element={<Administracion />} />
        <Route path="registro" element={<RegistroAdmin />} /> {/* <-- AGREGA ESTA LÍNEA */}

        {/* CRUD CLIENTES */}
        <Route path="clientes" element={<ListaClientes />} />
        <Route path="clientes/nuevo" element={<FormularioCliente />} />
        <Route path="clientes/editar/:id" element={<FormularioCliente />} />
      </Route>

    </Routes>
  );
}
