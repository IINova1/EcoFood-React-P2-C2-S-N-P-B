import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../AdministradoresAdmin.css';

const UID_ADMIN_PRINCIPAL = 'uid-del-admin-principal'; // <-- reemplaza esto por el UID real

const AdministradoresAdmin = () => {
const [admins, setAdmins] = useState([]);
const [nuevoAdmin, setNuevoAdmin] = useState({ nombre: '', email: '', tipo: 'admin' });
const [modoEdicion, setModoEdicion] = useState(false);
const [idActual, setIdActual] = useState(null);

const obtenerAdmins = async () => {
    const q = query(collection(db, "usuarios"), where("tipo", "==", "admin"));
    const querySnapshot = await getDocs(q);
    const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAdmins(lista);
};

const manejarCambio = (e) => {
    setNuevoAdmin({ ...nuevoAdmin, [e.target.name]: e.target.value });
};

const agregarAdmin = async () => {
    if (!nuevoAdmin.nombre || !nuevoAdmin.email) return alert("Completa todos los campos.");
    await addDoc(collection(db, "usuarios"), nuevoAdmin);
    setNuevoAdmin({ nombre: '', email: '', tipo: 'admin' });
    obtenerAdmins();
};

const editarAdmin = (admin) => {
    setModoEdicion(true);
    setNuevoAdmin({ nombre: admin.nombre, email: admin.email, tipo: 'admin' });
    setIdActual(admin.id);
};

const actualizarAdmin = async () => {
    if (!nuevoAdmin.nombre || !nuevoAdmin.email) return alert("Completa todos los campos.");
    await updateDoc(doc(db, "usuarios", idActual), nuevoAdmin);
    setNuevoAdmin({ nombre: '', email: '', tipo: 'admin' });
    setModoEdicion(false);
    setIdActual(null);
    obtenerAdmins();
};

const eliminarAdmin = async (id) => {
    if (id === UID_ADMIN_PRINCIPAL) {
    alert("❌ No se puede eliminar al administrador principal.");
    return;
    }
    if (confirm("¿Eliminar este administrador?")) {
    await deleteDoc(doc(db, "usuarios", id));
    obtenerAdmins();
    }
};

useEffect(() => {
    obtenerAdmins();
}, []);

return (
    <div className="admins-admin">
    <h2>Administradores</h2>

    <div className="formulario">
        <input name="nombre" placeholder="Nombre" value={nuevoAdmin.nombre} onChange={manejarCambio} />
        <input name="email" placeholder="Email" value={nuevoAdmin.email} onChange={manejarCambio} />
        {!modoEdicion ? (
        <button onClick={agregarAdmin}>Agregar</button>
        ) : (
        <button onClick={actualizarAdmin}>Actualizar</button>
        )}
    </div>

    <table>
        <thead>
        <tr>
            <th>Nombre</th><th>Email</th><th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {admins.map((admin) => (
            <tr key={admin.id}>
            <td>{admin.nombre}</td>
            <td>{admin.email}</td>
            <td>
                <button onClick={() => editarAdmin(admin)}>Editar</button>
                <button onClick={() => eliminarAdmin(admin.id)} disabled={admin.id === UID_ADMIN_PRINCIPAL}>
                Eliminar
                </button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default AdministradoresAdmin;
