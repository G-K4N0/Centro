import { Router } from "express"
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  updateGroup,
} from "../controllers/Grupo.js"
import { verifyToken, isAdmin } from "./controllers/authController.js"
const routeGroup = Router()

routeGroup.get("/", verifyToken, isAdmin, getAllGroups)
routeGroup.get("/:id", verifyToken, isAdmin, getGroup)
routeGroup.post("/", verifyToken, isAdmin, createGroup)
routeGroup.put("/:id", verifyToken, isAdmin, updateGroup)
routeGroup.delete("/:id", verifyToken, isAdmin, deleteGroup)

export default routeGroup
