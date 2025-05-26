import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardAdmin() {
return (
    <div style={{ padding: '2rem' }}>
    <h1>Panel de Administración</h1>
    <p>Bienvenido al módulo administrativo de EcoFood.</p>
    <nav style={{ marginTop: '1.5rem' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
            <Link to="/admin/empresas">Gestionar Empresas</Link>
        </li>
        <li>
            <Link to="/admin/clientes">Gestionar Clientes</Link>
        </li>
        <li>
            <Link to="/admin/administradores">Gestionar Administradores</Link>
        </li>
        </ul>
    </nav>
    </div>
);
}
