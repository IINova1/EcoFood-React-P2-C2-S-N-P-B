import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "../routes/ProtectedRoute";

// Layout
import Layout from "../layout/Layout";

// Páginas públicas
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import RegistroCliente from "../pages/RegistroCliente";
import RegistroEmpresa from "../pages/RegistroEmpresa";
import RegistroAdmin from "../pages/RegistroAdmin";
import Recuperar from "../pages/Recuperar";

// Páginas admin
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import EmpresasAdmin from '../pages/admin/EmpresasAdmin';
import ClientesAdmin from '../pages/admin/ClientesAdmin';
import AdministradoresAdmin from '../pages/admin/AdministradoresAdmin';
import Administracion from '../pages/Administracion';
import ListaClientes from "../pages/admin/clientes/ListaClientes";
import FormularioCliente from "../pages/admin/clientes/FormularioCliente";
import ClienteDashboard from '../pages/admin/clientes/ClienteDashboard'; // ✅ Ruta corregida

// Páginas empresa
import PerfilEmpresa from '../pages/empresa/PerfilEmpresa';
import ProductosEmpresa from '../pages/empresa/ProductosEmpresa';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas públicas */}
        <Route index element={<Inicio />} />
        <Route path="login" element={<Login />} />
        <Route path="registro/cliente" element={<RegistroCliente />} />
        <Route path="registro/empresa" element={<RegistroEmpresa />} />
        <Route path="registro/admin" element={<RegistroAdmin />} />
        <Route path="recuperar" element={<Recuperar />} />

        {/* Rutas protegidas CLIENTE */}
        <Route path="cliente/dashboard" element={
          <ProtectedRoute role="cliente">
            <ClienteDashboard />
          </ProtectedRoute>
        } />

        {/* Rutas protegidas EMPRESA */}
        <Route path="empresa/perfil" element={
          <ProtectedRoute role="empresa">
            <PerfilEmpresa />
          </ProtectedRoute>
        } />
        <Route path="empresa/productos" element={
          <ProtectedRoute role="empresa">
            <ProductosEmpresa />
          </ProtectedRoute>
        } />

        {/* Rutas protegidas ADMIN */}
        <Route path="admin/dashboard" element={
          <ProtectedRoute role="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        } />
        <Route path="admin/empresas" element={
          <ProtectedRoute role="admin">
            <EmpresasAdmin />
          </ProtectedRoute>
        } />
        <Route path="admin/clientes" element={
          <ProtectedRoute role="admin">
            <ClientesAdmin />
          </ProtectedRoute>
        } />
        <Route path="admin/administradores" element={
          <ProtectedRoute role="admin">
            <AdministradoresAdmin />
          </ProtectedRoute>
        } />
        <Route path="admin/administracion" element={
          <ProtectedRoute role="admin">
            <Administracion />
          </ProtectedRoute>
        } />
        <Route path="admin/clientes/lista" element={
          <ProtectedRoute role="admin">
            <ListaClientes />
          </ProtectedRoute>
        } />
        <Route path="admin/clientes/nuevo" element={
          <ProtectedRoute role="admin">
            <FormularioCliente />
          </ProtectedRoute>
        } />
        <Route path="admin/clientes/editar/:id" element={
          <ProtectedRoute role="admin">
            <FormularioCliente />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}
