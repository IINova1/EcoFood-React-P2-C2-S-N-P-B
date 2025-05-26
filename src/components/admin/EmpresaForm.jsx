// src/components/admin/EmpresaForm.jsx
import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const initialState = {
nombre: '',
rut: '',
direccion: '',
comuna: '',
email: '',
telefono: '',
};

export default function EmpresaForm({ empresaEditando, setEmpresaEditando }) {
const [empresa, setEmpresa] = useState(initialState);

  // Si hay una empresa para editar, se carga en el formulario
useState(() => {
    if (empresaEditando) {
    setEmpresa(empresaEditando);
    }
}, [empresaEditando]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    if (empresaEditando) {
        const empresaRef = doc(db, 'empresas', empresaEditando.id);
        await updateDoc(empresaRef, empresa);
        setEmpresaEditando(null);
    } else {
        await addDoc(collection(db, 'empresas'), empresa);
    }

    setEmpresa(initialState);
    } catch (error) {
    console.error('Error al guardar empresa:', error);
    }
};

return (
    <form onSubmit={handleSubmit}>
    <input name="nombre" placeholder="Nombre" value={empresa.nombre} onChange={handleChange} required />
    <input name="rut" placeholder="RUT" value={empresa.rut} onChange={handleChange} required />
    <input name="direccion" placeholder="Dirección" value={empresa.direccion} onChange={handleChange} required />
    <input name="comuna" placeholder="Comuna" value={empresa.comuna} onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" value={empresa.email} onChange={handleChange} required />
    <input name="telefono" placeholder="Teléfono" value={empresa.telefono} onChange={handleChange} required />

    <button type="submit">
        {empresaEditando ? 'Actualizar Empresa' : 'Agregar Empresa'}
    </button>
    </form>
);
}
