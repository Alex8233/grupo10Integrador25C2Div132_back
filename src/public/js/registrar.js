// const form = document.getElementById("registerForm");
// const API_URL = "http://localhost:3000";

// const usuarioExiste = async (correo) => {
//   const res = await fetch(`${API_URL}/usuarios/existe/${correo}`);
//   const data = await res.json();
//   return data.existe;
// };

// const createUser = async (obj) => {
//   try {
//     console.log("hollaaaa");
//     const res = await fetch(`${API_URL}/registrar-usuario`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(obj),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.error || "Error al registrar usuario");
//     }

//     return data;
//   } catch (err) {
//     console.error("Error en createUser:", err);
//     throw err;
//   }
// };

// const registerUser = async (event) => {
//   event.preventDefault();

//   const correo = document.getElementById("correo").value;

//   // Validar HTML5
//   if (!form.checkValidity()) {
//     form.reportValidity();
//     return;
//   }

//   // Construir el objeto usuario
//   const obj = {
//     nombre: document.getElementById("nombre").value,
//     correo: document.getElementById("correo").value,
//     contrasenia: document.getElementById("contrasenia").value,
//   };

//   // Chequear si ya existe
//   if (await usuarioExiste(correo)) {
//     alert("El correo ya está registrado.");
//     return;
//   }

//   try {
//     await createUser(obj);
//     alert("Registro exitoso.");
//     window.location.href = `${API_URL}/index`;
//   } catch (err) {
//     alert("Error al registrar: " + err.message);
//   }
// };

// form.addEventListener("submit", registerUser);
