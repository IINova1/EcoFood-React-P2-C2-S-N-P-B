import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";

export default function EditarPerfil() {
    const { user } = useAuth();
    const [datos, setDatos] = useState(null);
    const [editando, setEditando] = useState(false);
    const [nuevaPassword, setNuevaPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const obtener = async () => {
            const ref = doc(db, "usuarios", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) setDatos(snap.data());
        };
        if (user) obtener();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    };

    const guardar = async () => {
        try {
            const ref = doc(db, "usuarios", user.uid);

            await updateDoc(ref, {
                nombre: datos.nombre,
                telefono: datos.telefono,
                direccion: datos.direccion,
            });

            // Cambiar contraseña si fue ingresada y coincide
            if (nuevaPassword || confirmarPassword) {
                if (nuevaPassword !== confirmarPassword) {
                    Swal.fire("⚠️ Contraseñas no coinciden", "", "warning");
                    return;
                }
                if (nuevaPassword.length < 6) {
                    Swal.fire("⚠️ La contraseña debe tener al menos 6 caracteres", "", "warning");
                    return;
                }
                await updatePassword(user, nuevaPassword);
                Swal.fire("✅ Perfil y contraseña actualizados", "", "success");
            } else {
                Swal.fire("✅ Perfil actualizado", "", "success");
            }

            setEditando(false);
            setNuevaPassword("");
            setConfirmarPassword("");
        } catch (error) {
            Swal.fire("❌ Error", error.message, "error");
        }
    };

    if (!datos) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                ← Volver
            </button>
            <h2>Editar Perfil</h2>
            <div className="mb-3">
                <label>Nombre:</label>
                <input className="form-control" name="nombre" value={datos.nombre} onChange={handleChange} disabled={!editando} />
            </div>
            <div className="mb-3">
                <label>Email:</label>
                <input className="form-control" value={datos.email} disabled />
            </div>
            <div className="mb-3">
                <label>Teléfono:</label>
                <input className="form-control" name="telefono" value={datos.telefono} onChange={handleChange} disabled={!editando} />
            </div>
            <div className="mb-3">
                <label>Dirección:</label>
                <input className="form-control" name="direccion" value={datos.direccion} onChange={handleChange} disabled={!editando} />
            </div>

            {editando && (
                <>
                    <div className="mb-3">
                        <label>Nueva Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={nuevaPassword}
                            onChange={e => setNuevaPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirmar Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmarPassword}
                            onChange={e => setConfirmarPassword(e.target.value)}
                        />
                    </div>
                </>
            )}

            {!editando ? (
                <button className="btn btn-primary" onClick={() => setEditando(true)}>Editar</button>
            ) : (
                <>
                    <button className="btn btn-success me-2" onClick={guardar}>Guardar</button>
                    <button className="btn btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
                </>
            )}
        </div>
    );
}
