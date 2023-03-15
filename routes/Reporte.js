import express from 'express';
import {createReport, deleteReport, getAllReports, getReport, updateReport} from '../controllers/Reporte.js';

const routeReport = express.Router();

routeReport.get('/',getAllReports);
routeReport.get('/:id', getReport);
routeReport.post('/',createReport);
routeReport.put('/:id',updateReport);
routeReport.delete('/:id',deleteReport);

export default routeReport;