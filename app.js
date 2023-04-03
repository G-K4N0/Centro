import express from "express";
import cors from "cors";
import db from "./database/db.js";
import fileUpload from 'express-fileupload'
import bcrypt from 'bcryptjs'

import  dotenv from 'dotenv';
dotenv.config({ path: './.env'});

import Usuario from "./models/Usuario.js";

import { verifyToken } from "./controllers/authController.js";

import careerRoutes from "./routes/Carrera.js";
import groupRoutes from "./routes/Grupo.js";
import labRoutes from "./routes/Lab.js";
import modRoutes from "./routes/Modalidad.js";
import phaseRoutes from "./routes/Fase.js";
import reportRoutes from "./routes/Reporte.js";
import semesterRoutes from "./routes/Semestre.js";
import timeRoutes from "./routes/Horario.js";
import topicRoutes from "./routes/Materia.js";
import typeRoutes from "./routes/Tipo.js";
import userRoutes from "./routes/Usuario.js";
import login from "./routes/login.js";
import cookieParser from "cookie-parser";
import Registro from "./routes/Registro.js";
import privilegio from "./routes/Privilegio.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: './upload'
}))

app.use("/carreras", verifyToken, careerRoutes);
app.use("/grupos", verifyToken, groupRoutes);
app.use("/labs", verifyToken, labRoutes);
app.use("/modalidades", verifyToken, modRoutes);
app.use("/fases", verifyToken, phaseRoutes);
app.use("/privilegio",privilegio)
app.use("/reportes", reportRoutes);
app.use("/semestres", verifyToken, semesterRoutes);
app.use("/", timeRoutes);
app.use("/materias", verifyToken, topicRoutes);
app.use("/tipos", verifyToken, typeRoutes);
app.use("/usuarios", verifyToken, userRoutes);
app.use("/registro",Registro)
app.use("/", login);

async function main() {
	try {
		await db.sync()

		await Usuario.findOne({where:{user:process.env.ADMIN_USER}},async (err, user) => {
			if (err) {
				console.log('Error: ',err)
			} else if (!user){
				   await Usuario.create({
					name:process.env.ADMIN_NAME,
					user:process.env.ADMIN_USER,
					password: bcrypt.hashSync(process.env.ADMIN_PASS,10),
					idPrivilegio:process.env.ADMIN_PRIV
				})
				admin.save((err) => {
					if (err){
						console.log('Error: ', err)
					}else{
						console.log('Usuario Administrador creado')
					}
				})
			}
		})

		app.listen(PORT, () => {
			console.log(`Escuchando en el puerto ${PORT}`);
		});	
	} catch (error) {
		console.error('No se puede conectar a la base de datos => ', error)
	}
}

main()
