document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('userName').textContent = userName;
    }

    // Inicializar arreglo desde localStorage si existe
    let productos = JSON.parse(localStorage.getItem('productosEcoFood')) || [];

    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    renderProductos();

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('productName').value.trim();

        if (nombre === '') {
            alert('Por favor ingresa un nombre de producto.');
            return;
        }

        if (productos.length >= 3) {
            alert('Solo puedes agregar hasta 3 productos.');
            return;
        }

        productos.push(nombre);
        actualizarStorage();
        renderProductos();
        productForm.reset();
    });

    function renderProductos() {
        productList.innerHTML = '';
        productos.forEach((prod, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${prod}
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            productList.appendChild(li);
        });
    }

    function actualizarStorage() {
        localStorage.setItem('productosEcoFood', JSON.stringify(productos));
    }

    // Eliminar producto
    window.eliminarProducto = function(index) {
        productos.splice(index, 1);
        actualizarStorage();
        renderProductos();
    };
});
