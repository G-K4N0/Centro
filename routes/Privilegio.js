import { Router } from "express"
import { isAdmin, verifyToken } from "../controllers/authController.js"
import { getAllPrivileges } from "../controllers/Privilegio.js"

const privilegio = Router()

privilegio.get("/", verifyToken, isAdmin, getAllPrivileges)

export default privilegio
