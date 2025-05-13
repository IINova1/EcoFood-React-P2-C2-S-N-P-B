document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener valores
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const nacimiento = document.getElementById('nacimiento').value;
            const genero = document.getElementById('genero').value;

            const redes = document.getElementById('redes').checked;
            const amistades = document.getElementById('amistades').checked;
            const otros = document.getElementById('otros').checked;

            // Validaciones
            if (!nombre || !email || !password || !confirmPassword || !nacimiento || !genero) {
                alert('Por favor completa todos los campos obligatorios.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            if (!redes && !amistades && !otros) {
                alert('Selecciona al menos una opción de cómo supiste de nosotros.');
                return;
            }

            // Guardar datos de manera básica en localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('userName', nombre);

            alert('¡Registro exitoso!');
            registerForm.reset();
            window.location.href = 'Login.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                const nombre = localStorage.getItem('userName') || 'Usuario';
                alert(`¡Bienvenido/a ${nombre}!`);
                localStorage.clear();
                window.location.href = 'home.html';
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }
});

