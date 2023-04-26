import { Router } from "express"
import {
  createRegister,
  getAllRegisters,
  getRegister,
} from "../controllers/Registro.js"
import { verifyToken } from "../controllers/authController.js"
const Registro = Router()

Registro.get("/", getAllRegisters)
Registro.get("/:id", verifyToken, getRegister)
Registro.post("/create/", createRegister)

export default Registro
