import express from "express";
const app = express();
import { handleMulterError } from "./src/api/middlewares/multer-middleware.js";
import environment from "./src/api/config/environment.js";
const PORT = environment.port;
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { join, __dirname } from "./src/api/utils/index.js";

import { productRoutes, vistaRoutes } from "./src/api/routes/index.js";

import session from "express-session";
const SESSION_KEY = environment.session_key;
app.use(handleMulterError);
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(express.static(join(__dirname, "src", "public")));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_KEY, // Firma las cookies para evitar manipulacion por el cliente, clave para la seguridad de la aplicaciones, este valor se usa para FIRMAR las cookies de sesion para que el servidor verifique que los datos no fueron alterados por el cliente
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true, // No guarda sesiones vacias
  })
);

// app.get("/", (req, res) => {
//     res.send("TP Integrador Div 132");
// });
app.use("/productos", productRoutes);
app.use("", vistaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});
