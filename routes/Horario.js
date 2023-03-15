import express from 'express';
import { createTime, deleteTime, getAllTimes, getTime, getTimes, updateTime } from '../controllers/Horario.js';
const timeRoute = express.Router();
import { verifyToken } from '../controllers/authController.js';

//timeRoute.get('/',getAllTimes);
timeRoute.get('/',getTimes);
timeRoute.get('/times/:id', getTime);
timeRoute.post('/times',verifyToken, createTime);
timeRoute.put('/times/:id',verifyToken,updateTime);
timeRoute.delete('/times/:id',verifyToken,deleteTime);

export default timeRoute;