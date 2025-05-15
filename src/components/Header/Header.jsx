import React from 'react';
import styles from './header.module.css'; // Importas los estilos

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
                        <button onClick={() => window.location.href = 'Comentarios.html'}>Comentarios</button>
                        <button onClick={() => window.location.href = 'contactos.html'}>Contacto</button>
                        <button onClick={() => window.location.href = 'Login.html'}>Iniciar Sesión</button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
