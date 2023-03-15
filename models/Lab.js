import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Horario from "./Horario.js";

const Lab = db.define('lab',{
    id:{
        type:DataTypes.SMALLINT,
        primaryKey:true,
        autoIncrement: true
    },
    name:
        {
            type:DataTypes.STRING,
            allowNull:false
        },
    status:
        {
            type:DataTypes.STRING,
            allowNull:false
        }
},{
    freezeTableName:true
});

Lab.hasMany(Horario,{
    foreignKey:'idLab',
    sourceKey:'id'
})

Horario.belongsTo(Lab,{
    foreignKey: 'idLab',
    targetId:'id'
})

export default Lab