import { Router } from "express"
import {
  createMod,
  deleteMod,
  getAllMods,
  getMod,
  updateMod,
} from "../controllers/Modalidad.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"
const modRoutes = Router()

modRoutes.get("/", getAllMods)
modRoutes.get("/:id", getMod)
modRoutes.post("/", verifyToken, isAdmin, createMod)
modRoutes.put("/:id", verifyToken, isAdmin, updateMod)
modRoutes.delete("/:id", verifyToken, isAdmin, deleteMod)

export default modRoutes
