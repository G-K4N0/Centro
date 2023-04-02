import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Usuario from "./Usuario.js";

const Privilegio = db.define('privilegio',{
    id:{
        type:DataTypes.TINYINT,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps: false
})

Privilegio.hasMany(Usuario, {
    foreignKey:'privilegio',
    sourceKey:'id'
})

Usuario.belongsTo(Privilegio, {
    foreignKey:'privilegio',
    targetId:'id'
})

export default Privilegio