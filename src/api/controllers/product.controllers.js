import productModels from "../models/product.models.js";
export const getAllProducts = async (req, res) => {
  try {
    // la conexion devuelve dos campos, rows con el resultado de la consulta, fields la informacion de la tabla products
    const [rows, fields] = await productModels.selectAllProducts();

    // Tipo de respuesta en JSON
    res.status(200).json({
      payload: rows,
      message:
        rows.length === 0
          ? "No se encontraron productos"
          : "Productos encontrados",
    });
  } catch (error) {
    console.error("Error obteniendo productos", error.message);

    res.status(500).json({
      message: "Error interno al obtener productos",
    });
  }
};

export const getAllProductsPaginacion = async (req, res) => {
  try {
    let limit;

    limit = parseInt(req.query.limit) || 10;

    const offset = parseInt(req.query.offset) || 0;
    const { rows, total } = await productModels.selectProducts({
      limit,
      offset,
    });
    res.status(200).json({
      payload: rows,
      total,
      message:
        rows.length === 0
          ? "No se encontraron productos"
          : "Productos encontrados",
    });
  } catch (error) {
    console.error("Error obteniendo productos", error.message);

    res.status(500).json({
      message: "Error interno al obtener productos",
    });
  }
};
export const getAllProductsById = async (req, res) => {
  try {
    let { id } = req.params;
    const [rows] = await productModels.selectProductById(id);
    if (rows.length === 0) {
      console.log(`Error!! No existe producto con el id ${id}`);
      return res.status(404).json({
        message: `No se encontro producto con id ${id}`,
      });
    }
    res.status(200).json({
      payload: rows,
    });
  } catch (error) {
    console.log("Error obteniendo producto por id: ", error);

    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
export const createProduct = async (req, res) => {
  try {
    let { nombre, tipo, precio } = req.body;

    const imagen = req.file;
    if (!tipo || !imagen || !nombre || !precio) {
      return res.status(400).json({
        message: "Datos invalidos, asegurate de enviar todos los campos",
      });
    }
    let pathImagen = "img/" + imagen.filename;
    let [rows] = await productModels.insertProduct(
      nombre,
      pathImagen,
      tipo,
      precio
    );
    console.log(rows);
    res.status(201).json({
      message: "Producto creado con exito!",
    });
  } catch (error) {
    console.log("Error al crear producto: ", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
export const modifyProduct = async (req, res) => {
  try {
    let { id, nombre, tipo, precio, activo } = req.body;
    let imagen = req.file;
    if (!id || !nombre || !tipo || !precio || activo === undefined) {
      console.log("error");

      return res.status(400).json({
        message: "Faltan campos requeridos",
      });
    }
    let pathImagen;

    if (imagen) {
      pathImagen = "img/" + imagen.filename;
    } else {
      pathImagen = req.body.img_url; // mantener imagen actual
    }

    let [result] = await productModels.updateProduct(
      nombre,
      pathImagen,
      tipo,
      precio,
      activo,
      id
    );
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "No se actualizo el producto",
      });
    }
  } catch (error) {
    console.error("Error al actualizar producto: ", error);
    res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    let { id } = req.params;

    let [result] = await productModels.deleteProduct(id);
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: `No se elimino el producto con id: ${id}`,
      });
    }

    return res.status(200).json({
      message: `Producto con id ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar un producto por su id: ", error);

    res.status(500).json({
      message: `Error al eliminar producto con id: ${id}`,
      error: error.message,
    });
  }
};
