import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function ProductoModal({ show, onHide, onSave, productoEditar }) {
const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    vencimiento: "",
    cantidad: 1,
    precio: 0,
});

useEffect(() => {
    if (productoEditar) setProducto(productoEditar);
    else
    setProducto({
        nombre: "",
        descripcion: "",
        vencimiento: "",
        cantidad: 1,
        precio: 0,
    });
}, [productoEditar]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
};

const handleSubmit = () => {
    const hoy = new Date().toISOString().split("T")[0];
    if (producto.vencimiento < hoy) {
    alert("La fecha de vencimiento no puede ser anterior a hoy");
    return;
    }
    onSave(producto);
};

return (
    <Modal show={show} onHide={onHide} backdrop="static">
    <Modal.Header closeButton>
        <Modal.Title>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
        <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={producto.nombre} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control name="descripcion" value={producto.descripcion} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
            <Form.Label>Vencimiento</Form.Label>
            <Form.Control type="date" name="vencimiento" value={producto.vencimiento} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type="number" name="cantidad" value={producto.cantidad} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="precio" value={producto.precio} onChange={handleChange} required />
        </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
    </Modal.Footer>
    </Modal>
);
}
