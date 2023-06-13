import Aviso from '../models/Aviso.js'
import { DateTime } from 'luxon';
import  cron from 'node-cron'

export const getAllAvisos = async (req, res) => {
    try {
        const avisos = await Aviso.findAll({
            attributes:['titulo', 'detalles','fecha','createdAt']
        });
        res.status(200).json(avisos)
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener la lista de avisos.' })
    }
}

export const getAviso = async (req, res) => {
    try {
        const aviso = await Aviso.findOne({
            where: { id: req.params.id }
        })
        if (aviso) {
            res.status(200).json({ data: aviso })
        } else {
            res.status(404).json({ error: 'No se encontró el aviso.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: 'No se pudo obtener el aviso.' })
    }
}

export const createAviso = async (req, res) => {
    try {
      const { titulo, detalles, fecha } = req.body;
      const now = DateTime.now()
      const expiracion = DateTime.fromISO(fecha).endOf('day')
  
      const aviso = await Aviso.create({
        titulo,
        detalles,
        fecha: expiracion.toISO(),
      });
  
      const tiempoRestante = expiracion.diff(now, 'milliseconds').milliseconds;
  
      if (tiempoRestante <= 0) {
        eliminarAviso(aviso.id);
      } else {
        const cronTime = `0 0 * * *`;
        cron.schedule(cronTime, () => {
          eliminarAviso(aviso.id);
        });
      }

      const aIso= expiracion.toISO()
      res.status(201).json({ success: true, now, aIso});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'No se pudo crear el aviso.' });
    }
  };
  
  
  
export const updateAviso = async (req, res) => {
    try {
        const aviso = await Aviso.findOne({
            where: { id: req.params.id }
        });
        if (aviso) {
            await aviso.update(req.body);
            res.status(200).json({ data: aviso });
        } else {
            res.status(404).json({ error: 'No se encontró el aviso.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo actualizar el aviso.' });
    }
}

export const deleteAviso = async (req, res) => {
    try {
        const registrosEliminados = await Aviso.destroy({
            where: { id: req.params.id }
        })
        if (registrosEliminados > 0) {
            res.status(200).json({ success: true, data: 'Aviso eliminado correctamente.' })
        } else {
            res.status(404).json({ success: false, error: 'No se encontró el aviso.' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'No se pudo eliminar el aviso.' })
    }
}

const eliminarAviso = async (avisoId) => {
    try {
      await Aviso.findByIdAndDelete(avisoId);
      console.log(`Se eliminó el aviso con ID: ${avisoId}`);
    } catch (error) {
      console.error(`Error al eliminar el aviso con ID: ${avisoId}`, error);
    }
  };

  