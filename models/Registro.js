import db from '../database/db.js'
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
    }
},{
    freezeTableName:true
})

export default Registro