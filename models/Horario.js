import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Horario = db.define("horario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  timeInit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeEnd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idGroup: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idTopic: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idLab: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  freezeTableName:true
});

export default Horario