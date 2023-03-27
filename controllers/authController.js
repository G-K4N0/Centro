import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';
import Privilegio from '../models/Privilegio.js';
import { validationResult } from 'express-validator';

dotenv.config({ path: './.env'});

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nickname, password } = req.body;

  try {
    const user = await Usuario.findOne({
      attributes: ['id', 'name','nickname', 'password','imageUrl'],
      include: [{
        model: Privilegio,
        attributes: ['name']
      }],
      where: { nickname }
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuario y/o contraseña incorrecta' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: 'Usuario y/o contraseña incorrecta' });
    }

    const { id,name, privilegio, imageUrl } = user;

    const token = jwt.sign(
      { id, name, privilegio, imageUrl },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIME_EXPIRE }
    );

    const cookiesOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
    res.cookie('token', token, cookiesOptions);

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  }
}

export const verifyToken = async(req, res, next) => {

    const autHeader = req.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1];

    if (token == null)
        return res.status(401).send('Inicia sesión');
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).send("Acceso denegado");

        req.user = user;
        next();
    });
}

export const logout = (req,res) =>{
    res.clearCookie('token');
    return res.redirect('/')
}
