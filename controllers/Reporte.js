import reportModel from "../models/Reporte.js"
import Usuario from "../models/Usuario.js"

export const getAllReports = async (req, res) => {
    try {
        const reports = await reportModel.findAll({
            attributes:['id','note','suggestion','createdAt'],
            include: [
                {
                    model: Usuario,
                    attributes: ['name']
                }
            ]
        });
        res.json(reports);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getReport = async (req,res) => {
    try {
        const report = await reportModel.findAll({
            where:{
                id:req.params.id
            },
            attributes:['id','note','suggestion','createdAt'],
            include: [
                {
                    model: Usuario,
                    attributes: ['name']
                }
            ]
        });

        res.json(report);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const createReport = async (req, res) => {
    try {
        await reportModel.create(req.body);
        res.json({
            "message" : "Reporte creado"
        });
    } catch (error) {
        
    }
}

export const updateReport = async (req,res) => {
    try {
        await reportModel.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        res.json({
            "message": "Reporte actualizado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        })
    }
}

export const deleteReport = async (req,res) => {
    try {
        await reportModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Reporte eliminado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}