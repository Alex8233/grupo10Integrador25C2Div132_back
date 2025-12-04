let altaProducts_form = document.getElementById("altaProducts-form");
let url = "http://localhost:3000/productos";
let mensaje = document.getElementById("mensaje-creado");
altaProducts_form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  enviarProducto(formData);
});
async function enviarProducto(data) {
  console.table(data);
  try {
    let respuesta = await fetch(url, {
      method: "POST",
      body: data,
    });
    console.log(respuesta);
    let resultado = await respuesta.json();
    console.log(resultado);

    if (respuesta.ok) {
      alert("se creo el producto correctamente ");
      console.log(resultado.message);
      setTimeout(() => {
        window.location.href = "http://localhost:3000/index";
      }, 500);
    } else {
      console.error("Error al enviar los datos, ", resultado.message);
      mensaje.innerHTML = `
        <h1 id='prodNoCreado' 
            style="color:white; background:red; padding:10px; border-radius:6px;">
            Error: Producto no creado
        </h1>`;
      MensajeCreado.style.display = "flex";
    }
  } catch (error) {
    console.error("Error al enviar los datos: ", error);
    alert("Error al procesar la solicitud");
  }
}

// subir imagen

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

function showFile(file) {
  filePreview.style.display = "flex";
  fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(
    1
  )} KB)`;
}

//

const progressFill = document.getElementById("progressFill");

function showFile(file) {
  filePreview.style.display = "flex";
  fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(
    1
  )} KB)`;
  progressFill.style.width = "0%";
  progressFill.style.backgroundColor = "#2563eb";
}
