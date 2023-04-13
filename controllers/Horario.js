import Grupo from '../models/Grupo.js';
import Horario from '../models/Horario.js'
import Lab from '../models/Lab.js';
import Materia from '../models/Materia.js';
import Usuario from '../models/Usuario.js';
import Semestre from '../models/Semestre.js';
import Carrera from '../models/Carrera.js';
export const getTimesbyDocentes = async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = await Horario.findAll({
            where: {
                idUser: userId
            },
            attributes: ['id', 'inicia', 'finaliza', 'dia'],
            include: [
                {
                    model: Materia,
                    attributes: ['name']
                },
                {
                    model: Grupo,
                    attributes: ['name'],
                    include: [
                        {
                            model: Semestre,
                            attributes: ['name']
                        },
                        {
                            model: Carrera,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: Lab,
                    attributes: ['name', 'ocupado']
                },
                {
                    model: Usuario,
                    attributes: ['name', 'image']
                }
            ]
        });
        res.json(data);
    } catch (error) {
        res.json(error.message);
    }
};

export const getTimes = async (req,res) => {
    try {
        const data = await Horario.findAll({
            attributes:['id','inicia','finaliza', 'dia'],
            include: [
                {
                    model: Materia,
                    attributes: ['name']
                },
                {
                    model:Grupo,
                    attributes: ['name'],
                    include:[
                        {
                            model:Semestre,
                            attributes:['semestre']
                        },
                        {
                            model:Carrera,
                            attributes:['name']
                        }
                    ]
                },
                {
                    model:Lab,
                    attributes: ['name','ocupado']
                },
                {
                    model:Usuario,
                    attributes: ['name','image']
                }
            ]
        })
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }
}

export const getTime = async (req,res) => {
    try {
        const horario = await Horario.findOne({
            where:{
                id : req.params.id
            },
            attributes:['id','inicia','finaliza', 'dia'],
            include: [
                {
                    model: Materia,
                    attributes: ['name']
                },
                {
                    model:Grupo,
                    attributes: ['name']
                },
                {
                    model:Lab,
                    attributes: ['name','ocupado']
                },
                {
                    model:Usuario,
                    attributes: ['name','image']
                }
            ]
        });
        res.json(horario);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const createTime = async (req, res) => {
    try {
        await Horario.create(req.body);
        res.json({
            "message": "Horario creado"
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateTime = async (req,res) => {
    try {
        await Horario.update(req.body,{
            where:{
                id: req.params.id
            }
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const deleteTime = async (req, res) => {
    try {
        await Horario.destroy({
            where:{
                id:req.params.id
            }
        });
        res.json({
            "message":"Horario eliminado"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}
