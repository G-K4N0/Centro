import Materia from '../models/Materia.js'
import { Sequelize } from 'sequelize'

export const getAllTopics = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const {count, rows:topics} = await Materia.findAndCountAll(
            {
                attributes:['id','name'],
                where: {
                    
                },
                limit: limit,
                offset: offset
            });

        const totalPages = Math.ceil(count / limit)
        res.json({
            totalItems: count,
            totalPages,
            currentPage: page,
            topics
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getTopicsForAdd = async (req, res) => {
    try {
        const topic = await Materia.findAll({
            attributes:['id','name']
        });
        res.json({topic});
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
            },
            attributes:['id','name']
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
        const name = req.body.name
        const materiaFound = await Materia.findOne({
            where: {
                name: {
                    [Sequelize.Op.eq]: req.body.name
                }
            }
        });

        if (materiaFound !== null) {
            return res.json({"message": `La materia ${materiaFound.name } ya existe`})
        }

        await Materia.create(req.body);

        res.json({
            "message": "Materia añadida con éxito"
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