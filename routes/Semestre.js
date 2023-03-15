import express from 'express';
import {createSemester, deleteSemester, getAllSemesters, getSemester, updateSemester} from '../controllers/Semestre.js';

const semesterRoute = express.Router();

semesterRoute.get('/', getAllSemesters);
semesterRoute.get('/:id', getSemester);
semesterRoute.post('/', createSemester);
semesterRoute.put('/', updateSemester);
semesterRoute.delete('/', deleteSemester);

export default semesterRoute;