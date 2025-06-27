import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EditarPerfil() {
    const { user, userData } = useAuth();
    const [datos, setDatos] = useState(null);
    const [editando, setEditando] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwords, setPasswords] = useState({ actual: '', nueva: '', confirma: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            setDatos(userData);
        }
    }, [userData]);

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };
    
    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const guardarDatos = async () => {
        if (!datos.nombre.trim() || !datos.direccion.trim()) {
            Swal.fire("Campos vacíos", "El nombre y la dirección no pueden estar vacíos.", "warning");
            return;
        }
        try {
            const ref = doc(db, "usuarios", user.uid);
            await updateDoc(ref, {
                nombre: datos.nombre,
                telefono: datos.telefono,
                direccion: datos.direccion,
            });
            Swal.fire("✅ Perfil Actualizado", "Tus datos han sido guardados.", "success");
            setEditando(false);
        } catch (error) {
            Swal.fire("❌ Error", error.message, "error");
        }
    };
    
    const cambiarContrasena = async (e) => {
        e.preventDefault();
        
        if (passwords.nueva !== passwords.confirma) {
            Swal.fire("Error", "Las contraseñas nuevas no coinciden.", "error");
            return;
        }
        if (passwords.nueva.length < 6) {
            Swal.fire("Contraseña Débil", "La nueva contraseña debe tener al menos 6 caracteres.", "error");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, passwords.actual);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, passwords.nueva);
            
            Swal.fire("¡Éxito!", "Tu contraseña ha sido actualizada.", "success");
            setShowPasswordForm(false);
            setPasswords({ actual: '', nueva: '', confirma: '' });
        } catch (error) {
            console.error(error);
            Swal.fire("Error de Autenticación", "No se pudo cambiar la contraseña. Asegúrate de que tu contraseña actual sea correcta.", "error");
        }
    };

    if (!datos) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                 <h2>Editar Perfil de Cliente</h2>
                 <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>← Volver</button>
            </div>
            
            <div className="card shadow-sm mb-4">
                <div className="card-body p-4">
                    <h5 className="card-title mb-3">Información Personal</h5>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombre:</label>
                        <input className="form-control" name="nombre" value={datos.nombre || ''} onChange={handleChange} disabled={!editando} maxLength={16} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email:</label>
                        <input className="form-control" value={datos.email || ''} disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Teléfono:</label>
                        <input className="form-control" name="telefono" value={datos.telefono || ''} onChange={handleChange} disabled={!editando} maxLength={15} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Dirección:</label>
                        <input className="form-control" name="direccion" value={datos.direccion || ''} onChange={handleChange} disabled={!editando} maxLength={100} />
                    </div>
                    
                    {!editando ? (
                        <button className="btn btn-primary" onClick={() => setEditando(true)}>Editar Datos</button>
                    ) : (
                        <div>
                            <button className="btn btn-success me-2" onClick={guardarDatos}>Guardar Datos</button>
                            <button className="btn btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h5 className="card-title">Seguridad</h5>
                    {!showPasswordForm ? (
                        <button className="btn btn-secondary" onClick={() => setShowPasswordForm(true)}>
                            Cambiar Contraseña
                        </button>
                    ) : (
                        <form onSubmit={cambiarContrasena} className="mt-3">
                            <p>Para cambiar tu contraseña, ingresa tu contraseña actual y luego la nueva.</p>
                            <div className="mb-3">
                                <label className="form-label">Contraseña Actual</label>
                                <input type="password" name="actual" className="form-control" value={passwords.actual} onChange={handlePasswordChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nueva Contraseña</label>
                                <input type="password" name="nueva" className="form-control" value={passwords.nueva} onChange={handlePasswordChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirmar Nueva Contraseña</label>
                                <input type="password" name="confirma" className="form-control" value={passwords.confirma} onChange={handlePasswordChange} required />
                            </div>
                            <button type="submit" className="btn btn-success me-2">Confirmar Cambio</button>
                            <button type="button" className="btn btn-light" onClick={() => setShowPasswordForm(false)}>Cancelar</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}