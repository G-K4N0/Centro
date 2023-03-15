import express from 'express';
import {createPhase, deletePhase, getAllPhases, getPhase, updatePhase} from '../controllers/Fase.js';

const phaseRoute = express.Router();

phaseRoute.get('/',getAllPhases);
phaseRoute.get('/:id',getPhase);
phaseRoute.post('/', createPhase);
phaseRoute.put('/:id', updatePhase);
phaseRoute.delete('/:id', deletePhase);

export default phaseRoute;