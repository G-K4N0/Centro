import express from 'express';
import { createTime, deleteTime, getTimesbyDocentes, getTime, getTimes, updateTime } from '../controllers/Horario.js';
const timeRoute = express.Router();
import { verifyToken } from '../controllers/authController.js';

timeRoute.get('/horario/docente/:id',getTimesbyDocentes);
timeRoute.get('/',getTimes);
timeRoute.get('/horarios/:id', getTime);
timeRoute.post('/horarios',verifyToken, createTime);
timeRoute.put('/horarios/:id',verifyToken,updateTime);
timeRoute.delete('/horarios/:id',verifyToken,deleteTime);

export default timeRoute;