import Tipo from '../models/Tipo.js';

export const getAllTypes = async (req, res) => {
    try {
        const types = await Tipo.findAll();
        res.json(types);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getType = async (req, res) => {
    try {
        const type = await Tipo.findAll({
            where:{
                id:req.params.id
            }
        });

        res.json(type);
    } catch (error) {
        res.json({
            'message': error.message
        });
    }
}

export const createType = async (req,res) => {
    try {
        await Tipo.create(req.body);
        res.json({
            "message": "Tipo añadido"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateType = async (req, res) =>{
    try {
        await Tipo.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message":"Tipo actualizado"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const deleteType = async (req, res) =>{
    try {
        await Tipo.destroy({
            where:{
                id : req.params.id
            }
        });
        res.json({"message": "Tipo eliminado"});
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}