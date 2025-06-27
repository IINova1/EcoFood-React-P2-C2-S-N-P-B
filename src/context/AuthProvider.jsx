import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Primero, verifica si hay un usuario y si su correo ha sido verificado
      if (currentUser && currentUser.emailVerified) {
        // Si hay un usuario, busca sus datos en la colección "usuarios" de Firestore
        const ref = doc(db, "usuarios", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          // Si el documento existe, guarda los datos en los estados
          const data = snap.data();
          setRol(data.tipo || "sin-rol"); // Establece el rol (cliente, empresa, admin)
          setUserData(data);               // Guarda todos los datos del usuario (nombre, etc.)
          setUser(currentUser);            // Guarda el objeto de autenticación de Firebase
        } else {
          // Si no hay documento en Firestore, limpia los estados
          console.error("Error: Usuario autenticado pero sin datos en Firestore.");
          setUser(null);
          setRol(null);
          setUserData(null);
        }
      } else {
        // Si no hay usuario o no ha verificado su correo, limpia todos los estados
        if (currentUser && !currentUser.emailVerified) {
          console.log("Usuario no ha verificado su correo.");
        }
        setUser(null);
        setRol(null);
        setUserData(null);
      }
      
      // La carga inicial ha terminado
      setLoading(false);
    });

    // Limpia el listener cuando el componente se desmonta para evitar fugas de memoria
    return () => unsubscribe();
  }, []);

  // Muestra un mensaje de carga mientras se verifica la sesión
  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );
  }

  // Provee el estado de autenticación a toda la aplicación
  return (
    <AuthContext.Provider value={{ user, rol, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};