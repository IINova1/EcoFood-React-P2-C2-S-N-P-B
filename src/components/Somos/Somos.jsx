import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Somos/Somos.module.css';

export default function Somos(params) {
    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img src="/src/assets/logo.png" alt="logo.png" />
            </div>
            <div className="derechaContainer">
                <div className={styles.titulo}>
                    <h1>Somos EcoFood</h1>
                </div>
                <div className={styles.textoDerecha}>
                    <p>
                        Una organización comprometida con la reducción del desperdicio alimentario mediante iniciativas educativas,
                        tecnológicas y prácticas cotidianas. Nuestro propósito es promover un mundo más justo y sostenible,
                        <br />
                        empoderando a las personas y comunidades para optimizar el uso de alimentos, minimizar residuos y proteger nuestro planeta.
                        Somos un equipo diverso formado por expertos en medio ambiente, tecnología y desarrollo comunitario, unidos por un propósito común:
                        generar conciencia, educar y activar soluciones para enfrentar este desafío global.
                    </p>
                </div>
            </div>
        </div>
    );
}
