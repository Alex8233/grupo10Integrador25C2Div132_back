import express from "express";
const app = express();
import environment from "./src/api/config/environment.js";
const PORT = environment.port;
//import connection from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { join, __dirname } from "./src/api/utils/index.js";

import { productRoutes } from "./src/api/routes/index.js"; 
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(express.static(join(__dirname, "src", "public")));
app.set("view engine", "ejs"); 
app.set("views", join(__dirname, "src", "views"));

app.get("/index",async (req, res) => {

    try {

        
        // Le devolvemos la pagina index.ejs
        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
        }); 

    } catch (error) {
        console.log(error);
    }
})
app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});
app.use("/productos", productRoutes);
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
