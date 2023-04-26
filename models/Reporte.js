import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Reporte = db.define('reporte',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
  idLab:{
    type:DataTypes.SMALLINT,
    allowNull:false
  },
    problema:
        {
            type:DataTypes.TEXT,
            allowNull:false
        },
    descripcion:
        {
            type:DataTypes.TEXT
        },
    idUsuario:{
        type:DataTypes.INTEGER,
        allowNull:false,
        
    }
},{
    freezeTableName:true
});

export default Reporte
