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
  getCountRegisterByLabswithOutSchedule,
  getCountRegistersByWeek,
  getCountRegistersByMonth,
  updateRegister
} from "../controllers/Registro.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"
const Registro = Router()

Registro.get("/", getAllRegisters)
Registro.get("/conteo/sinhorario", verifyToken,isAdmin,getCountRegisterByLabswithOutSchedule)
Registro.get("/conteo/actividades", verifyToken, isAdmin ,getCountRegistersByActivities)
Registro.get("/conteo/docentes", verifyToken, isAdmin, getCountRegistersByUser)
Registro.get("/conteo/conhorario",verifyToken, isAdmin, getCountRegistersByLabs)
Registro.get("/conteo/materias", verifyToken, isAdmin, getCountRegistersByMateria)
Registro.get("/conteo/carreras", verifyToken, isAdmin, getCountRegistersByCarreras)
Registro.get("/conteo/mes", verifyToken, isAdmin, getCountRegistersByMonth)
Registro.get("/conteo/semanas",verifyToken, isAdmin, getCountRegistersByWeek)
Registro.get("/:id", verifyToken, isAdmin , getRegister)
Registro.post("/create/", verifyToken, createRegister)
Registro.post("/create/whitout", verifyToken,createRegisterWithOutHorario)
Registro.put("/complete/:id",verifyToken, updateRegister)

export default Registro
