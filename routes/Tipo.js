import express from 'express';
import {createType, deleteType, getAllTypes, getType, updateType} from '../controllers/Tipo.js';

const typeRoute = express.Router();

typeRoute.get('/', getAllTypes);
typeRoute.get('/:id', getType);
typeRoute.post('/', createType);
typeRoute.put('/', updateType);
typeRoute.delete('/', deleteType);

export default typeRoute;