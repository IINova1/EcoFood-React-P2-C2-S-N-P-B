// src/components/layout/HeaderAutenticado.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import Swal from "sweetalert2";
import { Dropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';


export default function HeaderAutenticado() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      Swal.fire("Error", "No se pudo cerrar la sesión.", "error");
    }
  };

  const getPathForProfile = () => {
    switch(userData?.tipo) {
      case 'cliente':
        return '/cliente/perfil';
      case 'empresa':
        return '/empresa/perfil';
      default:
        return '/';
    }
  }

  return (
    <header className="header-autenticado">
      <Link to="/" className="header-logo">EcoFood</Link>
      <div className="header-user-info">
        <Dropdown>
          <Dropdown.Toggle as="a" className="user-dropdown-toggle">
             <PersonCircle size={24} className="me-2" />
             <span>{userData?.nombre || user?.email}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item as={Link} to={getPathForProfile()}>Editar Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}