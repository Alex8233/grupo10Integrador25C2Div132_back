let contenedorProductos = document.getElementById("contenedorProducto");
const url = "http://localhost:3000/productos/paginacion"; // Guardamos en una variable la url de nuestro endpoint
const URL_BASE = "http://localhost:3000/";
let limit = 10;
let offset = 0;
async function obtenerProductos() {
  try {
    //let respuestaAux = await fetch("http://localhost:3000/productos");
    let respuesta = await fetch(`${url}?limit=${limit}&offset=${offset}`); // Hacemos una peticion a nuestro nuevo endpoint en http://localhost:3000/products

    let data = await respuesta.json();

    console.log(data);

    let productos = data.payload;

    mostrarProductos(productos);
    // Si hay más productos, mostramos el botón
    if (offset + limit < data.total) {
      mostrarBotonCargarMas();
    } else {
      ocultarBotonCargarMas();
    }
  } catch (error) {
    console.error(error);
  }
}
function mostrarProductos(array) {
  console.table(array); // Recibimos correctamente en formato tabla los productos que nos manda la funcion obtenerProductos()

  let htmlProducto = "";

  array.forEach((producto) => {
    htmlProducto += `
                    <div class="card-producto">
                        <img src="${URL_BASE}${producto.img_url}" alt="${producto.nombre}">
                        <h5>${producto.nombre}</h5>
                        <p>Id: ${producto.id}</p>
                        <p>$${producto.precio}</p>
                    </div>
                `;
  });

  contenedorProductos.innerHTML = htmlProducto;
}
let contenedorBtn = document.getElementById("contonedorBTN");
// BOTÓN "CARGAR MÁS"
function mostrarBotonCargarMas() {
  contenedorBtn.innerHTML = `<button id="btnCargarMas" class="btn btn-primary">
        Cargar más productos
    </button>`;
  document.getElementById("btnCargarMas").addEventListener("click", () => {
    console.log("Cargando más productos");
    cargarMasProductos();
  });
}

function ocultarBotonCargarMas() {
  let btn = document.getElementById("btnCargarMas");
  if (btn) btn.style.display = "none";
}

//  AVANZAR A LOS SIGUIENTES PRODUCTOS
function cargarMasProductos() {
  offset += limit;
  obtenerProductos();
}

function init() {
  obtenerProductos();
}

init();
