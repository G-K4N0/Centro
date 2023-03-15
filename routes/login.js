import  express from 'express';
import {login, logout} from '../controllers/authController.js';


const auth = express.Router();

auth.post('/login',login);
auth.get('/logout',logout);

export default auth;
