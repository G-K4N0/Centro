import Carrera from "../models/Carrera.js"

export const getAllCareers = async (req,res) =>{
    try {
        const careers = await Carrera.findAll();
        res.json(careers);
    } catch (error) {
        res.json({message:error.message});
    }
}

export const getCareer = async (req, res) => {
    try {
        const career = await Carrera.findOne({
            where:
            {
                id:req.params.id
            }
        });
        res.json(career);
    } catch (error) {
        res.json(
            {
                messaje: error.message
            }
        );
    }
}

export const createCareer = async (req, res) =>{
    try {
        await Carrera.create(req.body);
        res.json(
            {
                "message":"Carrera añadido con éxito"
            }
        )
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateCareer = async (req, res) => {
    try {
        await Carrera.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message":"Carrera actualizado"
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
} 

export const deletCareer = async (req, res) => {
    try {
        await Carrera.destroy ({
            where:{
                id:req.params.id
            }
        });
        res.json({"message":"Carrera eliminada"});
    } catch (error) {
        res.json({"message":error.message});
    }
}