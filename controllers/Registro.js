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
  let message = '';

  try {
    const horario = await Horario.findByPk(idHorario);

    const inicia = parseInt(horario.inicia.split(':')[0]);
    const finaliza = parseInt(horario.finaliza.split(':')[0]);
    const horasClase = finaliza - inicia;

    const duracion = horasClase * 3600;
    const idLab = horario.idLab;

    const lab = await Lab.findByPk(idLab);

    if (lab.ocupado) {
      message = 'El laboratorio aún está ocupado';
    } else {
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
        message = `El laboratorio ${idLab} se desocupará en 10 segundos`;
      }, tiempoDesocupado - tiempoMensaje);

      message = 'Registro creado exitosamente';
    }
  } catch (error) {
    console.error(error);
    message = 'Error al crear el registro';
    res.status(500);
  }

  res.json({ message });
};

export const getCountRegistersByActivities = async (req, res) => {
  try {
    const total = await db.query(`SELECT actividad AS name,count(actividad) AS value  FROM registro  
    JOIN horario on idHorario = horario.id  
    GROUP BY actividad`, {type:QueryTypes.SELECT})
    res.json(total)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error ${error}` });
  }
}

export const getCountRegistersByMateria = async (req, res) => {
  try {
    const total = await db.query(`SELECT  materia.name as name,count(materia.name) as value 
    FROM registro rigth 
    JOIN horario on idHorario = horario.id  
    JOIN materia on idMateria = materia.id
    GROUP BY materia.name`, {type: QueryTypes.SELECT});
    res.json(total);
  } catch (error) {
    res.json(error);
  }
};

export const getCountRegistersByUser = async (req, res) => {
  try {
    const total = await db.query(`SELECT Docente as name, COUNT(Docente) AS value  FROM (   
      SELECT usuario.name as Docente FROM registro 
      JOIN horario on idHorario = horario.id 
      JOIN lab on idLab = lab.id 
      JOIN materia on idMateria = materia.id 
      JOIN grupo on idGrupo = grupo.id 
      JOIN semestre on idSemestre= semestre.id 
      JOIN carrera on idCarrera = carrera.id 
      JOIN fase on idFase = fase.id 
      JOIN modalidad on idMod = modalidad.id 
      JOIN tipo on idTipo = tipo.id 
      JOIN usuario on idUsuario = usuario.id ) 
      AS subquery 
      GROUP BY Docente`, {type: QueryTypes.SELECT});
    res.json(total);
  } catch (error) {
    res.json(error);
  }
};


export const getCountRegistersByLabs = async (req, res) => {
  try {
    const total = await db.query(`SELECT lab.name ,count(lab.name) as value FROM registro
      JOIN horario on idHorario = horario.id JOIN lab on idLab = lab.id  
      GROUP BY lab.name`, {type: QueryTypes.SELECT});
    res.json(total);
  } catch (error) {
    res.json(error);
  }
};


export const getCountRegistersByCarreras = async (req, res) => {
  try {
    const total = await db.query(`SELECT carrera.name as name, count(carrera.name) AS value FROM registro  
    JOIN horario on idHorario = horario.id 
    JOIN lab on idLab = lab.id 
    JOIN grupo on idGrupo = grupo.id 
    JOIN carrera on idCarrera = carrera.id 
    GROUP BY carrera.name`, {type: QueryTypes.SELECT})
    res.json(total);
  } catch (error) {
    res.json(error);
  }
};

export const getCountRegistersByWeek = async (req, res) => {
  try {
    const total = await db.query(`SELECT WEEK(Registrado) AS Mes, Docente,Materia, Carrera,Laboratorio,COUNT(*) AS Total FROM  (   
    SELECT registro.id, registro.actividad, DATE(registro.createdAt) as Registrado, horario.inicia, horario.finaliza, horario.dia, lab.name as Laboratorio, materia.name as Materia, grupo.name as Grupo, semestre.name as Semestre, usuario.name as Docente, carrera.name as Carrera, fase.name as Fase, modalidad.name as Modalidad, tipo.name as Tipo 
    FROM registro 
    JOIN horario on idHorario = horario.id    
    JOIN lab on idLab = lab.id    
    JOIN materia on idMateria = materia.id    
    JOIN grupo on idGrupo = grupo.id    
    JOIN semestre on idSemestre= semestre.id    
    JOIN carrera on idCarrera = carrera.id    
    JOIN fase on idFase = fase.id    
    JOIN modalidad on idMod = modalidad.id    
    JOIN tipo on idTipo = tipo.id 
    JOIN usuario on idUsuario = usuario.id ) 
    AS subquery GROUP BY WEEK(Registrado), Materia, Laboratorio, Carrera, Docente`,
     {type: QueryTypes.SELECT});
    res.json(total);
  } catch (error) {
    res.json(error);
  }
}

export const getCountRegistersByMonth = async (req, res) => {
  try {

    const data = await db.query(`
    SELECT COUNT(MONTH(createdAt)) AS value, MONTHNAME(createdAt) AS month, YEAR(createdAt) as year from registro 
    GROUP BY MONTHNAME(createdAt), 
    YEAR(createdAt);`, {type: QueryTypes.SELECT});
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
