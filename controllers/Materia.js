import Materia from '../models/Materia.js'

export const getAllTopics = async (req, res) => {
    try {
        const topics = await Materia.findAll();

        res.json(topics);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getTopic = async (req, res) => {
    try {
        const topic = await Materia.findAll({
            where:{
                id:req.params.id
            }
        });
        res.json(topic);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const createTopic = async (req, res) => {
    try {
        await Materia.create(req.body);

        res.json({
            "message": "Materia añadida"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateTopic =  async (req,res) => {
    try {
        await Materia.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        res.json({
            "message":"Materia actualizada"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const deleteTopic = async (req, res) => {
    try {
        await Materia.destroy({
            where:{
                id:req.params.id
            }
        });

        res.json({
            "message": "Materia eliminada"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}