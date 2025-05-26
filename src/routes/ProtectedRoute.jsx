import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProtectedRoute({ children }) {
const [cargando, setCargando] = useState(true);
const [autorizado, setAutorizado] = useState(false);

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user && user.emailVerified) {
        try {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const datos = docSnap.data();
            if (datos.rol === 'admin') {
            setAutorizado(true);
            }
        }
        } catch (error) {
        console.error("Error verificando el rol:", error);
        }
    }
    setCargando(false);
    });

    return () => unsubscribe();
}, []);

if (cargando) return <p>Cargando...</p>;

if (!autorizado) return <Navigate to="/login" />;

return children;
}

export default ProtectedRoute;
