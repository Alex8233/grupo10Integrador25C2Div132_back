let getProducts_form = document.getElementById("getProducts-form");
        let listado_productos = document.getElementById("listado-productos");
        getProducts_form.addEventListener("submit", async (event)=>{
            event.preventDefault();
            let formData= new FormData(event.target);
            console.log(formData);
            let data = Object.fromEntries(formData.entries());
            console.log(data);
            let idProducto= data.id;
            try{
                let response = await fetch(`http://localhost:3000/productos/${idProducto}`);
                console.log(response);
                let datos = await response.json();
                console.log(datos);
                let producto = datos.payload[0];
                mostrarProducto(producto)
            }catch(error){
                console.error("Error: ", error);
            }

        });
        function mostrarProducto(producto) {
            console.table(producto); // El producto se recibe correctamente

            let htmlProducto = `
                <li class="li-listados">
                    <img src="${producto.img_url}" alt="${producto.nombre}" class="img-listados">
                    <p>Id: ${producto.id}/ Nombre: ${producto.nombre}/ <strong>Precio: $${producto.precio}</strong></p>
                <input type="button" id="deleteProduct_button" value="Eliminar producto"></li>
                `;

            listado_productos.innerHTML = htmlProducto;
            let deleteProduct_button = document.getElementById("deleteProduct_button");

            deleteProduct_button.addEventListener("click", event => {
               event.stopPropagation();
               let confirmacion = confirm("Querés eliminar este producto?");

                if(!confirmacion) {
                    alert("Eliminacion cancelada");

                } else {
                    eliminarProducto(producto.id);
                }
            });
        }
        async function eliminarProducto(id) {
            let url="http://localhost:3000/productos";
            try{
                console.log(`Haciendo peticion DELETE a ${url}/${id}`);
                let response = await fetch(`${url}/${id}`, {
                    method: "DELETE"
                });

                console.log(response);

                let result = await response.json(); // Procesamos la respuesta json que devolvemos del servidor

                if(response.ok) {
                    alert(result.message);
                    console.log(result.message);

                    listado_productos.innerHTML = "";

                } else {
                    alert("No se pudo eliminar un producto");
                    console.error(result.message);
                }
            }catch(error){
                console.error("Error en la solicitud DELETE: ", error);
                alert("Ocurrio un error al eliminar un producto");
            }
        }