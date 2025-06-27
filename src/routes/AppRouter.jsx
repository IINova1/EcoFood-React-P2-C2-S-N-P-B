import { Routes, Route, Navigate } from 'react-router-dom';

// Componentes del Layout y Rutas Protegidas
import LayoutPrincipal from '../components/layout/LayoutPrincipal';
import ProtectedRoute from './ProtectedRoute';

// --- Páginas Públicas ---
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Recuperar from '../pages/Recuperar';

// --- Páginas del Administrador ---
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import EmpresasAdmin from '../pages/admin/EmpresasAdmin';
import ClientesAdmin from '../pages/admin/ClientesAdmin';
import Administracion from '../pages/Administracion';

// --- Páginas de la Empresa ---
import PerfilEmpresa from '../pages/empresa/PerfilEmpresa';
import ProductosEmpresa from '../pages/empresa/ProductosEmpresa';
import SolicitudesEmpresa from '../pages/empresa/SolicitudesEmpresa';

// --- Páginas del Cliente ---
import HomeCliente from '../pages/cliente/HomeCliente';
import VerProductos from '../pages/cliente/VerProductos';
import MisPedidos from '../pages/cliente/MisPedidos';
import EditarPerfil from '../pages/cliente/EditarPerfil';

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas Públicas: No usan el layout principal */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar" element={<Recuperar />} />

      {/* Rutas Protegidas: Usan el nuevo LayoutPrincipal con Header y Sidebar */}
      <Route element={<LayoutPrincipal />}>
        
        {/* Rutas para el rol "cliente" */}
        <Route path="/cliente/home" element={<ProtectedRoute requiredRole="cliente"><HomeCliente /></ProtectedRoute>} />
        <Route path="/cliente/productos" element={<ProtectedRoute requiredRole="cliente"><VerProductos /></ProtectedRoute>} />
        <Route path="/cliente/pedidos" element={<ProtectedRoute requiredRole="cliente"><MisPedidos /></ProtectedRoute>} />
        <Route path="/cliente/perfil" element={<ProtectedRoute requiredRole="cliente"><EditarPerfil /></ProtectedRoute>} />

        {/* Rutas para el rol "empresa" */}
        <Route path="/empresa/perfil" element={<ProtectedRoute requiredRole="empresa"><PerfilEmpresa /></ProtectedRoute>} />
        <Route path="/empresa/productos" element={<ProtectedRoute requiredRole="empresa"><ProductosEmpresa /></ProtectedRoute>} />
        <Route path="/empresa/solicitudes" element={<ProtectedRoute requiredRole="empresa"><SolicitudesEmpresa /></ProtectedRoute>} />
        
        {/* Rutas para el rol "admin" */}
        <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><DashboardAdmin /></ProtectedRoute>} />
        <Route path="/admin/empresas" element={<ProtectedRoute requiredRole="admin"><EmpresasAdmin /></ProtectedRoute>} />
        <Route path="/admin/clientes" element={<ProtectedRoute requiredRole="admin"><ClientesAdmin /></ProtectedRoute>} />
        <Route path="/admin/administracion" element={<ProtectedRoute requiredRole="admin"><Administracion /></ProtectedRoute>} />

      </Route>

      {/* Redirección para cualquier otra ruta no definida */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}