import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PerfilEmpresa() {
    const { user, userData } = useAuth();
    const [empresa, setEmpresa] = useState(null);
    const [editando, setEditando] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwords, setPasswords] = useState({ actual: '', nueva: '', confirma: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            setEmpresa(userData);
        }
    }, [userData]);

    const handleChange = (e) => {
        setEmpresa({ ...empresa, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const guardarCambios = async () => {
        if (!empresa.nombre.trim() || !empresa.direccion.trim() || !empresa.comuna.trim()) {
            Swal.fire("Campos Incompletos", "Por favor, completa todos los campos del perfil.", "warning");
            return;
        }
        try {
            const ref = doc(db, "usuarios", user.uid);
            await updateDoc(ref, {
                nombre: empresa.nombre,
                direccion: empresa.direccion,
                comuna: empresa.comuna,
                telefono: empresa.telefono,
            });
            Swal.fire("✅ Perfil Actualizado", "Los datos de la empresa han sido guardados.", "success");
            setEditando(false);
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            Swal.fire("❌ Error al actualizar perfil", error.message, "error");
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
            
            Swal.fire("¡Éxito!", "La contraseña ha sido actualizada.", "success");
            setShowPasswordForm(false);
            setPasswords({ actual: '', nueva: '', confirma: '' });
        } catch (error) {
            Swal.fire("Error de Autenticación", "No se pudo cambiar la contraseña. Asegúrate de que tu contraseña actual es correcta.", "error");
        }
    };

    if (!empresa) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Perfil de la Empresa</h2>
            <hr/>
            <div className="card shadow-sm mb-4">
                 <div className="card-body p-4">
                    <h5 className="card-title mb-3">Información de la Empresa</h5>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombre de la Empresa:</label>
                        <input
                            className="form-control"
                            name="nombre"
                            value={empresa.nombre || ""}
                            onChange={handleChange}
                            disabled={!editando}
                            maxLength={16}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email:</label>
                        <input className="form-control" value={empresa.email || ""} disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">RUT:</label>
                        <input className="form-control" value={empresa.rut || ""} disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Dirección:</label>
                        <input
                            className="form-control"
                            name="direccion"
                            value={empresa.direccion || ""}
                            onChange={handleChange}
                            disabled={!editando}
                            maxLength={100}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Comuna:</label>
                        <input
                            className="form-control"
                            name="comuna"
                            value={empresa.comuna || ""}
                            onChange={handleChange}
                            disabled={!editando}
                            maxLength={50}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Teléfono:</label>
                        <input
                            className="form-control"
                            name="telefono"
                            value={empresa.telefono || ""}
                            onChange={handleChange}
                            disabled={!editando}
                            maxLength={15}
                        />
                    </div>
                     {!editando ? (
                        <button className="btn btn-primary" onClick={() => setEditando(true)}>
                            Editar Datos
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-success me-2" onClick={guardarCambios}>
                                Guardar Datos
                            </button>
                            <button className="btn btn-secondary" onClick={() => setEditando(false)}>
                                Cancelar
                            </button>
                        </>
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