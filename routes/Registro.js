import { Router } from "express"
import {
  createRegister,
  getAllRegisters,
  getRegister,
  getCountRegistersByActivities,
  getCountRegistersByMateria,
  getCountRegistersByUser,
  getCountRegistersByLabs,
  getCountRegistersByCarreras
} from "../controllers/Registro.js"
import { verifyToken } from "../controllers/authController.js"
const Registro = Router()

Registro.get("/", getAllRegisters)
Registro.get("/conteo/actividades", getCountRegistersByActivities)
Registro.get("/conteo/materias",getCountRegistersByMateria)
Registro.get("/conteo/docentes",getCountRegistersByUser)
Registro.get("/conteo/labs",getCountRegistersByLabs)
Registro.get("/conteo/carreras",getCountRegistersByCarreras)
Registro.get("/:id", verifyToken, getRegister)
Registro.post("/create/", createRegister)

export default Registro
