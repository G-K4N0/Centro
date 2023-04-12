import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import Grupo from './Grupo.js';

const Semestre = db.define('semestre',{
    id:{
        type: DataTypes.SMALLINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    }
},
{
    freezeTableName:true,
    timestamps: false
});

Semestre.hasMany(Grupo,{
    foreignKey:'idSemestre',
    sourceKey:'id'
})

Grupo.belongsTo(Semestre,{
    foreignKey:'idSemestre',
    targetId:'id'
})

export default Semestre