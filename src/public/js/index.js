let contenedorProductos = document.getElementById("contenedorProducto");
        const url = "http://localhost:3000/productos"; // Guardamos en una variable la url de nuestro endpoint

        async function obtenerProductos() {
            try {
                let respuesta = await fetch(url); // Hacemos una peticion a nuestro nuevo endpoint en http://localhost:3000/products

                let data = await respuesta.json();

                console.log(data); 

                let productos = data.payload; 

                mostrarProductos(productos);

            } catch(error) {
                console.error(error);
            }
        }
        function mostrarProductos(array) {
            console.table(array); // Recibimos correctamente en formato tabla los productos que nos manda la funcion obtenerProductos()

            let htmlProducto = "";

            array.forEach(producto => {
                htmlProducto += `
                    <div class="card-producto">
                        <img src="${producto.img_url}" alt="${producto.nombre}">
                        <h5>${producto.nombre}</h5>
                        <p>Id: ${producto.id}</p>
                        <p>$${producto.precio}</p>
                    </div>
                `;
            });

            contenedorProductos.innerHTML = htmlProducto;
        }

        function init() {
            obtenerProductos()
        }

        init();