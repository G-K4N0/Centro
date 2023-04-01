import express from "express";
import cors from "cors";
import db from "./database/db.js";
import fileUpload from 'express-fileupload'
import  dotenv from 'dotenv';
dotenv.config({ path: './.env'});

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
app.use("/",privilegio)
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
		app.listen(PORT, () => {
			console.log(`Escuchando en el puerto ${PORT}`);
		});	
	} catch (error) {
		console.error('No se puede conectar a la base de datos => ', error)
	}
}

main()
