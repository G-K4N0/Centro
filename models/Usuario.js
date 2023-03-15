import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Horario from "./Horario.js";
import Reporte from "./Reporte.js";

const Usuario = db.define('usuario',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    nickname:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    privileges:{
        type:DataTypes.TINYINT,
        allowNull:false
    },
    imageUrl:{
        type:DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps:true
});

Usuario.hasMany(Horario,{
    foreignKey:'idUser',
    sourceKey:'id'
})

Horario.belongsTo(Usuario,{
    foreignKey: 'idUser',
    targetId:'id'
})

Usuario.hasMany(Reporte,{
    foreignKey:'idUser',
    sourceKey:'id'
})

Reporte.belongsTo(Usuario,{
    foreignKey:'idUser',
    targetId:'id'
})

export default Usuario;