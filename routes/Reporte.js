import { Router } from "express"
import {
  createReport,
  deleteReport,
  getAllReports,
  getReport,
  updateReport,
} from "../controllers/Reporte.js"
import { verifyToken, isAdmin } from "../controllers/authController.js"

const routeReport = Router()

routeReport.get("/", getAllReports)
routeReport.get("/:id", verifyToken, getReport)
routeReport.post("/", createReport)
routeReport.put("/:id", verifyToken, updateReport)
routeReport.delete("/:id", verifyToken, deleteReport)

export default routeReport
