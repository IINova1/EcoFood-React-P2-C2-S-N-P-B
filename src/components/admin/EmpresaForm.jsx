// src/components/admin/EmpresaForm.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase'; // <-- Agrega este import


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
const [mensaje, setMensaje] = useState(''); // <-- Agrega esta línea

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

    try {
    const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
    await sendEmailVerification(userCred.user);

    await setDoc(doc(db, 'usuarios', userCred.user.uid), {
        nombre: form.nombre,
        rut: form.rut,
        direccion: form.direccion,
        comuna: form.comuna,
        email: form.email,
        telefono: form.telefono || '',
        tipo: 'empresa' // ⚠ importante: registrar como cliente
    });

    setMensaje('✅ Registro exitoso. Verifica tu correo antes de iniciar sesión.');
    } catch (error) {
    setMensaje(`❌ Error: ${error.message}`);
    }

    
    setEmpresa(initialState);
    } catch (error) {
    console.error('Error al guardar empresa:', error);
    }
};

<form onSubmit={handleSubmit}>
    {/* ...inputs... */}
    <button type="submit">
        {empresaEditando ? 'Actualizar Empresa' : 'Agregar Empresa'}
    </button>
    <p className="mt-3 text-info">{mensaje}</p> {/* Muestra el mensaje */}
</form>

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
