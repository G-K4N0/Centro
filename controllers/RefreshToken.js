import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';
import Privilegio from '../models/Privilegio.js';
dotenv.config({ path: './.env'});

export const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;

    if(!cookie?.token) return res.status(401).json({message:'-No hay token-'})

    const refreshToken = cookie.token
  
    if (!refreshToken) {
      return res.status(401).json({ message: 'No se proporcionó el token de refresco' });
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  
      const usuario = await Usuario.findOne({
        attributes: ['id', 'name','user', 'image', 'idPrivilegio'],
        include: [{
          model: Privilegio,
          attributes: ['name']
        }],
        where: { id: decoded.id }
      });
  
      if (!usuario) {
        return res.status(401).json({ message: 'No se encontró el usuario asociado al token de refresco' });
      }
  
      const { id, name, privilegio, image } = usuario;
  
      const token = jwt.sign(
        { id, name, privilegio, image },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TIME_EXPIRE_ACCESS_TOKEN }
      );
  
      res.status(200).json({token, rol:usuario.idPrivilegio});
    } catch (error) {
      res.status(403).json({ message: `El token de refresco no es válido ${error}` });
    }
  }
  
