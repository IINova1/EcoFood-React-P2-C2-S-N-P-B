import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase';

function ProtectedRoute({ children }) {
const [cargando, setCargando] = useState(true);
const [usuario, setUsuario] = useState(null);

useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
    setUsuario(user);
    setCargando(false);
    });
    return () => unsub();
}, []);

if (cargando) return <p>Cargando...</p>;

if (!usuario || !usuario.emailVerified) return <Navigate to="/login" />;

return children;
}

export default ProtectedRoute;