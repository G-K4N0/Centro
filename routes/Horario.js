import { Router } from "express"
import {
  createTime,
  deleteTime,
  getTimesbyDocentes,
  getTimesbyLabs,
  getTimesByDays,
  getTime,
  getTimes,
  updateTime,
  updateOneTimeActual
} from "../controllers/Horario.js"
const timeRoute = Router()
import { verifyToken, isAdmin } from "../controllers/authController.js"

timeRoute.get("/horarios/lab", getTimesbyLabs)
timeRoute.get("/horarios/dias", getTimesByDays)
timeRoute.get("/horarios/docente/:id/dias", getTimesbyDocentes)
timeRoute.get("/", getTimes)
timeRoute.get("/horarios/one/:id", getTime)
timeRoute.post("/horarios/create", createTime)
timeRoute.put("/horarios/update/:id", updateTime)
timeRoute.put("/horarios/update/one/:id", updateOneTimeActual)
timeRoute.delete("/horarios/delete/:id", verifyToken, isAdmin, deleteTime)

export default timeRoute
