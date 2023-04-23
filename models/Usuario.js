import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Horario from "./Horario.js";
import Reporte from "./Reporte.js";
import Registro from "./Registro.js";

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
    user:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    idPrivilegio:{
        type:DataTypes.TINYINT,
        allowNull:false
    },
    image:{
        type: DataTypes.JSON,
        defaultValue: null
    }
},{
    freezeTableName:true,
    timestamps:true
});

Usuario.hasMany(Horario,{
    foreignKey:'idUsuario',
    sourceKey:'id'
})

Horario.belongsTo(Usuario,{
    foreignKey: 'idUsuario',
    targetId:'id'
})

Usuario.hasMany(Reporte,{
    foreignKey:'idUsuario',
    sourceKey:'id'
})

Reporte.belongsTo(Usuario,{
    foreignKey:'idUsuario',
    targetId:'id'
})
Registro.belongsTo(Usuario,{
    foreignKey: 'idUser',
    targetId:'id'
})

Usuario.hasMany(Registro, {
    foreignKey: 'idUser',
    sourceKey:'id'
})

Registro.belongsTo(Usuario,{
    foreignKey: 'idUser',
    targetId:'id'
})

export default Usuario;