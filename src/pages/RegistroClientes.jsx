import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../styles.css';
import '../stylescert.css';

function RegistroCliente() {
const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    direccion: '',
    comuna: '',
    telefono: ''
});
const [mensaje, setMensaje] = useState('');

const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const validarPassword = password =>
    password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);

const handleSubmit = async e => {
    e.preventDefault();

    if (!validarPassword(form.password)) {
    setMensaje('La contraseña debe tener al menos 6 caracteres, letras y números.');
    return;
    }

    try {
    const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
    await sendEmailVerification(userCred.user);

    await setDoc(doc(db, 'usuarios', userCred.user.uid), {
        nombre: form.nombre,
        email: form.email,
        direccion: form.direccion,
        comuna: form.comuna,
        telefono: form.telefono || '',
        tipo: 'cliente'
    });

    setMensaje('Registro exitoso. Verifica tu correo antes de iniciar sesión.');
    } catch (error) {
    setMensaje(`Error: ${error.message}`);
    }
};

return (
    <div className="container mt-4">
    <h2>Registro de Cliente</h2>
    <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="nombre" placeholder="Nombre completo" onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input className="form-control mb-2" name="direccion" placeholder="Dirección" onChange={handleChange} required />
        <input className="form-control mb-2" name="comuna" placeholder="Comuna" onChange={handleChange} required />
        <input className="form-control mb-2" name="telefono" placeholder="Teléfono (opcional)" onChange={handleChange} />
        <button className="btn btn-success" type="submit">Registrarse</button>
    </form>
    <p className="mt-3">{mensaje}</p>
    </div>
);
}

export default RegistroCliente;
