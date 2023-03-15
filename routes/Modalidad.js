import express from 'express';
import {createMod, deleteMod, getAllMods, getMod, updateMod} from '../controllers/Modalidad.js';

const modRoutes = express.Router();

modRoutes.get('/',getAllMods);
modRoutes.get('/:id', getMod);
modRoutes.post('/', createMod);
modRoutes.put('/:id', updateMod);
modRoutes.delete('/:id', deleteMod);

export default modRoutes;