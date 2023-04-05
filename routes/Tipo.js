import { Router } from "express"
import {
  createType,
  deleteType,
  getAllTypes,
  getType,
  updateType,
} from "../controllers/Tipo.js"
import { verifyToken, isAdmin } from "./controllers/authController.js"

const typeRoute = Router()

typeRoute.get("/", verifyToken, getAllTypes)
typeRoute.get("/:id", verifyToken, getType)
typeRoute.post("/", verifyToken, isAdmin, createType)
typeRoute.put("/", verifyToken, isAdmin, updateType)
typeRoute.delete("/", verifyToken, isAdmin, deleteType)

export default typeRoute
