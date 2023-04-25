import Lab from "../models/Lab.js";
import Registro from "../models/Registro.js";
import Semestre from "../models/Semestre.js";
import Usuario from "../models/Usuario.js"
import Materia from "../models/Materia.js"
import Carrera from "../models/Carrera.js"
export const getAllRegisters = async (req, res) => {
  try {
    const registers = await Registro.findAll({
      include: [
        {
          model: Lab,
          required: true,
          attributes: ['id','name', 'ocupado']
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
      ],
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
  const { idLab, idUser, idMateria, idCarrera, idSemestre, actividad } =
    req.body;

  try {
    // Verificar si el laboratorio está disponible
    const lab = await Lab.findByPk(idLab);
    if (!lab) {
      return res.status(404).json({ message: "Laboratorio no encontrado" });
    }
    if (lab.ocupado) {
      return res.status(409).json({ message: "Laboratorio ocupado" });
    }

    // Crear registro
    const registro = await Registro.create({
      idLab,
      idUser,
      idMateria,
      idCarrera,
      idSemestre,
      actividad,
      enHorario: true,
    });

    // Marcar laboratorio como ocupado
    await lab.update({ ocupado: true });

    // Establecer temporizador para desocupar el laboratorio
    const tiempo = 60 * 1000; // 1 minuto
    setTimeout(async () => {
      await lab.update({ ocupado: false });
    }, tiempo);

    res.json({ message: "Registro creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
