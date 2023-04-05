import { Router } from "express"
import {
  createRegister,
  getAllRegisters,
  getRegister,
} from "../controllers/Registro.js"
import { verifyToken } from "./controllers/authController.js"
const Registro = Router()

Registro.get("/", verifyToken, getAllRegisters)
Registro.get("/:id", verifyToken, getRegister)
Registro.post("/", verifyToken, createRegister)

export default Registro
