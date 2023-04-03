import Privilegio from "../models/Privilegio.js";
import Usuario from "../models/Usuario.js"
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'
import bcrypt from 'bcryptjs';


export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const pageSize = parseInt(req.query.pageSize || 10);

    const offset = (page - 1) * pageSize;

    const users = await Usuario.findAll({
      limit: pageSize,
      offset,
      include:[
        {
          model:Privilegio,
          attributes: ['name']
        }
      ]
    });

    res.json(users);
  } catch (error) {
    console.error(`Error en getAllUsers: ${error.message}`);
    res.status(500).json({
      error: `Error en getAllUsers: ${error.message}`
    });
  }
};

export const getUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Usuario.findOne({
        where: { id: userId },
        include:[
          {
            model:Privilegio,
            attributes: ['name']
          }
        ]
      });
      
      if (!user) {
        return res.status(404).json({
          error: `Usuario con ID ${userId} no encontrado`
        });
      }
  
      res.json(user);
    } catch (error) {
      console.error(`Error en getUser: ${error.message}`);
      res.status(500).json({
        error: `Error en User: ${error.message}`
      });
    }
  };
  

export const createUser = async (req, res) =>{
    try {
      const user_name = req.body.name;
      const user_nickname = req.body.nickname;
      const user_password = req.body.password;
      const user_privileges = req.body.privileges;
  
      let imagen = ''
      let imagenPublicId = ''
      if (req.files.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        imagen = result.secure_url
        imagenPublicId = result.public_id
      }
      
      let passhash = await bcrypt.hash(user_password,10);
      await Usuario.create({
        name: user_name,
        nickname: user_nickname,
        password: passhash,
        privileges: user_privileges,
        image: imagen,
        imagenPublicId: imagenPublicId
      });
  
      res.json({ "message": "Usuario creado" });
    } catch (error) {
      res.json({ "message": error.message });
    }
  };

  export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userToUpdate = await Usuario.findByPk(id);

    Object.assign(userToUpdate, req.body);

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      userToUpdate.imageUrl = {
        url: result.secure_url,
        public_id: result.public_id
      };
    }

    await userToUpdate.save();

    res.json({ "message": "Usuario actualizado" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
    try {
      const user = await Usuario.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          error: 'El usuario no existe'
        });
      }
      
      const dataImage = JSON.parse(user.dataValues.imageUrl)
      dataImage.public_id && await deleteImage(dataImage.public_id)

      await Usuario.destroy({
        where: {
          id: req.params.id
        }
      });
  
      res.json({
        message: 'Usuario eliminado'
      });
    } catch (error) {
      console.error(`Error en deleteUser: ${error.message}`);
      res.status(500).json({
        error: `Error en deleteUser: ${error.message}`
      });
    }
  };
