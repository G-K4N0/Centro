import { Router } from "express"
import {
  createRegister,
  createRegisterWithOutHorario,
  getAllRegisters,
  getRegister,
  getCountRegistersByActivities,
  getCountRegistersByMateria,
  getCountRegistersByUser,
  getCountRegistersByLabs,
  getCountRegistersByCarreras,
  getCountRegistersByWeek,
  getCountRegistersByMonth,
  updateRegister
} from "../controllers/Registro.js"
import { verifyToken } from "../controllers/authController.js"
const Registro = Router()

Registro.get("/", getAllRegisters)
Registro.get("/conteo/actividades", getCountRegistersByActivities)
Registro.get("/conteo/docentes", getCountRegistersByUser)
Registro.get("/conteo/labs", getCountRegistersByLabs)
Registro.get("/conteo/materias", getCountRegistersByMateria)
Registro.get("/conteo/carreras", getCountRegistersByCarreras)
Registro.get("/conteo/mes", getCountRegistersByMonth)
Registro.get("/conteo/semanas", getCountRegistersByWeek)
Registro.get("/:id", verifyToken, getRegister)
Registro.post("/create/", createRegister)
Registro.post("/create/whitout",createRegisterWithOutHorario)
Registro.put("/complete/:id", updateRegister)

export default Registro
