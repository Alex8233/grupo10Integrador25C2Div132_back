import { Router } from "express";
const router = Router();
import { multerUploader } from "../middlewares/multer-middleware.js";
import { validateId } from "../middlewares/middlewares.js";
import {
  createProduct,
  getAllProducts,
  getAllProductsPaginacion,
  getAllProductsById,
  modifyProduct,
  removeProduct,
} from "../controllers/product.controllers.js";
router.get("/", getAllProducts);
router.get("/paginacion", getAllProductsPaginacion);
router.get("/:id", validateId, getAllProductsById);
router.post("/", multerUploader.single("image"), createProduct);
router.put("/", multerUploader.single("image"), modifyProduct);
router.delete("/:id", validateId, removeProduct);
export default router;
