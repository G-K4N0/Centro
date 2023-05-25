import { Router } from "express"
import {
  createTopic,
  deleteTopic,
  getAllTopics,
  getTopic,
  updateTopic,
  getTopicsForAdd
} from "../controllers/Materia.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"
const topicRoutes = Router()

topicRoutes.get("/", getAllTopics)
topicRoutes.get("/addHorario", getTopicsForAdd)
topicRoutes.get("/:id", verifyToken, getTopic)
topicRoutes.post("/", verifyToken, isAdmin, createTopic)
topicRoutes.put("/:id", verifyToken, isAdmin, updateTopic)
topicRoutes.delete("/:id", verifyToken, isAdmin, deleteTopic)

export default topicRoutes
