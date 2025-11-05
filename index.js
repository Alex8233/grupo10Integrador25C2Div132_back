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
app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});
app.get("/productos", async (req, res) => {
    try {
        const sql = "SELECT * FROM productos";
        const [rows, fields] = await connection.query(sql);
        console.log(rows);
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
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
