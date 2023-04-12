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
  try {
    await Registro.create(req.body);
    res.json({ message: "Uso de lab actualizado" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
