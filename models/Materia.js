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
  },
},{
  freezeTableName:true
});

Materia.hasMany(Horario,{
  foreignKey:'idTopic',
  sourceKey:'id'
})

Horario.belongsTo(Materia,{
  foreignKey: 'idGroup',
    targetId:'id'
})

export default Materia