import { Router } from "express"
import {
  getAllLabs,
  getLab,
  createLab,
  updateLab,
  deleteLab,
} from "../controllers/Lab.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"
const labRoute = Router()

labRoute.get("/", getAllLabs)
labRoute.get("/:id", getLab)
labRoute.post("/", verifyToken, isAdmin, createLab)
labRoute.put("/:id", verifyToken, isAdmin, updateLab)
labRoute.delete("/:id", verifyToken, isAdmin, deleteLab)

export default labRoute
