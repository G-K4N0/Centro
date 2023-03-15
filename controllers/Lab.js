import labModel from "../models/Lab.js"

export const getAllLabs = async (req, res) => {
    try {
        const labs  = await labModel.findAll();

        res.json(labs);
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const getLab = async (req, res) => {
    try {
        const lab = await labModel.findAll({
            where:
            {
                id: req.params.id
            }
        });
        res.json(lab);
    } catch (error) {
        res.json({
            "message": error.message
        })
    }
}

export const createLab = async (req, res) => {
    try {
        await labModel.create(req.body);

        res.json({
            "message":"Laboratorio agregado"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const updateLab = async (req,res) => {
    try {
        await labModel.update(req.body,{
            where: {
                id : req.params.id
            }
        });
        res.json({
            "message": "Lab actualizado"
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const deleteLab = async (req,res) => {
    try {
        await labModel.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            "message": "Lab eliminado"
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}