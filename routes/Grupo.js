import express from 'express';
import {createGroup, deleteGroup, getAllGroups, getGroup, updateGroup} from '../controllers/Grupo.js';

const routeGroup = express.Router();

routeGroup.get('/',getAllGroups);
routeGroup.get('/:id', getGroup);
routeGroup.post('/',createGroup);
routeGroup.put('/:id',updateGroup);
routeGroup.delete('/:id',deleteGroup);

export default routeGroup;