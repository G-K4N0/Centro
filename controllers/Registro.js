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
export const getAllRegisters = async (req, res) => {
  try {
    const registers = await Registro.findAll({
      attributes:['enHorario','actividad','createdAt'],
      include: [
        {
          model: Horario,
          attributes:['inicia','finaliza','dia'],
          required: true,
          include:[
            {
              model: Grupo,
              attributes:['name'],
              include:[
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
              attributes:['name']
            },
            {
              model: Usuario,
              attributes:['name'],
              include:[
                {
                  model: Privilegio,
                  attributes:['name']
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
      attributes:['actividad','createdAt'],
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
    
    const horario = await Horario.findByPk(idHorario)

    const inicia = parseInt((horario.inicia.split(':')[0]))
    const finaliza = parseInt((horario.finaliza.split(':')[0]))
    const horasClase = finaliza-inicia

    const duracion = horasClase * 3600
    const idLab = horario.idLab

    const lab = await Lab.findByPk(idLab)

    if (lab.ocupado) {
      return res.json({message:'El laboratorio aún está ocupado'})
    }

    // Marcar laboratorio como ocupado
    await lab.update({ ocupado: true });

    console.log(inicia,finaliza, horasClase, duracion)
    /*
    await Registro.create({
      idHorario,
      actividad,
      enHorario
    })*/
    // Establecer temporizador para desocupar el laboratorio
    const tiempo = 30 * 1000; // 30 segundos
    setTimeout(async () => {
      await lab.update({ ocupado: false });
    }, tiempo);

    res.json({ message: "Registro creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
