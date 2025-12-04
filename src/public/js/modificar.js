let getProducts_form = document.getElementById("getProducts-form");
const URL_BASE = "http://localhost:3000/";
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
                    <img src="${URL_BASE}${producto.img_url}" alt="${producto.nombre}" class="img-listados">
                    <p>${producto.nombre}/ <strong>Precio: $${producto.precio}</strong></p>
                <input type="button" id="updateProduct_button" value="Actualizar producto"></li>
                `;

  listado_productos.innerHTML = htmlProducto;
  let updateProduct_button = document.getElementById("updateProduct_button");

  updateProduct_button.addEventListener("click", (event) => {
    crearFormularioPut(event, producto);
  });
}

async function crearFormularioPut(event, producto) {
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
                <p>Imagen actual (arrastrar y soltar en caso de no modificarla):</p>
                <img src="${URL_BASE}${producto.img_url}" alt="Imagen actual" class="img-actual" style="width:150px; border-radius:8px">
                <label id="dropArea" class="drop-zone">
      
                    <p class="drop-text">Arrastra un archivo aquí o <span>explora</span></p>
                    <p class="drop-subtext">Tamaño máximo: 5MB</p>
                    <input type="file" id="fileInput"  name="image" />
                </label>


            <div class="file-preview" id="filePreview">
                <div id="fileName">Archivo: </div>
            </div>
            </div>
            <div class="contenedor-input">
                <label for="categoryProd">Categoria</label> 
                <select name="tipo" id="categoryProd" required>`;
  if (producto.tipo == "REEL") {
    formularioPutHtml += `}
                    <option value="REEL">Reel de pesca</option>
                    <option value="VARA">Caña de pesca</option>
                    
                </select>
                    `;
  } else {
    formularioPutHtml += `
                    
                    <option value="VARA">Caña de pesca</option>
                    <option value="REEL">Reel de pesca</option>
                </select>
                    `;
  }

  formularioPutHtml += `
                    
                
            </div>
            <div class="contenedor-input">
                 <label for="priceProd">Precio</label>
                <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>
            </div>
            
            <div class="contenedor-input">
                <label for="estadoProd">Estado producto</label>
                <select name="activo" id="activoProd" required>`;
  if (producto.activo == 1) {
    formularioPutHtml += `}
                    <option value="1">true</option>
                    <option value="0">false</option>
                    
                </select>
                    `;
  } else {
    formularioPutHtml += `
                    
                    <option value="0">false</option>
                    <option value="1">true</option>
                </select>
                    `;
  }

  formularioPutHtml += `</div>
              <input type="hidden" name="img_url" value="${producto.img_url}">
            <div class="contenedor-input">
                 <input  class="submit" type="submit" value="Actualizar producto">
            </div>
                   
        </form>
            `;

  contenedor_formulario.innerHTML = formularioPutHtml;
  // guardar img
  let updateProducts_form = document.getElementById("altaProducts-form");
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const filePreview = document.getElementById("filePreview");
  const fileName = document.getElementById("fileName");

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
      showFile(fileInput.files[0]);
    }
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.remove("dragover");
    });
  });

  dropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length) {
      fileInput.files = files;
      showFile(files[0]);
    }
  });

  updateProducts_form.addEventListener("submit", (event) => {
    actualizarProducto(event);
  });
}
async function actualizarProducto(event) {
  event.preventDefault();
  event.stopPropagation();
  let url = "http://localhost:3000/productos";
  let formData = new FormData(event.target);
  console.log(formData);

  formData.set("activo", parseInt(formData.get("activo"), 10));
  try {
    let response = await fetch(url, {
      method: "PUT",
      body: formData, // SIN HEADERS
    });

    console.log(response.ok);
    let result = await response.json();
    if (response.ok) {
      console.log(result.message);
      alert(result.message);
      setTimeout(() => {
        window.location.href = "http://localhost:3000/index";
      }, 500);
      listado_productos.innerHTML = "";
      contenedor_formulario.innerHTML = "";
    } else {
      console.error("Error: ", result.message);
      alert(result.message);
    }
  } catch (error) {
    console.error("Error al enviar los datos: ", error);
    alert("Error al procesar la solicitud");
  }
}

function showFile(file) {
  filePreview.style.display = "flex";
  fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(
    1
  )} KB)`;
}
