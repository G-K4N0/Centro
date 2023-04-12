import Grupo from '../models/Grupo.js';
import Carrera from '../models/Carrera.js';
import Fase from '../models/Fase.js';
import Modalidad from '../models/Modalidad.js';
import Semestre from '../models/Semestre.js';
import Tipo from '../models/Tipo.js';

export const getAllGroups = async (req, res) => {
    try {
        const grupos = await Grupo.findAll({
            attributes: ['name','createdAt'],
            include: [
                {
                    model: Carrera,
                    attributes: ['name']
                },
                {
                    model: Fase,
                    attributes: ['name']
                },
                {
                    model: Modalidad,
                    attributes: ['name']
                },
                {
                    model: Semestre,
                    attributes: ['name']
                },
                {
                    model: Tipo,
                    attributes: ['name']
                }
            ]
        });
        res.status(200).json(grupos);
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
            },
            attributes: ['name','createdAt'],
            include: [
                {
                    model: Carrera,
                    attributes: ['name']
                },
                {
                    model: Fase,
                    attributes: ['name']
                },
                {
                    model: Modalidad,
                    attributes: ['name']
                },
                {
                    model: Semestre,
                    attributes: ['name']
                },
                {
                    model: Tipo,
                    attributes: ['name']
                }
            ]
        });

        res.status(200).json(grupo);
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