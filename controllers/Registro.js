import Lab from '../models/Lab.js';
import Registro from '../models/Registro.js'
import Semestre  from '../models/Semestre.js';

export const getAllRegisters = async (req, res) => {
    try {
        const registers = await Registro.findAll({
            include:{
                model:Lab,
                required:true
            }
        });
        res.json(registers)
    } catch (error) {
        res.json({message:error.message})
    }
}

export const getRegister = async (req,res) => {
    try {
        const register = await Registro.findOne({
            where:{
                id:req.params.id
            },
            include: {
                model: Semestre
            }
        })
        res.json(register)
    } catch (error) {
        res.json(register)
    }
}

export const createRegister = async (req,res)=>{
    try {
        await Registro.create(req.body)
        res.json({"message": "Uso de lab actualizado"})
    } catch (error) {
        res.json({message:error.message})
    }
}
