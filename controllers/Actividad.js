import db from '../database/db.js'
import Actividad from '../models/Actividad.js'

export const getActividades = async (req, res) => {
  try {
   const actividades = await Actividad.findAll()
   res.json({actividades}) 
  } catch (error) {
    res.json({error})
  }
}

export const createActividades = async (req, res) => {
  try {
    const { name } = req.body;
    const existingActividad = await Actividad.findOne({
      where: db.where(
        db.fn('lower', DB.col('name')),
        db.fn('lower', name)
      )
    });

    if (existingActividad) {
      return res.status(409).json({ error: 'Ya existe una actividad con el mismo nombre' });
    }

    const actividad = await Actividad.create({ name }, { returning: true });
    res.json({ actividad });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la actividad' });
  }
};

