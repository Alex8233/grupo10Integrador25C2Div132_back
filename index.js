import express from "express";
const app = express();
import environment from "./src/api/config/environment.js";
const PORT = environment.port;
//import connection from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";


import { productRoutes } from "./src/api/routes/index.js"; 
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});
app.use("/productos", productRoutes);
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
