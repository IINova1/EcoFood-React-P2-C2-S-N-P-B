import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { crearPedido } from "../services/pedidoService";

export default function ProductoCard({ producto, recargar }) {
const { user } = useAuth();

const solicitar = async () => {
    const confirm = await Swal.fire({
    title: `¿Solicitar "${producto.nombre}"?`,
    text: `Confirmas solicitar este producto a ${producto.empresaNombre}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, solicitar",
    });

    if (confirm.isConfirmed) {
    try {
        await crearPedido({
        productoId: producto.id,
        clienteId: user.uid,
        estado: "pendiente",
        fecha: new Date(),
        });
        Swal.fire("✅ Solicitud enviada", "", "success");
        if (recargar) recargar();
    } catch (error) {
        console.error("Error al solicitar:", error);
        Swal.fire("❌ Error", "No se pudo realizar la solicitud", "error");
    }
    }
};

return (
    <div className="card h-100">
    <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className="card-text">
        Empresa: <strong>{producto.empresaNombre || 'Desconocida'}</strong>
        </p>
        <p className="card-text">
        Precio: <strong>${producto.precio === 0 ? 'Gratuito' : producto.precio}</strong>
        </p>
        <button className="btn btn-success" onClick={solicitar}>
        Solicitar
        </button>
    </div>
    </div>
);
}
