import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Horario from "./Horario.js";
import SinHorario from "./SinHorario.js";

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
    },
    actual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
},{
    freezeTableName:true
});

Grupo.hasMany(Horario,{
    foreignKey: 'idGrupo',
    sourceKey:'id'
})

Horario.belongsTo(Grupo,{
    foreignKey: 'idGrupo',
    targetId:'id'
})

export default Grupo