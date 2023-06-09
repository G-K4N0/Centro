import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Grupo from "./Grupo.js";

const Carrera = db.define('carrera',{
    id:{
        type:DataTypes.SMALLINT,
        primaryKey:true,
        autoIncrement: true
    },
    name:
        {
            type:DataTypes.STRING,
            allowNull:false
        }
},{
    freezeTableName:true,
    timestamps: false
});

Carrera.hasMany(Grupo,{
    foreignKey:'idCarrera',
    sourceKey:'id'
})

Grupo.belongsTo(Carrera,{
    foreignKey:'idCarrera',
    targetId:'id'
})

export default Carrera