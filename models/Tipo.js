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
    freezeTableName:true
});

Tipo.hasMany(Grupo,{
    foreignKey:'idType',
    sourceKey:'id'
})

Grupo.belongsTo(Tipo,{
    foreignKey:'idType',
    targetId:'id'
})

export default Tipo