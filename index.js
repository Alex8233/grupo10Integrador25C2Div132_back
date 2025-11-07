import express from "express";
const app = express();
import environment from "./src/api/config/environment.js";
const PORT = environment.port;
import connection from "./src/api/database/db.js";
import cors from "cors";
// app.get("/",(req, res)=>
// {
//     res.send("hola mundo desde express.js");
// });
// app.listen(PORT,()=>{
//     console.log(`Servidor corriendo desde el puerto ${PORT}`);
// })
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});
app.get("/productos", async (req, res) => {
    try {
        const sql = "SELECT * FROM productos";
        const [rows, fields] = await connection.query(sql);
       
        res.status(200).json({
            payload: rows
        });
        } catch(error) {
        console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});
app.get("/productos/:id_producto", async(req,res)=>{
    try{
        console.log(req.params);
        let {id_producto} = req.params;
        let sql = "SELECT * FROM productos WHERE productos.id_producto = ?";

        const [rows] = await connection.query(sql, [id_producto]);

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
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
