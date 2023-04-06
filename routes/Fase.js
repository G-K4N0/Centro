import { Router } from "express"
import {
  createPhase,
  deletePhase,
  getAllPhases,
  getPhase,
  updatePhase,
} from "../controllers/Fase.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"

const phaseRoute = Router()

phaseRoute.get("/", verifyToken, isAdmin, getAllPhases)
phaseRoute.get("/:id", verifyToken, isAdmin, getPhase)
phaseRoute.post("/", verifyToken, isAdmin, createPhase)
phaseRoute.put("/:id", verifyToken, isAdmin, updatePhase)
phaseRoute.delete("/:id", verifyToken, isAdmin, deletePhase)

export default phaseRoute
