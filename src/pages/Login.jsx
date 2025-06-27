// src/pages/Login.jsx
import { useState } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (!userCred.user.emailVerified) {
        Swal.fire('Verificación Requerida', 'Debes verificar tu correo electrónico antes de iniciar sesión.', 'warning');
        setLoading(false);
        return;
      }

      const ref = doc(db, 'usuarios', userCred.user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const datos = snap.data();
        switch(datos.tipo) {
            case 'admin':
                navigate('/admin/dashboard');
                break;
            case 'cliente':
                navigate('/cliente/home');
                break;
            case 'empresa':
                navigate('/empresa/perfil');
                break;
            default:
                Swal.fire('Acceso Denegado', 'No tienes un rol asignado para acceder.', 'error');
        }
      } else {
        Swal.fire('Error de Cuenta', 'Tu cuenta no está registrada correctamente. Contacta a soporte.', 'error');
      }

    } catch (err) {
      Swal.fire('Error de Autenticación', 'Las credenciales son inválidas o hubo un error de conexión.', 'error');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '400px' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Iniciar Sesión en EcoFood</h2>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Correo electrónico"
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Correo electrónico</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          <div className="text-center mt-3">
            <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
          </div>
          <hr />
          <div className="text-center">
            <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}