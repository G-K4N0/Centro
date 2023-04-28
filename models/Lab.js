import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Horario from "./Horario.js";
import SinHorario from "./SinHorario.js";

const Lab = db.define(
  "lab",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ocupado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

Lab.hasMany(Horario, {
  foreignKey: "idLab",
  sourceKey: "id",
});

Horario.belongsTo(Lab, {
  foreignKey: "idLab",
  targetId: "id",
});
export default Lab;
