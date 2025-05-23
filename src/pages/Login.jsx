import { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../components/login.css';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleLogin = async e => {
    e.preventDefault();
    try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    if (!userCred.user.emailVerified) {
        setError('Debes verificar tu correo antes de iniciar sesión.');
        return;
    }
    navigate('/home');
    } catch (err) {
    setError('Credenciales inválidas o error de conexión.');
    }
};

return (
    <div className="container mt-4">
    <h2>Iniciar Sesión</h2>
    <form onSubmit={handleLogin}>
        <input className="form-control mb-2" type="email" placeholder="Correo" onChange={e => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-success">Ingresar</button>
    </form>
    <p className="text-danger mt-3">{error}</p>
    </div>
);
}

export default Login;