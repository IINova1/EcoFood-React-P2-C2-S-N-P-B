// src/routes/ProtectedByRole.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedByRole({ allowed, requirePrincipal = false, children }) {
const { userData, loading } = useAuth();

if (loading) return <p>Cargando...</p>;

if (!userData || !allowed.includes(userData.tipo)) {
    return <Navigate to="/login" />;
}

if (requirePrincipal && !userData.esPrincipal) {
    return <p>No autorizado: se requiere administrador principal.</p>;
}

return children;
}
