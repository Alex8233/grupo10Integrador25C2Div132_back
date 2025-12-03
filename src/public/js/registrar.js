const form = document.getElementById("registerForm");
const API_URL = "http://localhost:3000";

form.addEventListener("submit", registerUser);

const registerUser = async (event) => {
  event.preventDefault();

  const correo = document.getElementById("correo").value;

  // Validar campos HTML5
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Chequear si ya existe (validación frontend opcional)
  if (await usuarioExiste(correo)) {
    alert("El correo ya está registrado.");
    return;
  }

  // Crear usuario
  await createUser(obj);
  alert("Registro exitoso.");
  window.location.href = API_URL;
};
const usuarioExiste = async (correo) => {
  const res = await fetch(`${API_URL}/usuarios/existe/${correo}`);
  const data = await res.json();
  return data.existe;
};
const createUser = async (obj) => {
  try {
    const res = await fetch(`${API_URL}/registrar-usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al registrar usuario");
    }

    return data;
  } catch (err) {
    console.error("Error en createUser:", err);
    throw err;
  }
};
