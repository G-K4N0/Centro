import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import Grupo from './Grupo.js';

const Tipo = db.define('tipo',{
    id:{
        type:DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps: false
});

Tipo.hasMany(Grupo,{
    foreignKey:'idTipo',
    sourceKey:'id'
})

Grupo.belongsTo(Tipo,{
    foreignKey:'idTipo',
    targetId:'id'
})

export default Tipo