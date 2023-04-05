import { Router } from "express"
import {
  createTime,
  deleteTime,
  getTimesbyDocentes,
  getTime,
  getTimes,
  updateTime,
} from "../controllers/Horario.js"
const timeRoute = Router()
import { verifyToken, isAdmin } from "./controllers/authController.js"

timeRoute.get("/horario/docente/:id", verifyToken, getTimesbyDocentes)
timeRoute.get("/", getTimes)
timeRoute.get("/horarios/:id", getTime)
timeRoute.post("/horarios", verifyToken, isAdmin, createTime)
timeRoute.put("/horarios/:id", verifyToken, isAdmin, updateTime)
timeRoute.delete("/horarios/:id", verifyToken, isAdmin, deleteTime)

export default timeRoute
