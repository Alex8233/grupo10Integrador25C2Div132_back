import express from "express";
const app = express();
import environment from "./src/api/config/environment";
const PORT = environment.port;
app.get("/",(req, res)=>
{
    res.send("hola mundo desde express.js");
});
app.listen(PORT,()=>{
    console.log(`Servidor corriendo desde el puerto ${PORT}`);
})