import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Aviso = db.define(
  "aviso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    detalles: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    visible:{
      type :DataTypes.BOOLEAN ,
      defaultValue:true
    }
  },
  {
    freezeTableName: true,
    timezone: "-06:00"
  }
);

export default Aviso;
