import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import Grupo from './Grupo.js';

const Fase = db.define('fase',{
    id:{
        type:DataTypes.SMALLINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps: false
});

Fase.hasMany(Grupo,{
    foreignKey:'idFase',
    sourceKey:'id'
})

Grupo.belongsTo(Fase,{
    foreignKey:'idFase',
    targetId:'id'
})

export default Fase