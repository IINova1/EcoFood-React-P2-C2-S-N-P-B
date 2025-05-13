document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formContacto');
    const mensajeEnviado = document.getElementById('mensajeEnviado');
    const listaMensajes = document.getElementById('listaMensajes');

    // Arreglo temporal para almacenar mensajes
    const mensajes = [];

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombreContacto').value.trim();
        const correo = document.getElementById('emailContacto').value.trim();
        const mensaje = document.getElementById('mensajeContacto').value.trim();

        if (!nombre || !correo || !mensaje) {
            alert('Por favor completa todos los campos.');
            return;
        }

        // Agregar mensaje al arreglo
        mensajes.push({ nombre, correo, mensaje });

        // Mostrar mensaje de éxito
        mensajeEnviado.classList.remove('d-none');
        setTimeout(() => {
            mensajeEnviado.classList.add('d-none');
        }, 3000);

        // Mostrar todos los mensajes en lista
        actualizarListaMensajes();

        // Limpiar formulario
        formulario.reset();
    });

    function actualizarListaMensajes() {
        listaMensajes.innerHTML = ''; // Limpiar lista
        mensajes.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<strong>${item.nombre}</strong> (${item.correo}): ${item.mensaje}`;
            listaMensajes.appendChild(li);
        });
    }
});
