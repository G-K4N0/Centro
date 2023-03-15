import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/Usuario.js";

const routerUser = express.Router();

routerUser.get('/', getAllUsers);
routerUser.get('/:id', getUser);
routerUser.post('/', createUser);
routerUser.put('/:id', updateUser);
routerUser.delete('/:id', deleteUser);

export default routerUser;