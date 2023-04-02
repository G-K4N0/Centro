import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Horario from "./Horario.js";

const Grupo = db.define("grupo",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idMod: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    idTipo:{
        type: DataTypes.SMALLINT,
        allowNull:false
    },
    idFase:{
        type: DataTypes.SMALLINT,
        allowNull:false
    },
    idSemestre:{
        type: DataTypes.SMALLINT,
        allowNull:false
    },
    idCarrera:{
        type: DataTypes.SMALLINT,
        allowNull:false
    }
},{
    freezeTableName:true
});

Grupo.hasMany(Horario,{
    foreignKey: 'idGroup',
    sourceKey:'id'
})

Horario.belongsTo(Grupo,{
    foreignKey: 'idGroup',
    targetId:'id'
})

export default Grupo