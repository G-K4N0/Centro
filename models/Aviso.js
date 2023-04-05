import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Usuario from "./Usuario.js";

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
    }
  },
  {
    freezeTableName: true
  }
);

export default Aviso;
