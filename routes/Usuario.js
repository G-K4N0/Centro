import { Router } from "express"
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/Usuario.js"
import { verifyToken, isAdmin } from "./controllers/authController.js"

const routerUser = Router()

routerUser.get("/", verifyToken, getAllUsers)
routerUser.get("/:id", verifyToken, getUser)
routerUser.post("/", verifyToken, isAdmin, createUser)
routerUser.put("/:id", verifyToken, isAdmin, updateUser)
routerUser.delete("/:id", verifyToken, isAdmin, deleteUser)

export default routerUser
