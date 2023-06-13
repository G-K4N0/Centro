import { Router } from 'express'
import { getActividades, createActividades } from '../controllers/Actividad.js'

const routerActividad = Router()

routerActividad.get("/", getActividades)
routerActividad.get("/create", createActividades)

export default routerActividad
