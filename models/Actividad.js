import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const Actividad = db.define('actividad',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Clase'
  }
}, {
  freezeTableName: true,
   timestamps: false,
  timezone: "-06:00"
})

export default Actividad; 
