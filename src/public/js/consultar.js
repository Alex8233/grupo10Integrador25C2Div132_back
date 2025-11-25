let getProducts_form = document.getElementById("getProducts-form");
            let listado_productos = document.getElementById("listado-productos");
            let url = "http://localhost:3000/productos";
            getProducts_form.addEventListener("submit", async (event) => {
            
            event.preventDefault();  

            let formData = new FormData(event.target); 
            console.log(formData);

         
            let data = Object.fromEntries(formData.entries());
            console.log(data);

            let idProducto = data.id;
            console.log(idProducto); 

            try {

                console.log(`Realizamos una peticion GET a ${url}/${idProducto}`);
                
              
                let response = await fetch(`http://localhost:3000/productos/${idProducto}`);
                console.log(response);

             
                let datos = await response.json();
                console.log(datos);

               
                let producto = datos.payload[0]; // 
                mostrarProducto(producto); 

            } catch (error) {
                console.error("Error: ", error);
            }

            
        });
        function mostrarProducto(producto) {
            console.table(producto); // El producto se recibe correctamente

            let htmlProducto = `
                <li class="li-listados">
                    <img src="${producto.img_url}" alt="${producto.nombre}" class="img-listados">
                    <p>Id: ${producto.id}/ Nombre: ${producto.nombre}/ <strong>Precio: $${producto.precio}</strong></p>
                </li>
                `;

            listado_productos.innerHTML = htmlProducto;
        }