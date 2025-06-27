import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function MisPedidos() {
    const { user } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const cargarPedidos = async () => {
        if (!user) return;
        setLoading(true);
        const ref = collection(db, "pedidos");
        const q = query(ref, where("clienteId", "==", user.uid));
        const snap = await getDocs(q);
        const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPedidos(docs);
        setLoading(false);
    };

    useEffect(() => {
        if (user?.uid) {
            cargarPedidos();
        }
    }, [user]);

    const cancelarSolicitud = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro de cancelar?',
            text: "No podrás revertir esta acción.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cancelar solicitud',
            cancelButtonText: 'No'
        });

        if (confirm.isConfirmed) {
            try {
                await deleteDoc(doc(db, "pedidos", id));
                Swal.fire('Cancelado', 'Tu solicitud ha sido cancelada exitosamente.', 'success');
                cargarPedidos(); // Recargar la lista de pedidos
            } catch (error) {
                console.error("Error al cancelar pedido: ", error);
                Swal.fire('Error', 'No se pudo cancelar la solicitud.', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Mis Solicitudes</h2>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    ← Volver
                </button>
            </div>
            <hr />
            {pedidos.length === 0 ? (
                <div className="text-center p-5">
                    <p className="lead">Aún no has realizado ninguna solicitud.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/cliente/productos')}>
                        Explorar Productos
                    </button>
                </div>
            ) : (
                <div className="list-group">
                    {pedidos.map(s => (
                        <div key={s.id} className="list-group-item list-group-item-action d-flex flex-wrap justify-content-between align-items-center">
                            <div className="me-auto">
                                <h5 className="mb-1">{s.productoNombre}</h5>
                                <p className="mb-1 text-muted">Empresa: {s.empresaNombre}</p>
                                <p className="mb-1">Cantidad solicitada: {s.cantidad}</p>
                                <small>Estado: 
                                    <span 
                                        className={`fw-bold ms-1 px-2 py-1 rounded-pill small bg-${
                                            s.estado === 'pendiente' ? 'warning' : s.estado === 'confirmado' ? 'success' : 'danger'
                                        } text-white`}
                                    >
                                        {s.estado}
                                    </span>
                                </small>
                            </div>
                            <div className="mt-2 mt-md-0">
                                {/* El botón "Cancelar" solo aparece si el pedido está pendiente */}
                                {s.estado === 'pendiente' && (
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => cancelarSolicitud(s.id)}
                                    >
                                        Cancelar Solicitud
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}