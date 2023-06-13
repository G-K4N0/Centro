import db from '../database/db.js'
import { DataTypes } from 'sequelize'
import Horario from './Horario.js'
import Actividad from './Actividad.js'
import SinHorario from './SinHorario.js'
const Registro = db.define('registro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idHorario:{
      type:DataTypes.INTEGER,
      allowNull:true,  
    },
  idSinHorario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
    idActividad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    enHorario: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    alumnos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    freezeTableName: true,
    timezone: "-06:00"
})

Registro.belongsTo(Horario, {
    foreignKey: 'idHorario',
    targetKey: 'id'
})

Registro.belongsTo(Actividad, {
  foreignKey: 'idActividad',
  targetKey:'id'
})

Registro.belongsTo(SinHorario, {
  foreignKey: 'idSinHorario',
  targetKey:'id'
})

export default Registro
