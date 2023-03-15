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
    freezeTableName:true
});

Fase.hasMany(Grupo,{
    foreignKey:'idPhase',
    sourceKey:'id'
})

Grupo.belongsTo(Fase,{
    foreignKey:'idPhase',
    targetId:'id'
})

export default Fase