import React from 'react';
import styles from './hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <h1>EcoFood</h1>
            <button 
                className="btn btn-success mt-3"
                onClick={() => window.location.href='Registro.html'}
            >
                ¡Únete Ya!
            </button>
        </section>
    );
}
