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

  const { user, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      attributes: ['id', 'name','user', 'password','image', 'idPrivilegio'],
      include: [{
        model: Privilegio,
        attributes: ['name']
      }],
      where: { user:user }
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario y/o contraseña incorrecta' });
    }

    const validPass = await bcrypt.compare(password, usuario.password);
    if (!validPass) {
      return res.status(401).json({ message: `Usuario y/o contraseña incorrecta ${validPass}` });
    }

    let url = ''
    if (usuario.image !== null) {
       url = usuario.image
    }
    const { id, name, privilegio } = usuario

    let image = ''
    if (url !== '') {
      image = urlString(url)
    } else {
      image = url
    }

    const token = jwt.sign(
      { id, name, privilegio, image },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIME_EXPIRE_ACCESS_TOKEN }
    );

    const refreshToken = jwt.sign(
  { id, name, privilegio, image },
  process.env.REFRESH_TOKEN_SECRET,
  {expiresIn: process.env.JWT_TIME_EXPIRE_REFRESH_TOKEN}
);

    const cookiesOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'Lax'
    };
    res.cookie('token', refreshToken, cookiesOptions);

    res.status(200).json({ token, rol:usuario.idPrivilegio });
  } catch (error) {
    res.status(500).json({ message: `Ocurrió un error en el servidor ${error}` });
  }
}

function urlString(url) {
  const stringUrl = url.url
  const arrayUrl = stringUrl.split("upload");

  const urlModified = arrayUrl[0] + "upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_rgb:FFA500,b_rgb:262c35" + arrayUrl[1].replace('svg','jpg');
  const public_id = url.public_id
  return {url: urlModified, public_id }
}

export const verifyToken = async(req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
      return res.status(401).send('Inicia sesión');

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
          return res.status(403).send('Acceso denegado');
      } else {
          const user = await Usuario.findOne({ where: { id: decoded.id } });
          if (!user) {
              return res.status(403).send('Acceso denegado');
          }
          req.user = user;

          if (user.idPrivilegio === 1) {
              next();
          } else if (user.idPrivilegio === 2) {
              next();
          } else {
              return res.status(403).send('Acceso denegado');
          }
      }
  });
}

export function isAdmin(req, res, next) {
  const user = req.user;
  if (!(user.idPrivilegio === 1)) {
    return res.status(403).send('No tiene permiso para acceder a esta ruta.');
  }

  next();
}

export const logout = (req, res) => {
  const { token } = req.cookies;
  
  if (!token) {
    return res.redirect('/');
  }

  const cookiesOptions = {
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'Lax'
  };

  res.clearCookie('token');
  res.cookie('token', '', cookiesOptions);

  return res.redirect('/');
};

