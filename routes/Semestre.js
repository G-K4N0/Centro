import { Router } from "express"
import {
  createSemester,
  deleteSemester,
  getAllSemesters,
  getSemester,
  updateSemester,
} from "../controllers/Semestre.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"
const semesterRoute = Router()

semesterRoute.get("/", verifyToken, getAllSemesters)
semesterRoute.get("/:id", verifyToken, getSemester)
semesterRoute.post("/", verifyToken, isAdmin, createSemester)
semesterRoute.put("/", verifyToken, isAdmin, updateSemester)
semesterRoute.delete("/", verifyToken, isAdmin, deleteSemester)

export default semesterRoute
