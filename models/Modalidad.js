import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Grupo from "./Grupo.js";

const Modalidad = db.define('modalidad', {
    id:{
        type:DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true
});

Modalidad.hasMany(Grupo,{
    foreignKey:'idMod',
    sourceKey:'id'
})

Grupo.belongsTo(Modalidad,{
    foreignKey:'idMod',
    targetId:'id'
})
export default Modalidad