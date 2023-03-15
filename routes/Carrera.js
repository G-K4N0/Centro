import  express  from 'express';
import { createCareer, deletCareer, getAllCareers, getCareer, updateCareer } from '../controllers/Carrera.js'

const routerCareer = express.Router();

routerCareer.get('/',getAllCareers);
routerCareer.get('/:id',getCareer);
routerCareer.post('/',createCareer);
routerCareer.put('/:id',updateCareer);
routerCareer.get('/:id',deletCareer);

export default routerCareer;