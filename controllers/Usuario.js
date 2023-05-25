import Privilegio from "../models/Privilegio.js";
import Usuario from "../models/Usuario.js"
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'
import bcrypt from 'bcryptjs';


export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);

    const offset = (page - 1) * limit;

    const { count, rows: users } = await Usuario.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: ['id', 'user', 'name', 'password', 'image'],
      include: [
        {
          model: Privilegio,
          attributes: ['name'],
        },
      ],
    });

    const totalPages = Math.ceil(count / limit);
    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      users,
    });
  } catch (error) {
    console.error(`Error en getAllUsers: -> ${error.message}`);
    res.status(500).json({
      error: `Error en getAllUsers: --> ${error.message}`,
    });
  }
};

export const getUserDocente = async (req, res) => {
  try {
   const page = parseInt(req.query.page || 1);
    const pageSize = parseInt(req.query.pageSize || 10);

    const offset = (page - 1) * pageSize;

    const users = await Usuario.findAll({
      limit: pageSize,
      offset,
      attributes:['id','name'],
      include: [
        {
          model: Privilegio,
          where: {
            name: 'Docente'
          }
        }
      ]
    })
    
    res.status(200).json(users)
    
  } catch (error) {
    
  }
}

export const getUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Usuario.findOne({
        where: { id: userId },
        attributes: ['user','name', 'password', 'image'],
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
  

  export const createUser = async (req, res) => {
    try {
        const user_name = req.body.name;
        const user_nickname = req.body.user;
        const user_password = req.body.password;
        const user_privileges = req.body.idPrivilegio;

        const userFound = await Usuario.findOne({
          where: { name: user_name}
        })

        if (userFound !== null) {
          return res.json({"message": "El docente ya existe en la base de datos"})
        }

        let imagen = '';

        if (req.files && req.files.image) { 
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            imagen = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        let passhash = await bcrypt.hash(user_password, 10);
        await Usuario.create({
            name: user_name,
            user: user_nickname,
            password: passhash,
            idPrivilegio: user_privileges,
            image: imagen
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
      userToUpdate.image = {
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
      
      const dataImage = user.image.public_id
      
      dataImage && await deleteImage(dataImage)

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
