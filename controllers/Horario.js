import Grupo from '../models/Grupo.js';
import Horario from '../models/Horario.js'
import Lab from '../models/Lab.js';
import Materia from '../models/Materia.js';
import Usuario from '../models/Usuario.js';
import Semestre from '../models/Semestre.js';
import Carrera from '../models/Carrera.js';
import Tipo from '../models/Tipo.js'

export const getTimesbyLabs = async (req, res) => {
    try {
        const data = await Horario.findAll({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idUsuario', 'idLab'],
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
                        ocupado: true,
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
            attributes: ['id', 'inicia', 'finaliza', 'dia','actual'],
            where:{
                actual: true
            },
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
                        },
                        {
                            model: Tipo,
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
        const { inicia, finaliza, dia, idLab } = req.body

        const inputInicia = parseInt(inicia.replace(':', ''))
        const inputFinaliza = parseInt(finaliza.replace(':', ''))

        if (inputInicia === inputFinaliza) {
            return res.status(200).json({message: 'No pudes agregar la misma hora para el inicio y la finalización'})
        }
        const labs = await Horario.findAll({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idLab', 'idUsuario'],
            where: { idLab }
        })

        if (labs.length > 0) {
            const dayEqual = labs.filter(lab => lab.dia.includes(dia))

            const encontrado = dayEqual.some(dia => {
                const iniciaStored = parseInt(dia.inicia.replace(':', ''))
                const finalizaStored = parseInt(dia.finaliza.replace(':', ''))

                const iniciaEqual = (inputInicia === iniciaStored && inputFinaliza === finalizaStored)
                const iniciaProblem = (inputInicia > iniciaStored && inputInicia < finalizaStored)
                const finalizaProblem = (inputFinaliza > iniciaStored && inputFinaliza < finalizaStored)
                const iniciaCompareStored = (iniciaStored > inputInicia && iniciaStored < inputFinaliza)
                const finalizaCompareStored = (finalizaStored > inputInicia && finalizaStored < inputFinaliza)

                return iniciaProblem || finalizaProblem || iniciaCompareStored || finalizaCompareStored || iniciaEqual
            })

            if (encontrado) {
                return res.json({ message: 'Existe un horario que ya incluye una de las horas ingresadas', encontrado })
            }
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
        const id = req.params.id;
        const inicia = req.body.inicia;
        const finaliza = req.body.finaliza;
        const dia = req.body.dia;
        const idLab = req.body.idLab;

        //conversion de las horas a enteros 
        const inputInicia = parseInt((inicia.split(':')[0]) + (inicia.split(':')[1]));
        const inputFinaliza = parseInt((finaliza.split(':')[0]) + (finaliza.split(':')[1]));

        //obtener un array de los horarios del laboratorio
        const labs = await Horario.findAll({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idLab', 'idUsuario'],
            where: {
                idLab: idLab
            }
        });

        if (labs !== null) {
            //comparar el dia en el que toca
            let dayEqual = [];
            labs.forEach(lab => {
                if (lab.dia.includes(dia)) {
                    dayEqual.push(lab);
                }
            });

            // comparar los horarios
            let encontrado = null;

            dayEqual.forEach(dia => {
                if (dia.id !== id) { // ignorar el horario que se está actualizando
                    // Convertir en entero las horas almacenadas
                    const iniciaStored = parseInt((dia.inicia.split(':')[0]) + (dia.inicia.split(':')[1]));
                    const finalizaStored = parseInt((dia.finaliza.split(':')[0]) + (dia.finaliza.split(':')[1]));
                    
                    const iniciaEqual = (inputInicia === iniciaStored && inputFinaliza === finalizaStored);
                    const iniciaProblem = (inputInicia > iniciaStored && inputInicia < finalizaStored);
                    const finalizaProblem = (inputFinaliza > iniciaStored && inputFinaliza < finalizaStored);
                    const iniciaCompareStored = (iniciaStored > inputInicia && iniciaStored < inputFinaliza);
                    const finalizaCompareStored = (finalizaStored > inputInicia && finalizaStored < inputFinaliza);

                    const flag = iniciaProblem || finalizaProblem || iniciaCompareStored || finalizaCompareStored || iniciaEqual;

                    if (flag) encontrado = dia;
                }
            });

            if (encontrado) {
                return res.json({ message: 'Existe un horario que ya incluye una de las horas ingresadas', encontrado });
            }
        }

        // Actualizar el horario
        await toTimeUpdate.update(req.body);

        res.status(200).json({ message: "Horario modificado" });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateOneTimeActual = async (req, res) => {
    try {
        const id = req.params.id
        const timeToUpdate = await Horario.findByPk(id)

        Object.assign(timeToUpdate,req.body)

        await timeToUpdate.save()

        res.status(200).json({message: 'Horarios actualizados'})
    } catch (error) {
        
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
