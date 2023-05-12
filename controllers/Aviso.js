import Aviso from '../models/Aviso.js'

export const getAllAvisos = async (req, res) => {
    try {
        const avisos = await Aviso.findAll({
            attributes:['titulo', 'detalles']
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
        const aviso = await Aviso.create(req.body)
        res.status(201).json({ success: true })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: 'No se pudo crear el aviso.' })
    }
}

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
