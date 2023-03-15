import Grupo from '../models/Grupo.js';

export const getAllGroups = async (req, res) => {
    try {
        const grupos = await Grupo.findAll();
        res.json(grupos);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getGroup = async (req, res) => {
    try {
        const grupo = await Grupo.findAll({
            where:{
                id:req.params.id
            }
        });

        res.json(grupo);
    } catch (error) {
        res.json({
            'message': error.message
        });
    }
}

export const createGroup = async (req,res) => {
    try {
        await Grupo.create(req.body);
        res.json({
            "message": "Grupo creado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateGroup = async (req, res) =>{
    try {
        await Grupo.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message":"Grupo actualizado"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const deleteGroup = async (req, res) =>{
    try {
        await Grupo.destroy({
            where:{
                id : req.params.id
            }
        });
        res.json({"message": "Grupo eliminado"});
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}