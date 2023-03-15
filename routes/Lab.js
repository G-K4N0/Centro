import  express  from 'express';
import {getAllLabs, getLab,createLab,updateLab,deleteLab} from '../controllers/Lab.js'

const labRoute = express.Router();

labRoute.get('/',getAllLabs);
labRoute.get('/:id', getLab);
labRoute.post('/',createLab);
labRoute.put('/:id',updateLab);
labRoute.delete('/:id',deleteLab);

export default labRoute;