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
    return res.render("registrar-usuario", {
      title: "REGISTER",
      about: "Crear Usuario",
      error: "Complete todos los campos",
    });
  }

  try {
    const [existe] = await productModels.selectAllUsuarios(correo);

    console.log("Resultado de búsqueda de usuario:", existe);

    if (existe.length > 0) {
      console.log("Error: el correo ya está registrado:", correo);
      return res.render("registrar-usuario", {
        title: "REGISTER",
        about: "Crear Usuario",
        error: `Error: el correo ya está registrado:`,
      });
    } else {
      const passwordHasheada = await hashPassword(contrasenia);
      console.log("Password hasheada:", passwordHasheada);

      const [rows] = await productModels.registrarUser(
        correo,
        passwordHasheada,
        nombre
      );

      console.log("Usuario registrado exitosamente");
      res.redirect("/index");
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
export const viewRegistrarUsuario = async (req, res) => {
  try {
    res.render("registrar-usuario", {
      error: "",
      title: "REGISTER",
      about: "Crear Usuario",
    });
  } catch (error) {
    console.log(error);
  }
};
export const viewSales = async (req, res) => {
  try {
    // Recibimos los datos del cuerpo de la peticion HTTP
    let { fecha, total, nombre_usuario, products } = req.body;

    // Validacion de datos obligatorios
    if (!fecha || !total || !nombre_usuario || !Array.isArray(products)) {
      return res.status(400).json({
        message:
          "Datos invalidos, debes enviar date, total_price, user_name y products (array)",
      });
    }

    const [rows] = await productModels.insertVentas(
      fecha,
      total,
      nombre_usuario
    );

    // 2. Obtenemos el id de la venta recien creada
    const saleId = rows.insertId;

    // Como tenemos una relacion N a N, debemos insertar una fila por cada producto vendido
    await productModels.insertVentas_Producto(products, saleId);

    // Respuesta de exito
    res.status(201).json({
      message: "Venta registrada con exito!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
// export const ValidarUsuario = async (req, res) => {
//   const correo = req.params.correo;

//   const [rows] = await productModels.selectAllUsuarios(correo);

//   if (rows.length > 0) {
//     return res.json({ existe: true });
//   }
//   return res.json({ existe: false });
// };
