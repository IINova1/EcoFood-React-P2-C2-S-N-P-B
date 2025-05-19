// src/pages/Dashboard.jsx
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
const navigate = useNavigate();

const cerrarSesion = async () => {
    await auth.signOut();
    navigate('/');
};

return (
    <div className="container mt-5">
    <h2>Panel del Usuario</h2>
    <p>Bienvenido, estás logueado y verificado.</p>
    <button className="btn btn-danger" onClick={cerrarSesion}>
        Cerrar sesión
    </button>
    </div>
);
}

export default Dashboard;
