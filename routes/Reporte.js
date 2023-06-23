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

routeReport.get("/", verifyToken, isAdmin, getAllReports)
routeReport.get("/:id", verifyToken, isAdmin, getReport)
routeReport.post("/", verifyToken, createReport)
routeReport.put("/:id", verifyToken, isAdmin, updateReport)
routeReport.delete("/:id", verifyToken, isAdmin, deleteReport)

export default routeReport
