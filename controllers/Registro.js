import Lab from "../models/Lab.js";
import Registro from "../models/Registro.js";
import Semestre from "../models/Semestre.js";
import Usuario from "../models/Usuario.js"
import Materia from "../models/Materia.js"
import Carrera from "../models/Carrera.js"
import Horario from "../models/Horario.js";
import Grupo from "../models/Grupo.js";
import Modalidad from "../models/Modalidad.js";
import Privilegio from "../models/Privilegio.js";
import Tipo from "../models/Tipo.js";
import Fase from "../models/Fase.js";
import db from '../database/db.js'
import { QueryTypes } from "sequelize";
export const getAllRegisters = async (req, res) => {
  try {
    const registers = await Registro.findAll({
      attributes: ['enHorario', 'actividad', 'createdAt'],
      include: [
        {
          model: Horario,
          attributes: ['inicia', 'finaliza', 'dia'],
          required: true,
          include: [
            {
              model: Grupo,
              attributes: ['name'],
              include: [
                {
                  model: Modalidad
                },
                {
                  model: Tipo
                },
                {
                  model: Fase
                },
                {
                  model: Semestre
                },
                {
                  model: Carrera
                }
              ]
            },
            {
              model: Materia,
              attributes: ['name']
            },
            {
              model: Lab,
              attributes: ['name']
            },
            {
              model: Usuario,
              attributes: ['name'],
              include: [
                {
                  model: Privilegio,
                  attributes: ['name']
                }
              ]
            }
          ]
        }
      ]
    });
    res.json(registers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getRegister = async (req, res) => {
  try {
    const register = await Registro.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['actividad', 'createdAt'],
      include: [
        {
          model: Lab,
          required: true,
          attributes: ['name', 'ocupado']
        },
        {
          model: Usuario,
          attributes: ['name']
        },
        {
          model: Materia,
          attributes: ['name']
        },
        {
          model: Carrera,
          attributes: ['name']
        },
        {
          model: Semestre,
          attributes: ['name']
        }
      ]
    });
    res.json(register);
  } catch (error) {
    res.json(register);
  }
};

export const createRegister = async (req, res) => {
  const { idHorario, actividad, enHorario } = req.body;

  try {
    const horario = await Horario.findByPk(idHorario);

    const inicia = parseInt(horario.inicia.split(':')[0]);
    const finaliza = parseInt(horario.finaliza.split(':')[0]);
    const horasClase = finaliza - inicia;

    const duracion = horasClase * 3600;
    const idLab = horario.idLab;

    const lab = await Lab.findByPk(idLab);

    if (lab.ocupado) {
      return res.json({ message: 'El laboratorio aún está ocupado' });
    }

    await lab.update({ ocupado: true });

    await Registro.create({
      idHorario,
      actividad,
      enHorario,
    });

    const tiempoDesocupado = 30 * 1000;
    setTimeout(async () => {
      await lab.update({ ocupado: false });
    }, tiempoDesocupado);

    const tiempoMensaje = 20 * 1000;
    setTimeout(() => {
      res.json({ message: `El laboratorio ${idLab} se desocupará en 10 segundos` });
    }, tiempoDesocupado - tiempoMensaje);

    res.json({ message: 'Registro creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el registro' });
  }
};


export const getCountRegistersByActivities = async (req, res) => {
  try {
    const total = await Registro.findAll({
      attributes: [
        'actividad',
        [db.fn('COUNT', db.col('actividad')), 'value']
      ],
      include: [{
        model: Horario,
        attributes: []
      }],
      group: ['actividad'],
      raw: true,
      right: true
    })

    res.json(total)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error ${error}` });
  }
}

export const getCountRegistersByMateria = async (req, res) => {
  try {
    const total = await db.query("select  materia.name,count(materia.name) as value from registro rigth join horario on idHorario = horario.id  join materia on idMateria = materia.id group by materia.name", {type: QueryTypes.SELECT})
    res.json(total)
  } catch (error) {
    res.json(error)
  }
}

export const getCountRegistersByUser = async (req, res) => {
  try {
    const total = await db.query("select  usuario.name,count(usuario.name) as value from registro rigth join horario on idHorario = horario.id  join usuario on idUsuario = usuario.id group by usuario.name", {type: QueryTypes.SELECT})
    res.json(total)
  } catch (error) {
    res.json(error)
  }
}

export const getCountRegistersByLabs = async (req, res) => {
  try {
    const total = await db.query("select lab.name,count(lab.name) as value from registro join horario on idHorario = horario.id  join lab on idLab = lab.id group by lab.name", {type: QueryTypes.SELECT})
    res.json(total)
  } catch (error) {
    res.json(error)
  }
}

export const getCountRegistersByCarreras = async (req, res) => {
  try {
    const total = await db.query("select  carrera.name,count(carrera.name) as value from registro rigth join horario on idHorario = horario.id join grupo on idGrupo = grupo.id join carrera on idCarrera = carrera.id group by carrera.name", {type:QueryTypes.SELECT})
    res.json(total)
  } catch (error) {
    res.json(error)
  }
}

export const getCountRegistersByMonth = async (req, res) => {
  try {
    const data = await db.query("SELECT MONTH(Registrado) AS name, Docente,Materia, Carrera,Laboratorio,COUNT(*) AS value FROM (   SELECT registro.id, registro.actividad, DATE(registro.createdAt) as Registrado, horario.inicia, horario.finaliza, horario.dia,          lab.name as Laboratorio, materia.name as Materia, grupo.name as Grupo, semestre.name as Semestre,          usuario.name as Docente, carrera.name as Carrera, fase.name as Fase, modalidad.name as Modalidad, tipo.name as Tipo   FROM registro   JOIN horario on idHorario = horario.id   JOIN lab on idLab = lab.id   JOIN materia on idMateria = materia.id   JOIN grupo on idGrupo = grupo.id   JOIN semestre on idSemestre= semestre.id   JOIN carrera on idCarrera = carrera.id   JOIN fase on idFase = fase.id   JOIN modalidad on idMod = modalidad.id   JOIN tipo on idTipo = tipo.id   JOIN usuario on idUsuario = usuario.id ) AS subquery GROUP BY MONTH(Registrado), Materia, Laboratorio, Carrera, Docente", {type:QueryTypes.SELECT})
  res.json(data)
  } catch (error) {
    res.json(error)
  }
}