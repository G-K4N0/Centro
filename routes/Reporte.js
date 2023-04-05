import { Router } from "express"
import {
  createReport,
  deleteReport,
  getAllReports,
  getReport,
  updateReport,
} from "../controllers/Reporte.js"
import { verifyToken } from "./controllers/authController.js"

const routeReport = Router()

routeReport.get("/", verifyToken, getAllReports)
routeReport.get("/:id", verifyToken, getReport)
routeReport.post("/", verifyToken, createReport)
routeReport.put("/:id", verifyToken, updateReport)
routeReport.delete("/:id", verifyToken, deleteReport)

export default routeReport
