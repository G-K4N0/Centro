import { Router } from "express"
import {
  createCareer,
  deletCareer,
  getAllCareers,
  getCareer,
  updateCareer,
} from "../controllers/Carrera.js"
import { verifyToken, isAdmin } from "./controllers/authController.js"

const routerCareer = Router()

routerCareer.get("/", verifyToken, isAdmin, getAllCareers)
routerCareer.get("/:id", verifyToken, isAdmin, getCareer)
routerCareer.post("/", verifyToken, isAdmin, createCareer)
routerCareer.put("/:id", verifyToken, isAdmin, updateCareer)
routerCareer.delete("/:id", verifyToken, isAdmin, deletCareer)

export default routerCareer
