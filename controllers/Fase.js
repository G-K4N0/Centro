import Fase from '../models/Fase.js';

export const getAllPhases = async (req, res) => {
    try {
        const phases = await Fase.findAll();
        res.json(phases);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getPhase = async (req, res) => {
    try {
        const phase = await Fase.findAll({
            where:{
                id:req.params.id
            }
        });

        res.json(phase);
    } catch (error) {
        res.json({
            'message': error.message
        });
    }
}

export const createPhase = async (req,res) => {
    try {
        await Fase.create(req.body);
        res.json({
            "message": "Fase agregado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updatePhase = async (req, res) =>{
    try {
        await Fase.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message":"Fase actualizado"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const deletePhase = async (req, res) =>{
    try {
        await Fase.destroy({
            where:{
                id : req.params.id
            }
        });
        res.json({"message": "Fase eliminado"});
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}