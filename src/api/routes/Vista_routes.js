import { Router } from "express";
const router = Router();
import {
  viewConsultar,
  viewCrear,
  viewEliminar,
  viewIndex,
  viewModificar,
  getAllUsuarios,
  viewLogin,
  logout,
  registrarUsuario,
  ValidarUsuario,
} from "../controllers/vista.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
router.get("/index", requireLogin, viewIndex);
router.get("/consultar", requireLogin, viewConsultar);
router.get("/crear", requireLogin, viewCrear);
router.get("/eliminar", requireLogin, viewEliminar);
router.get("/modificar", requireLogin, viewModificar);
router.get("/login", viewLogin);

router.post("/login", getAllUsuarios);
router.post("/logout", logout);
router.get("/registrar-usuario", requireLogin, function (req, res) {
  res.render("registrar-usuario", {
    error: "",
    title: "REGISTER",
    about: "Crear Usuario",
  });
});

router.post("/registrar-usuario", registrarUsuario);
router.get("/usuarios/existe/:correo", ValidarUsuario);
export default router;
