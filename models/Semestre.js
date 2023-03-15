import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import Grupo from './Grupo.js';
import Registro from './Registro.js';

const Semestre = db.define('semestre',{
    id:{
        type: DataTypes.SMALLINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    semester:{
        type: DataTypes.STRING,
        allowNull:false
    },
    schoolPeriod:{
        type: DataTypes.STRING,
        allowNull:false
    }
},
{
    freezeTableName:true
});

Semestre.hasMany(Grupo,{
    foreignKey:'idSemester',
    sourceKey:'id'
})

Grupo.belongsTo(Semestre,{
    foreignKey:'idSemester',
    targetId:'id'
})

Semestre.hasMany(Registro,{
    foreignKey:'idSemestre',
    sourceKey:'id'
})

Registro.belongsTo(Semestre,{
    foreignKey:'idSemester',
    targetId:'id'
})
export default Semestre