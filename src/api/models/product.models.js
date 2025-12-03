import connection from "../database/db.js";
const selectAllProducts = () => {
  const sql = "SELECT * FROM productos";
  return connection.query(sql);
};
export const selectProducts = async ({ limit, offset }) => {
  const sqlTotal = `SELECT COUNT(*) AS total FROM productos `;
  const [[{ total }]] = await connection.query(sqlTotal);

  const sql = `SELECT * FROM productos  LIMIT ? OFFSET ?`;

  const [rows] = await connection.query(sql, [limit, offset]);

  return { rows, total };
};
const selectProductById = (id) => {
  let sql = "SELECT * FROM productos WHERE productos.id = ?";
  return connection.query(sql, [id]);
};
const insertProduct = (nombre, img_url, tipo, precio) => {
  let sql =
    "INSERT INTO productos (nombre, img_url, tipo, precio) VALUES (?, ?, ?, ?)";
  return connection.query(sql, [nombre, img_url, tipo, precio]);
};
const updateProduct = (nombre, img_url, tipo, precio, activo, id) => {
  let sql = `
        UPDATE productos 
        SET nombre = ?, img_url = ?, tipo = ?, precio = ?, activo = ?
        WHERE id = ?
    `;
  return connection.query(sql, [nombre, img_url, tipo, precio, activo, id]);
};
const deleteProduct = (id) => {
  let sql = `DELETE FROM productos WHERE id = ?`;
  return connection.query(sql, [id]);
};
const selectAllUsuarios = (correo) => {
  //consulta
  const sql = "SELECT * FROM usuario WHERE correo = ?";
  return connection.query(sql, [correo]);
};
const registrarUser = (correo, contrasenia, nombre) => {
  const sql = `
            INSERT INTO usuario(correo,contrasenia,nombre) 
            VALUES (?, ?, ?)
        `;
  return connection.query(sql, [correo, contrasenia, nombre]);
};

export default {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  selectAllUsuarios,
  selectProducts,
  registrarUser,
};
