import db from '../database/db.js'
import Lab from './Lab.js';
import { DataTypes } from 'sequelize'

const Registro = db.define('registro',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    idLab:{
        type:DataTypes.SMALLINT,
        allowNull:false
    },
    idUser:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idMateria:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idCarrera:{
        type:DataTypes.SMALLINT,
        allowNull:false
    },
    idSemestre:{
        type:DataTypes.SMALLINT,
        allowNull:false
    },
    actividad:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'Clase'
    }
},{
    freezeTableName:true
})

Registro.belongsTo(Lab, {
    foreignKey: 'idLab',
    targetKey: 'id'
  });

export default Registro