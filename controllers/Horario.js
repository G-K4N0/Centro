import Grupo from '../models/Grupo.js';
import Horario from '../models/Horario.js'
import Lab from '../models/Lab.js';
import Materia from '../models/Materia.js';
import Usuario from '../models/Usuario.js';
import Semestre from '../models/Semestre.js';
import Carrera from '../models/Carrera.js';
import Tipo from '../models/Tipo.js'
import db from '../database/db.js'
import { QueryTypes, Op } from 'sequelize';
import { DateTime } from "luxon";

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
        const now = DateTime.local();
        const day = now.setLocale('es').toFormat('cccc');
        const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
        const idUser = parseInt(req.params.id);
        
        const data = await db.query(
            `CALL GetHorarioByDocentes(${idUser}, '${capitalizedDay}')`,
        );
        
        res.json(data);
    } catch (error) {
        res.json(error.message);
    }
};

export const getTimes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const data = await Horario.findAndCountAll({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'actual'],
            where: {
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
            ],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(data.count / limit);

        res.json({
            totalItems: data.count,
            totalPages: totalPages,
            currentPage: page,
            times: data.rows
        });
    } catch (error) {
        res.json(error.message);
    }
};


export const getTimesByDays = async (req, res) => {
    try {
        const now = DateTime.local();
        const day = now.setLocale('es').toFormat('cccc');
        const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
        const consulta = await db.query(`select dia, inicia, finaliza,carrera.name AS carrera,
        grupo.name AS grupo,
        materia.name AS materia,
        lab.name AS laboratorio,
        lab.ocupado AS ocupado,
        usuario.name AS docente,
        usuario.image AS image
        from horario 
        JOIN grupo on idGrupo=grupo.id 
        JOIN carrera on idCarrera=carrera.id 
        JOIN materia on idMateria=materia.id 
        JOIN lab on idLab=lab.id 
        JOIN usuario on idUsuario=usuario.id 
        where dia='${capitalizedDay}'`
        ,{type: QueryTypes.SELECT})
        res.json(consulta)
    } catch (error) {
        res.json(error)
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
        const { inicia, finaliza, dia, idLab, idUsuario } = req.body

        const inputInicia = parseInt(inicia.replace(':', ''))
        const inputFinaliza = parseInt(finaliza.replace(':', ''))

        if (inputInicia === inputFinaliza) {
            return res.status(200).json({message: 'No puedes agregar la misma hora para el inicio y la finalización'})
        }

        if (inputFinaliza < inputInicia) {
            return res.status(200).json({message: 'No puedes agregar una hora de finalización pasada'})
        }
        const labs = await Horario.findAll({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idLab', 'idUsuario'],
            where: { idLab }
          });
          
          if (labs.length > 0) {
            const overlappingLab = labs.find(lab => {
              const iniciaStored = parseInt(lab.inicia.replace(':', ''));
              const finalizaStored = parseInt(lab.finaliza.replace(':', ''));
          
              const iniciaOverlap = inputInicia < finalizaStored && iniciaStored < inputFinaliza;
              const finalizaOverlap = inputFinaliza > iniciaStored && finalizaStored > inputInicia;
          
              return lab.dia.includes(dia) && (iniciaOverlap || finalizaOverlap);
            });
          
            if (overlappingLab) {
              return res.json({ message: 'Existe un horario que ya incluye una de las horas ingresadas', encontrado: true });
            }
          }
          
          const overlappingLabWithDifferentUser = await Horario.findOne({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idLab', 'idUsuario'],
            where: { dia,inicia,finaliza , idLab: { [Op.ne]: idLab }, idUsuario }
          });
          
          if (overlappingLabWithDifferentUser) {
            return res.json({ message: 'El usuario tiene asignado el mismo horario en el mismo día en otro laboratorio', encontrado: true });
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

        const inputInicia = parseInt((inicia.split(':')[0]) + (inicia.split(':')[1]));
        const inputFinaliza = parseInt((finaliza.split(':')[0]) + (finaliza.split(':')[1]));

        const labs = await Horario.findAll({
            attributes: ['id', 'inicia', 'finaliza', 'dia', 'idLab', 'idUsuario'],
            where: {
                idLab: idLab
            }
        });

        if (labs !== null) {
            let dayEqual = [];
            labs.forEach(lab => {
                if (lab.dia.includes(dia)) {
                    dayEqual.push(lab);
                }
            });

            let encontrado = null;

            dayEqual.forEach(dia => {
                if (dia.id !== id) {
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

        await toTimeUpdate.update(req.body);

        res.status(200).json({ message: "Horario modificado" });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateManyTimesActual = async (req, res) => {
    try {
      const { ids, actual } = req.body

      if (!ids || !actual) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos' })
      }
  
      await Horario.update({ actual }, { where: { id: ids } })
  
      res.status(200).json({ message: 'Horarios actualizados' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al actualizar los horarios' })
    }
  }
  

export const deleteTime = async (req, res) => {
    try {
        await Horario.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            "message": "Horario eliminado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        })
    }
}
