import Grupo from '../models/Grupo.js';
import Carrera from '../models/Carrera.js';
import Fase from '../models/Fase.js';
import Modalidad from '../models/Modalidad.js';
import Semestre from '../models/Semestre.js';
import Tipo from '../models/Tipo.js';
import Horario from '../models/Horario.js';

export const getGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.findAll(
            {
                attributes: ['id', 'name'],
                where: {
                    actual: true
                },
                include: [
                    {
                        model: Tipo,
                        attributes: ['name']
                    }
                ]
            }
        );
        res.status(200).json(grupos)
    } catch (error) {
        res.status(404).json({ "message": error.message })
    }
}
export const getAllGroups = async (req, res) => {
    try {
        const page = parseInt(req.query.page || 1)
        const limit = parseInt(req.query.limit || 10)
        const offset = (page - 1) * limit
        const { count, rows: grupos} = await Grupo.findAndCountAll({
            limit: limit,
            offset: offset,
            attributes: ['id', 'name', 'actual', 'createdAt'],
            include: [
                {
                    model: Carrera,
                    attributes: ['name']
                },
                {
                    model: Fase,
                    attributes: ['name']
                },
                {
                    model: Modalidad,
                    attributes: ['name']
                },
                {
                    model: Semestre,
                    attributes: ['name']
                },
                {
                    model: Tipo,
                    attributes: ['name']
                }
            ]
        });

        const totalPages = Math.ceil(count / limit)
        res.status(200).json({
            totalItems: count,
            totalPages,
            currentPage: page,
            grupos
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const getGroup = async (req, res) => {
    try {
        const grupo = await Grupo.findAll({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name', 'createdAt'],
            include: [
                {
                    model: Carrera,
                    attributes: ['name']
                },
                {
                    model: Fase,
                    attributes: ['name']
                },
                {
                    model: Modalidad,
                    attributes: ['name']
                },
                {
                    model: Semestre,
                    attributes: ['name']
                },
                {
                    model: Tipo,
                    attributes: ['name']
                }
            ]
        });

        res.status(200).json(grupo);
    } catch (error) {
        res.json({
            'message': error.message
        });
    }
}

export const createGroup = async (req, res) => {
    try {

        const name = req.body.name
        const tipo = req.body.idTipo

        const foundGroup = await Grupo.findOne({
            where: { name, idTipo: tipo }
        })

        if (foundGroup !== null) {
            return res.status(200).json({ message: 'El grupo ya existe' })
        }

        await Grupo.create(req.body);
        res.json({
            "message": "Grupo creado"
        })
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}

export const updateGroup = async (req, res) => {
    try {
        const group = await Grupo.findOne({ where: { nombre: req.body.nombre } });
        if (group && group.id !== req.params.id) {
            return res.status(400).json({ message: 'El nombre del grupo ya está en uso' });
        }
        await Grupo.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Grupo actualizado"
        });
    } catch (error) {
        res.json({
            "message": error.message
        });
    }
}


export const deleteGroup = async (req, res) => {
    try {
        const id = req.params.id;

        const horarios = await Horario.findAll({ where: { idGrupo: id } });
        if (horarios.length > 0) {
            return res.status(400).json({ message: 'No se puede eliminar el grupo porque tiene horarios asociados' });
        }

        await Grupo.destroy({ where: { id } });
        res.json({ message: 'Grupo eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}