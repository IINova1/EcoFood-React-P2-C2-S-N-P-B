// src/components/NavbarAdmin.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavbarAdmin() {
const { logout } = useAuth();

return (
    <nav>
    <Link to="/admin">Dashboard</Link>
    <Link to="/admin/empresas">Empresas</Link>
    <Link to="/admin/clientes">Clientes</Link>
    <Link to="/admin/administradores">Administradores</Link>
    <button onClick={logout}>Cerrar sesión</button>
    </nav>
);
}
