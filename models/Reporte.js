import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Reporte = db.define('reporte',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    note:
        {
            type:DataTypes.TEXT,
            allowNull:false
        },
    suggestion:
        {
            type:DataTypes.TEXT
        },
    idUser:{
        type:DataTypes.INTEGER,
        allowNull:false,
        
    }
},{
    freezeTableName:true
});

export default Reporte