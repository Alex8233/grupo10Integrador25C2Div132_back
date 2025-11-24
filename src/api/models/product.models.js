import connection from "../database/db.js";
const selectAllProducts =()=>{
    const sql = "SELECT * FROM productos";
    return connection.query(sql);
}
const selectProductById=(id)=>{
     let sql = "SELECT * FROM productos WHERE productos.id = ?";
     return connection.query(sql, [id]);
}
const insertProduct = (nombre, img_url, tipo, precio) => {
    let sql = "INSERT INTO productos (nombre, img_url, tipo, precio) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [nombre, img_url, tipo, precio]);
}
const updateProduct = (nombre,img_url,tipo,precio,activo,id) => {
    let sql = `
        UPDATE productos 
        SET nombre = ?, img_url = ?, tipo = ?, precio = ?, activo = ?
        WHERE id = ?
    `;
    return connection.query(sql, [nombre, img_url, tipo, precio, activo, id]);
}
const deleteProduct = (id) => {
     let sql = `DELETE FROM productos WHERE id = ?`;
     return connection.query(sql, [id]);
}
export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}