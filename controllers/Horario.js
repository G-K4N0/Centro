import Grupo from '../models/Grupo.js';
import Horario from '../models/Horario.js'
import Lab from '../models/Lab.js';
import Materia from '../models/Materia.js';
import Usuario from '../models/Usuario.js';
import Semestre from '../models/Semestre.js';
import Carrera from '../models/Carrera.js';
import { INTEGER } from 'sequelize';

export const getTimesbyLabs = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Horario.findAll({
            where: {
                idUsuario: userId
            },
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idUsuario'],
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
                    where: {
                        ocupado: true
                    },
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


export const getTimesbyDocentes = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Horario.findAll({
            where: {
                idUsuario: userId
            },
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idUsuario'],
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

export const getTimes = async (req, res) => {
    try {
        const data = await Horario.findAll({
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
        })
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }
}

export const getTime = async (req, res) => {
    try {
        const horario = await Horario.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'inicia', 'finaliza', 'dia'],
            include: [
                {
                    model: Materia,
                    attributes: ['name']
                },
                {
                    model: Grupo,
                    attributes: ['name']
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
        res.json(horario);
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const createTime = async (req, res) => {
    try {
        const inicia = req.body.inicia
        const finaliza = req.body.finaliza
        const dia = req.body.dia
        const idLab = req.body.idLab

        //conversion de las horas a enteros 
        const inputInicia = parseInt((inicia.split(':')[0]) + (inicia.split(':')[1]))
        const inputFinaliza = parseInt((finaliza.split(':')[0]) + (finaliza.split(':')[1]))

        //obtener un array del laboratorio al que se refiere con sus respectivos horarios
        const labs = await Horario.findAll({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idLab', 'idUsuario'],
            where: {
                idLab: idLab
            }
        })

        if(labs !== null){
        //comparar el dia en el que toca
        let dayEqual = []
        labs.forEach(lab => {

            if (lab.dia.includes(dia)) {
                dayEqual.push(lab)
            }
        });

        // comparar los horarios
        let encontrado = null


        dayEqual.forEach(dia => {
            // Convertir en entero las horas almacenadas
            const iniciaStored = parseInt((dia.inicia.split(':')[0]) + (dia.inicia.split(':')[1]))
            const finalizaStored = parseInt((dia.finaliza.split(':')[0]) + (dia.finaliza.split(':')[1]))

            const iniciaProblem = (inputInicia > iniciaStored && inputInicia < finalizaStored)
            const finalizaProblem = (inputFinaliza > iniciaStored && inputFinaliza < finalizaStored)

            const iniciaCompareStored = (iniciaStored > inputInicia && iniciaStored < inputFinaliza)
            const finalizaCompareStored = (finalizaStored > inputInicia && finalizaStored < inputFinaliza)

            const flag = iniciaProblem || finalizaProblem || iniciaCompareStored || finalizaCompareStored

            if (flag) encontrado = dia
        })

         return res.json({ message: 'Existe un horario que ya incluye una de las horas ingresadas',encontrado })
        }

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

export const updateTime = async (req, res) => {
    try {
        const id = req.params.id

        const toTimeUpdate = await Horario.findByPk(id)

        Object.assign(toTimeUpdate, req.body)

        await toTimeUpdate.save()

        res.status(200).json({ messaje: "Horario  modificado" })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const deleteTime = async (req, res) => {
    try {
        await Horario.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Horario eliminado"
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}
