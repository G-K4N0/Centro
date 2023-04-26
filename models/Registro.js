import db from '../database/db.js'
import { DataTypes } from 'sequelize'
import Horario from './Horario.js'

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

Registro.belongsTo(Horario, {
    foreignKey: 'idHorario',
    targetKey: 'id'
})
export default Registro