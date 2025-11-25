let getProducts_form = document.getElementById("getProducts-form");
        let listado_productos = document.getElementById("listado-productos");
        let contenedor_formulario = document.getElementById("contenedor-formulario");
         getProducts_form.addEventListener("submit", async (event) => {
            
            event.preventDefault(); 
            let formData = new FormData(event.target); // FormData { id → "2" }
            console.log(formData);


            let data = Object.fromEntries(formData.entries()); // Object { id: "2" }
            console.log(data);

            let idProducto = data.id;
            console.log(idProducto); // Ya extrajimos el valor del campo

            try {
                // Hago el fetch a la url personalizada
                let response = await fetch(`http://localhost:3000/productos/${idProducto}`);
                console.log(response);

                // Proceso los datos que me devuelve el servidor
                let datos = await response.json();
                console.log(datos);

                // Extraigo el producto que devuelve payload
                let producto = datos.payload[0]; 
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
                <input type="button" id="updateProduct_button" value="Actualizar producto"></li>
                `;

            listado_productos.innerHTML = htmlProducto;
            let updateProduct_button = document.getElementById("updateProduct_button");

            updateProduct_button.addEventListener("click", event => {
                crearFormularioPut(event, producto);
            });
        }
        function crearFormularioPut(event, producto) {

            event.stopPropagation();
            console.table(producto); 
            //console.log(typeof producto.tipo)
            let formularioPutHtml = `
            
                <form id="altaProducts-form" class="products-form">
                    <input type="hidden" name="id" value="${producto.id}">
            <div class="contenedor-input">
                <label for="nameProd">Nombre</label>
                <input type="text" name="nombre" id="nameProd"   value="${producto.nombre}" required>
            </div>
             
            <div class="contenedor-input">
                <label for="imageProd">Imagen</label>
                <input type="text" name="img_url" id="imageProd" value="${producto.img_url}" required>
            </div>
            <div class="contenedor-input">
                <label for="categoryProd">Categoria</label> 
                <select name="tipo" id="categoryProd" required>`
                if(producto.tipo =="REEL"){
                    formularioPutHtml+=`}
                    <option value="REEL">Reel de pesca</option>
                    <option value="VARA">Caña de pesca</option>
                    
                </select>
                    `
                }
                else{
                    formularioPutHtml+=`
                    
                    <option value="VARA">Caña de pesca</option>
                    <option value="REEL">Reel de pesca</option>
                </select>
                    `
                }
                
                formularioPutHtml+=`
                    
                
            </div>
            <div class="contenedor-input">
                 <label for="priceProd">Precio</label>
                <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>
            </div>
            
            <div class="contenedor-input">
                <label for="estadoProd">Estado producto</label>
                <select name="activo" id="activoProd" required>`
            if(producto.activo ==1){
                    formularioPutHtml+=`}
                    <option value="1">true</option>
                    <option value="0">false</option>
                    
                </select>
                    `
                }
                else{
                    formularioPutHtml+=`
                    
                    <option value="0">false</option>
                    <option value="1">true</option>
                </select>
                    `
                }        
                    
               formularioPutHtml+=`</div>
            <div class="contenedor-input">
                 <input  class="submit" type="submit" value="Actualizar producto">
            </div>
                   
        </form>
            `;

            contenedor_formulario.innerHTML = formularioPutHtml;

            let updateProducts_form = document.getElementById("altaProducts-form");

            updateProducts_form.addEventListener("submit", event => {
                
                actualizarProducto(event)
            });
        }
        async function actualizarProducto(event) {
            event.preventDefault();
            let url = "http://localhost:3000/productos";            
            let formData = new FormData(event.target); 
            console.log(formData);

            let data = Object.fromEntries(formData.entries()); 
           data.activo = parseInt(data.activo, 10);
            console.log(data);
            try {
                let response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                console.log(response);

                let result = await response.json(); 
                if(response.ok) { 
                    console.log(result.message);
                    alert(result.message);
                    listado_productos.innerHTML = "";
                    contenedor_formulario.innerHTML = "";

                } else {
                    console.error("Error: ", error.message);
                    alert(error.message);
                }
            } catch (error) {
                console.error("Error al enviar los datos: ", error);
                alert("Error al procesar la solicitud");
            }


        }