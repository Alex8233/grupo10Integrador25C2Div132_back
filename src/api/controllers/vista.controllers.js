import productModels from "../models/product.models.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
export const viewIndex = async (req, res) => {
  try {
    const userAux = req.session.user;
    res.render("index", {
      title: "Indice",
      about: "Lista de productos",
      user: userAux,
    });
  } catch (error) {
    console.log(error);
  }
};
export const viewConsultar = async (req, res) => {
  try {
    const userAux = req.session.user;
    res.render("consultar", {
      title: "Consultar",
      about: "Consultar producto por id:",
      user: userAux,
    });
  } catch (error) {
    console.log(error);
  }
};
export const viewCrear = async (req, res) => {
  try {
    const userAux = req.session.user;
    res.render("crear", {
      title: "crear",
      about: "Crear producto",
      user: userAux,
    });
  } catch (error) {
    console.log(error);
  }
};
export const viewEliminar = async (req, res) => {
  try {
    const userAux = req.session.user;
    res.render("eliminar", {
      title: "Eliminar",
      about: "Eliminar producto",
      user: userAux,
    });
  } catch (error) {
    console.log(error);
  }
};
export const viewModificar = async (req, res) => {
  try {
    const userAux = req.session.user;
    res.render("modificar", {
      title: "modificar",
      about: "Actualizar producto",
      user: userAux,
    });
  } catch (error) {
    console.log(error);
  }
};
export const viewLogin = function (req, res) {
  res.render("login", {
    title: "Login",
    about: "Ingrese su usuario",
  });
};
export const getAllUsuarios = async (req, res) => {
  try {
    console.log(req.body);
    const { correo, contrasenia } = req.body;
    // console.log(await hashPassword(contrasenia));
    //checkeo previo
    if (!correo || !contrasenia) {
      return res.render("login", {
        title: "Login",
        about: "Ingrese su usuario",
        error: "Todos los campos son obligatorios",
      });
    }

    const [rows] = await productModels.selectAllUsuarios(correo);
    // console.log(fields);
    //si no encuntra nada
    if (rows.length === 0) {
      return res.render("login", {
        title: "Login",
        about: "Ingrese su usuario",
        error: "Credenciales incorrectas",
      });
    }
    //si encuentra asigna usuario y checkea contraseña
    const user = rows[0];

    const isMatch = await comparePassword(contrasenia, user.contrasenia);
    if (!isMatch) {
      return res.render("login", {
        title: "Login",
        about: "Login dashboard",
        error: "Credenciales incorrectas",
      });
    }
    //guardo usuario en session
    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
    };
    res.redirect("/index");
  } catch (error) {
    console.error("Error en el login", error);
  }
};
export const logout = (req, res) => {
  // 1. Destruimos la sesion
  req.session.destroy((err) => {
    if (err) {
      // Si existiera algun error destruyendo la sesion
      console.log("Error al destruir la sesion", err);
      return res.status(500).json({
        error: "Error al cerrar la sesion",
      });
    }

    // 2. Redirigimos a login luego de cerrar la sesion
    res.redirect("/login");
  });
};
export const registrarUsuario = async (req, res) => {
  const { nombre, correo, contrasenia } = req.body;

  if (!nombre || !correo || !contrasenia) {
    return res
      .status(400)
      .json({ error: "nombre, correo y contraseña son requeridos" });
  }

  try {
    const passwordHasheada = await hashPassword(contrasenia);
    const [rows] = await productModels.registrarUser(
      correo,
      passwordHasheada,
      nombre
    );

    res.status(201).json({ message: "usuario registrado" });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar" });
  }
};
export const ValidarUsuario = async (req, res) => {
  const correo = req.params.correo;

  const [rows] = await productModels.selectAllUsuarios(correo);

  if (rows.length > 0) {
    return res.json({ existe: true });
  }
  return res.json({ existe: false });
};
