import db from "../database/db.js"
import { DataTypes } from "sequelize"

const SinHorario = db.define(
    "sinHorario",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        inicia: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          finaliza: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dia: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          idGrupo: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          idMateria: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          idLab: {
            type: DataTypes.SMALLINT,
            allowNull: false,
          },
          idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
          }
    },
    {
      freezeTableName: true
    }
);

export default SinHorario;