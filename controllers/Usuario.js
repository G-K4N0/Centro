import Privilegio from "../models/Privilegio.js";
import userModel from "../models/Usuario.js"
import bcrypt from 'bcryptjs';


export const getAllUsers= async (req,res)=>{
    try {
        const users = await userModel.findAll({
            attributes:['id','name','nickname','password','imageUrl'],
            include:[
                {
                    model: Privilegio,
                    attributes:['name']
                }
            ]
        });
        res.json(users);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findAll({
            attributes:['id','name','nickname','password','imageUrl'],
            where:{
                id:req.params.id
            },
            include:[
                {
                    model: Privilegio,
                    attributes:['name']
                }
            ]
        });
        res.json(user);
    } catch (error) {
        res.json({message:error.message});
    }
}

export const createUser = async (req, res) =>{
    try {

        const user_name = req.body.name;
        const user_nickname = req.body.nickname;
        const user_password = req.body.password;
        const user_privileges = req.body.privileges;
        let passhash = await bcrypt.hash(user_password,8);
        await userModel.create({
            name:user_name,
            nickname:user_nickname,
            password:passhash,
            privileges:user_privileges
    });
        res.json(
            {
                "message":"Usuario creado"
            });
    } catch (error) {
        res.json({"message": error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        await userModel.update(req.body,{
            where: 
            {
                id:req.params.id
            }
            
        });
        res.json(
            {
                "message":"Usuario actualizado"
            });
    } catch (error) {
        res.json({message:error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        await userModel.destroy({
            where:
            {
                id:req.params.id
            }
        });
        res.json(
            {
                "message":"Usuario eliminado"
            });
    } catch (error) {
        res.json({message:error.message});
    }
}