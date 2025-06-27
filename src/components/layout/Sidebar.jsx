// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HouseDoor, BoxSeam, Building, People, PersonBadge, ShieldShaded } from 'react-bootstrap-icons';

export default function Sidebar() {
  const { rol, userData } = useAuth();

  const getNavLinks = () => {
    switch (rol) {
      case 'cliente':
        return [
          { path: "/cliente/home", label: "Inicio", icon: <HouseDoor /> },
          { path: "/cliente/productos", label: "Ver Productos", icon: <BoxSeam /> },
          { path: "/cliente/pedidos", label: "Mis Solicitudes", icon: <People /> },
        ];
      case 'empresa':
        return [
          { path: "/empresa/perfil", label: "Perfil Empresa", icon: <Building /> },
          { path: "/empresa/productos", label: "Mis Productos", icon: <BoxSeam /> },
          { path: "/empresa/solicitudes", label: "Solicitudes", icon: <People /> },
        ];
      case 'admin':
        return [
            { path: "/admin/dashboard", label: "Dashboard", icon: <HouseDoor /> },
            { path: "/admin/empresas", label: "Gestionar Empresas", icon: <Building /> },
            { path: "/admin/clientes", label: "Gestionar Clientes", icon: <People /> },
            ...(userData?.esPrincipal ? [{ path: "/admin/administracion", label: "Super Admin", icon: <ShieldShaded /> }] : [])
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="sidebar">
      <ul className="nav-list">
        {getNavLinks().map(({ path, label, icon }) => (
          <li key={path}>
            <NavLink to={path} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {icon}
              <span className="nav-label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}