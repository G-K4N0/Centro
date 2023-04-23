import db from '../database/db.js'
import Lab from './Lab.js';
import { DataTypes } from 'sequelize'
import Materia from './Materia.js';
import Carrera from './Carrera.js';
import Semestre from './Semestre.js';

const Registro = db.define('registro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idLab: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMateria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCarrera: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    idSemestre: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    actividad: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Clase'
    },
    enHorario: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    freezeTableName: true
})

Registro.belongsTo(Lab, {
    foreignKey: 'idLab',
    targetKey: 'id'
});
Registro.belongsTo(Materia, {
    foreignKey: 'idMateria',
    targetKey: 'id'
});

Registro.belongsTo(Carrera, {
    foreignKey: 'idCarrera',
    targetKey: 'id'
});

Registro.belongsTo(Semestre, {
    foreignKey: 'idSemestre',
    targetId: 'id'
})
export default Registro