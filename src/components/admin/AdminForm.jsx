// src/components/admin/AdminForm.jsx
import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const initialState = {
nombre: '',
email: '',
tipo: 'admin',
  esPrincipal: false, // por defecto no es principal
};

export default function AdminForm({ adminEditando, setAdminEditando }) {
const [admin, setAdmin] = useState(initialState);

useState(() => {
    if (adminEditando) setAdmin(adminEditando);
}, [adminEditando]);

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdmin({ ...admin, [name]: type === 'checkbox' ? checked : value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    if (adminEditando) {
        const ref = doc(db, 'usuarios', adminEditando.id);
        await updateDoc(ref, admin);
        setAdminEditando(null);
    } else {
        await addDoc(collection(db, 'usuarios'), admin);
    }
    setAdmin(initialState);
    } catch (error) {
    console.error('Error guardando admin:', error);
    }
};

return (
    <form onSubmit={handleSubmit}>
    <input name="nombre" placeholder="Nombre" value={admin.nombre} onChange={handleChange} required />
    <input name="email" placeholder="Email" value={admin.email} onChange={handleChange} required />
    <label>
        ¿Es principal?
        <input type="checkbox" name="esPrincipal" checked={admin.esPrincipal} onChange={handleChange} />
    </label>
    <button type="submit">
        {adminEditando ? 'Actualizar Admin' : 'Agregar Admin'}
    </button>
    </form>
);
}
