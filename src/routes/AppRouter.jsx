import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";

// Layout
import AdminLayout from "../components/admin/layout/AdminLayout";

// Páginas públicas
import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RegistroEmpresa from "../pages/RegistroEmpresa";
import RegistroAdmin from "../pages/RegistroAdmin";
import Recuperar from "../pages/Recuperar";

// Páginas cliente
import ClienteDashboard from "../pages/admin/clientes/ClienteDashboard"; // Asegúrate de que esta sea la ruta correcta

// Página administración (fuera de admin/)
import Administracion from "../pages/Administracion";

// Páginas empresa
import PerfilEmpresa from "../pages/empresa/PerfilEmpresa";
import ProductosEmpresa from "../pages/empresa/ProductosEmpresa";

// Páginas admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import EmpresasAdmin from "../pages/admin/EmpresasAdmin";
import ClientesAdmin from "../pages/admin/ClientesAdmin";
import AdministradoresAdmin from "../pages/admin/AdministradoresAdmin";
import ListaClientes from "../pages/admin/clientes/ListaClientes";
import FormularioCliente from "../pages/admin/clientes/FormularioCliente";

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

      {/* Rutas protegidas CLIENTE */}
      <Route
        path="/cliente/dashboard"
        element={
          <ProtectedRoute role="cliente">
            <ClienteDashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas EMPRESA */}
      <Route
        path="/empresa/perfil"
        element={
          <ProtectedRoute role="empresa">
            <PerfilEmpresa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/empresa/productos"
        element={
          <ProtectedRoute role="empresa">
            <ProductosEmpresa />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />} />
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="empresas" element={<EmpresasAdmin />} />
        <Route path="clientes" element={<ClientesAdmin />} />
        <Route path="administradores" element={<AdministradoresAdmin />} />
        <Route path="administracion" element={<Administracion />} />
        <Route
          path="clientes/lista"
          element={
            <ProtectedRoute role="admin">
              <ListaClientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="clientes/nuevo"
          element={
            <ProtectedRoute role="admin">
              <FormularioCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="clientes/editar/:id"
          element={
            <ProtectedRoute role="admin">
              <FormularioCliente />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
