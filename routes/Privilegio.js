import express from 'express'
import { getAllPrivileges } from '../controllers/Privilegio.js'

const privilegio = express.Router()

privilegio.get('/',getAllPrivileges)

export default privilegio