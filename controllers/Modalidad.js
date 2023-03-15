import modModel from '../models/Modalidad.js';

export const getAllMods = async (req, res) => {
    try {
        const mods = await modModel.findAll();
        res.json(mods);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getMod = async (req, res) => {
    try {
        const mod = await modModel.findAll({
            where:{
                id:req.params.id
            }
        });

        res.json(mod);
    } catch (error) {
        res.json({
            'message': error.message
        });
    }
}

export const createMod = async (req,res) => {
    try {
        await modModel.create(req.body);
        res.json({
            "message": "Modalidad agregado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateMod = async (req, res) =>{
    try {
        await modModel.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message":"Modalidad actualizada"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const deleteMod = async (req, res) =>{
    try {
        await modModel.destroy({
            where:{
                id : req.params.id
            }
        });
        res.json({"message": "Modalidad eliminado"});
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}