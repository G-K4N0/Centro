import semesterModel from '../models/Semestre.js';

export const getAllSemesters = async (req, res) => {
    try {
        const semesters = await semesterModel.findAll();
        res.json(semesters);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getSemester = async (req, res) => {
    try {
        const semester = await semesterModel.findAll({
            where:{
                id:req.params.id
            }
        });

        res.json(semester);
    } catch (error) {
        res.json({
            'message': error.message
        });
    }
}

export const createSemester = async (req,res) => {
    try {
        await semesterModel.create(req.body);
        res.json({
            "message": "Semestre agregado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateSemester = async (req, res) =>{
    try {
        await semesterModel.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message":"Semestre actualizado"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const deleteSemester = async (req, res) =>{
    try {
        await semesterModel.destroy({
            where:{
                id : req.params.id
            }
        });
        res.json({"message": "Semestre eliminado"});
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}