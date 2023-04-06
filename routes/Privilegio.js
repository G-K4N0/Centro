import { Router } from "express"
import { verifyToken, isAdmin } from "../controllers/authController.js"
import { getAllPrivileges } from "../controllers/Privilegio.js"

const privilegio = Router()

privilegio.get("/", verifyToken, isAdmin, getAllPrivileges)

export default privilegio
