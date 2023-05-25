import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Horario from "./Horario.js";

const Materia = db.define("materia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  freezeTableName:true
});

Materia.hasMany(Horario,{
  foreignKey:'idMateria',
  sourceKey:'id'
})

Horario.belongsTo(Materia,{
  foreignKey: 'idMateria',
    targetId:'id'
})


export default Materia
