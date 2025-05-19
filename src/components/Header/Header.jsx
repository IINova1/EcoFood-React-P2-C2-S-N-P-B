import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.logo}>EcoFood</p>
        <nav className={styles.nav}>
          <div className={styles.container}>
            <a href="#somos-ecofood">Quienes Somos</a>
            <a href="#que-hacemos">Qué Hacemos</a>
            <a href="#como-puedes-ayudar">Cómo Puedes Ayudar</a>
          </div>
          <div className={styles.navButtons}>
            <Link to="/comentarios"><button>Comentarios</button></Link>
            <Link to="/contactos"><button>Contacto</button></Link>
            <Link to="/login"><button>Iniciar Sesión</button></Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
