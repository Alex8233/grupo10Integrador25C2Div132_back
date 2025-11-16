import { Router } from "express"; 
const router = Router(); 

import { validateId } from "../middlewares/middlewares.js"; 

import connection from "../database/db.js";
router.get("/", async (req, res) => {
    try {
        const sql = "SELECT * FROM productos";
        const [rows, fields] = await connection.query(sql);
       
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
        } catch(error) {
        console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos",
            
        });
    }
});
router.get("/:id", validateId,async(req,res)=>{
    try{

        let {id} = req.params;
        let sql = "SELECT * FROM productos WHERE productos.id = ?";

        const [rows] = await connection.query(sql, [id]);
        if(rows.length === 0) {

            console.log(`Error!! No existe producto con el id ${id}`);
            return res.status(404).json({
                message: `No se encontro producto con id ${id}`
            });
        }
        res.status(200).json({
            payload: rows
        });
    }catch(error){
        console.log("Error obteniendo producto por id: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
})
router.post("/", async (req, res)=>{
    try{
        let{nombre,img_url, tipo, precio} =req.body;
        console.log(req.body);
         console.log(`Nombre producto: ${nombre}`);
         if(!tipo || !img_url || !nombre || !precio) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }
        let sql = "INSERT INTO productos (nombre, img_url, tipo, precio) VALUES (?, ?, ?, ?)";

        let [rows] = await connection.query(sql, [nombre, img_url, tipo, precio]);
        console.log(rows);
        res.status(201).json({
            message: "Producto creado con exito!",
        });


    }catch(error){
        console.log("Error al crear producto: ", error);
        res.status(500).json({
            message:"Error interno del servidor",
            error: error.message
        })
       
    }
});
router.put("/",async(req,res)=>{
    try{
        
        let {id,nombre,img_url,tipo,precio,activo}= req.body;
        console.log(id);
        if(!id||!nombre||!img_url||!tipo||!precio||!activo){

            console.log("error")
            console.log(id);
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }
        let sql = `
            UPDATE productos 
            SET nombre = ?, img_url = ?, tipo = ?, precio = ?, activo = ?
            WHERE id = ?
        `;
        let [result] = await connection.query(sql, [nombre, img_url, tipo, precio, activo, id]);
        console.log(result);
         if (result.affectedRows === 0) { 
            return res.status(400).json({
                message: "No se actualizo el producto"
            })
        }
    }catch(error){
        console.error("Error al actualizar producto: ", error);
        res.status(500).json({
            message: `Error interno del servidor: ${error}`
        });
    }
});
router.delete("/:id", validateId,async(req,res)=>{
    try{
        
        let {id}= req.params;
        let sql = `DELETE FROM productos WHERE id = ?`;
        let [result] = await connection.query(sql, [id]);
        console.log(result);
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: `No se elimino el producto con id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });
    }
    catch(error){
        console.error("Error al eliminar un producto por su id: ", error);

        res.status(500).json({
            message: `Error al eliminar producto con id: ${id}`,
            error: error.message
        });
    }
});
export default router;