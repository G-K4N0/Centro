import labModel from "../models/Lab.js"

export const getAllLabs = async (req, res) => {
    try {
        const labs  = await labModel.findAll();

        res.json(labs);
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const getLab = async (req, res) => {
    try {
        const lab = await labModel.findAll({
            where:
            {
                id: req.params.id
            }
        });
        res.json(lab);
    } catch (error) {
        res.json({
            "message": error.message
        })
    }
}

export const createLab = async (req, res) => {
    try {
        await labModel.create(req.body);

        res.json({
            "message":"Laboratorio agregado"
        });
    } catch (error) {
        res.json({
            "message":error.message
        });
    }
}

export const updateLabOcupado = async (req, res) => {
  const { id } = req.params;
  const { ocupado } = req.body;

  try {
    const lab = await Lab.findByPk(id);
    if (!lab) {
      return res.status(404).json({ message: "Laboratorio no encontrado" });
    }

    lab.ocupado = ocupado;
    await lab.save();

    return res.json(lab);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const updateLab = async (req,res) => {
    try {
        const id = req.params.id
        const labToUpdate = await Lab.findByPk(id)

        Object.assign(labToUpdate, req.body)

        await labToUpdate.save()

        res.status(200).json({message:'El laboratorio ha sido actualizado exitosamente'})
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const deleteLab = async (req,res) => {
    try {
        await labModel.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            "message": "Lab eliminado"
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}
