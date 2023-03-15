import express from 'express'
import { createRegister, getAllRegisters, getRegister } from '../controllers/Registro.js'

const Registro = express.Router()

Registro.get('/',getAllRegisters)
Registro.get('/:id',getRegister)
Registro.post('/',createRegister)

export default Registro