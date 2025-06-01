// src/components/admin/EmpresaForm.jsx
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, secondaryAuth } from '../../services/firebase';

const initialState = {
nombre: '',
rut: '',
direccion: '',
comuna: '',
email: '',
telefono: '',
password: '',
};

export default function EmpresaForm({ empresaEditando, setEmpresaEditando }) {
const [empresa, setEmpresa] = useState(initialState);
const [mensaje, setMensaje] = useState('');

useEffect(() => {
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
        // Guardar en colección de empresas (opcional)
        await addDoc(collection(db, 'empresas'), empresa);

        // Registrar en Firebase Auth con secondaryAuth
        const cred = await createUserWithEmailAndPassword(
        secondaryAuth,
        empresa.email,
        empresa.password
        );

        await sendEmailVerification(cred.user);

        // Guardar usuario con tipo "empresa" en Firestore
        await setDoc(doc(db, 'usuarios', cred.user.uid), {
        nombre: empresa.nombre,
        rut: empresa.rut,
        direccion: empresa.direccion,
        comuna: empresa.comuna,
        email: empresa.email,
        telefono: empresa.telefono || '',
        tipo: 'empresa',
        });

        await secondaryAuth.signOut(); // Cierra sesión secundaria
        setMensaje('✅ Empresa registrada. Revisa tu correo para verificar la cuenta.');
    }

    setEmpresa(initialState);
    } catch (error) {
    console.error('Error al guardar empresa:', error);
    setMensaje(`❌ Error: ${error.message}`);
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
    <input type="password" name="password" placeholder="Contraseña" value={empresa.password} onChange={handleChange} required />

    <button type="submit">
        {empresaEditando ? 'Actualizar Empresa' : 'Agregar Empresa'}
    </button>

    {mensaje && <p className="mt-3 text-info">{mensaje}</p>}
    </form>
);
}
