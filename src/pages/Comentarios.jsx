import React, { useState, useEffect } from 'react';
import styles from './Comentarios.module.css';

export default function Comentarios() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [feedback, setFeedback] = useState({ mensaje: '', tipo: '' });

  useEffect(() => {
    // Cargar comentarios guardados en localStorage al iniciar
    const saved = JSON.parse(localStorage.getItem('comentariosEcoFood')) || [];
    // Normalizar comentarios antiguos tipo string
    const norm = saved.map(c =>
      typeof c === 'string'
        ? { nombre: 'Anónimo 🤖', comentario: c, fecha: 'Fecha desconocida' }
        : c
    );
    setComentarios(norm);
  }, []);

  const mostrarFeedback = (msg, tipo = 'danger') => {
    setFeedback({ mensaje: msg, tipo });
    setTimeout(() => setFeedback({ mensaje: '', tipo: '' }), 3000);
  };

  const crearComentario = () => {
    if (!comentario.trim()) {
      mostrarFeedback('Por favor, escribe un comentario.');
      return null;
    }

    const ultimo = comentarios[comentarios.length - 1];
    const ultimoTexto = ultimo?.comentario || '';
    if (comentario.trim() === ultimoTexto.trim()) {
      mostrarFeedback('Este comentario ya fue publicado.');
      return null;
    }

    return {
      nombre: nombre.trim() || 'Anónimo 🤖',
      comentario: comentario.trim(),
      fecha: new Date().toLocaleString('es-CL'),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoComentario = crearComentario();
    if (!nuevoComentario) return;

    const nuevosComentarios = [...comentarios, nuevoComentario];
    setComentarios(nuevosComentarios);
    localStorage.setItem('comentariosEcoFood', JSON.stringify(nuevosComentarios));
    setComentario('');
    setNombre('');
  };

  const borrarComentarios = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todos los comentarios?')) {
      localStorage.removeItem('comentariosEcoFood');
      setComentarios([]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title}`}>💬 Comentarios de la Comunidad</h1>

      {feedback.mensaje && (
        <div className={`${styles.alert} ${styles[`alert-${feedback.tipo}`]} ${styles.show}`}>
          {feedback.mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.formGroup}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Tu nombre (opcional)"
            className={styles.input}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            placeholder="Tu comentario..."
            className={styles.textarea}
            rows="3"
            required
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.botonPublicar}>
          Publicar Comentario
        </button>
      </form>

      <div>
        <h3>📝 Comentarios publicados:</h3>
        {comentarios.length === 0 ? (
          <p style={{ color: 'gray' }}>Aún no hay comentarios.</p>
        ) : (
          comentarios.map((com, index) => (
            <div key={index} className={styles.comentarioCard}>
              <h5 className={styles.nombre}>{com.nombre}</h5>
              <small className={styles.fecha}>{com.fecha}</small>
              <p className={styles.textoComentario}>• {com.comentario}</p>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={borrarComentarios} className={styles.botonBorrar}>
          🗑 Borrar todos los comentarios
        </button>
        <a href="index.html" className={styles.botonVolver} style={{ textDecoration: 'none', marginLeft: '1rem', display: 'inline-block' }}>
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}
