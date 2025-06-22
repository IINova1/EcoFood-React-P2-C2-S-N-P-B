import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SolicitudesEmpresa() {
    const { user } = useAuth();
    const [solicitudes, setSolicitudes] = useState([]);
    const navigate = useNavigate();

    const cargarSolicitudes = async () => {
        if (!user?.displayName) return; // O el campo donde tienes el nombre de la empresa
        const ref = collection(db, "pedidos");
        const q = query(ref, where("empresaNombre", "==", user.displayName)); // O user.nombre
        const snap = await getDocs(q);
        const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSolicitudes(docs);
    };

    useEffect(() => {
        cargarSolicitudes();
        // eslint-disable-next-line
    }, [user]);

    const actualizarEstado = async (id, nuevoEstado) => {
        const ref = doc(db, "pedidos", id);
        await updateDoc(ref, { estado: nuevoEstado });
        Swal.fire("Listo", `Solicitud ${nuevoEstado === "confirmado" ? "confirmada" : "rechazada"}`, "success");
        cargarSolicitudes();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Solicitudes de Productos</h2>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
            </div>
            {solicitudes.length === 0 ? (
                <p>No hay solicitudes.</p>
            ) : (
                <div className="row">
                    {solicitudes.map(s => (
                        <div className="col-md-6 mb-3" key={s.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{s.productoNombre}</h5>
                                    <p className="card-text">
                                        Cliente: {s.clienteId}<br />
                                        Cantidad: {s.cantidad}<br />
                                        Estado: {s.estado}
                                    </p>
                                    {s.estado === "pendiente" && (
                                        <>
                                            <button className="btn btn-success me-2" onClick={() => actualizarEstado(s.id, "confirmado")}>
                                                Confirmar
                                            </button>
                                            <button className="btn btn-danger" onClick={() => actualizarEstado(s.id, "rechazado")}>
                                                Rechazar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}