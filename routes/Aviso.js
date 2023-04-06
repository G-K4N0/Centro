import { Router } from "express"
import {
  getAllAvisos,
  getAviso,
  createAviso,
  updateAviso,
  deleteAviso,
} from "../controllers/Aviso.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"

const routerAviso = Router()

routerAviso.get("/", getAllAvisos)
routerAviso.get("/:id", getAviso)
routerAviso.post("/", verifyToken, isAdmin, createAviso)
routerAviso.put("/:id", verifyToken, isAdmin, updateAviso)
routerAviso.delete("/:id", verifyToken, isAdmin, deleteAviso)

export default routerAviso;
