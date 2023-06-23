import { Router } from "express"
import {
  createTime,
  deleteTime,
  getTimesbyDocentes,
  getTimesbyLabs,
  getTimesByDays,
  getTimesByDaysAndLabs,
  getTime,
  getTimes,
  updateTime,
  updateManyTimesActual
} from "../controllers/Horario.js"
const timeRoute = Router()
import { verifyToken, isAdmin } from "../controllers/authController.js"

timeRoute.get("/", getTimes)
timeRoute.get("/horarios/dias",getTimesByDays)
timeRoute.get("/horarios/dias/:id/labs", getTimesByDaysAndLabs)
timeRoute.get("/horarios/one/:id",getTime)

timeRoute.get("/horarios/docente/:id/dias",verifyToken,getTimesbyDocentes)
timeRoute.get("/horarios/lab",verifyToken,getTimesbyLabs)

timeRoute.post("/horarios/create", verifyToken, isAdmin,createTime)
timeRoute.put("/horarios/update/:id",verifyToken,isAdmin ,updateTime)
timeRoute.put("/horarios/update/actual/many", verifyToken, isAdmin, updateManyTimesActual)
timeRoute.delete("/horarios/delete/:id", verifyToken, isAdmin, deleteTime)

export default timeRoute
