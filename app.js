import express from "express";
import cors from "cors";
import db from "./database/db.js";
import fileUpload from "express-fileupload";
import bcrypt from "bcryptjs";
import { DateTime } from "luxon";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import Usuario from "./models/Usuario.js";
import Privilegio from "./models/Privilegio.js";

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
import Fase from "./models/Fase.js";
import Modalidad from "./models/Modalidad.js";
import Tipo from "./models/Tipo.js";
import routerAviso from "./routes/Aviso.js";
import refreshRouter from "./routes/RefreshToken.js";
import corsOptions from "./config/corsOptions.js";
import { credentials } from "./config/credentials.js";
import Carrera from "./models/Carrera.js";
import Lab from "./models/Lab.js";
import Semestre from "./models/Semestre.js";

DateTime.local().setZone('America/Mexico_City');

const app = express();
const PORT = process.env.PORT || 8080;

const administratorName = process.env.ADMIN_NAME;
const administratorUser = process.env.ADMIN_USER;
let administratorPass = bcrypt.hashSync(process.env.ADMIN_PASS, 10);
const administratorPriv = process.env.ADMIN_PRIV;

const priv_name = process.env.PRIV_NAME;
const priv_user = process.env.PRIV_USER;

app.use(credentials);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use("/refresh", refreshRouter);
app.use("/carreras", careerRoutes);
app.use("/grupos", groupRoutes);
app.use("/labs", labRoutes);
app.use("/modalidades", modRoutes);
app.use("/fases", phaseRoutes);
app.use("/privilegio", privilegio);
app.use("/reportes", reportRoutes);
app.use("/semestres", semesterRoutes);
app.use("/", timeRoutes);
app.use("/materias", topicRoutes);
app.use("/tipos", typeRoutes);
app.use("/usuarios", userRoutes);
app.use("/registros", Registro);
app.use("/avisos", routerAviso);
app.use("/", login);

async function main() {
  try {
    await db.sync();

    await Usuario.findOne({ where: { user: administratorUser } }).then(
      async (existingUser) => {
        if (!existingUser) {
          const privilegio = await Privilegio.bulkCreate(
            [{ name: priv_name }, { name: priv_user }],
            { fields: ["name"] }
          );

          const fase = await Fase.bulkCreate(
            [{ name: "Primera" }, { name: "Segunda" }, { name: "Sin fase" }],
            { fields: ["name"] }
          );

          const modalidad = await Modalidad.bulkCreate(
            [{ name: "Escolarizada" }, { name: "SemiEscolarizada" },{ name: "Verano" }],
            { fields: ["name"] }
          );

          const tipo = await Tipo.bulkCreate(
            [{ name: "Matutino" }, { name: "Vespertino" }],
            { fields: ["name"] }
          );

          const carreras = await Carrera.bulkCreate(
            [
              { name: "Ing. Informatica" },
              { name: "Ing. Administración" },
              { name: "Ing. Sistemas Computacionales" },
              { name: "Ing. Eléctrica" },
              { name: "Ing. Mecatrónica" },
              { name: "Ing. Industrial" },
            ],
            { fields: ["name"] }
          );

          const labs = await Lab.bulkCreate(
            [
              { name: "Laboratorio 1" },
              { name: "Laboratorio 2" },
              { name: "Laboratorio 3" },
              { name: "Laboratorio 4" },
            ],
            { fields: ["name"] }
          );

          const semestres = await Semestre.bulkCreate(
            [
              { name: "Primero" },
              { name: "Segundo" },
              { name: "Tercero" },
              { name: "Cuarto" },
              { name: "Quinto" },
              { name: "Sexto" },
              { name: "Septimo" },
              { name: "Octavo" },
              { name: "Noveno" }
            ],
            { fields: ["name"] }
          );

          const admin = Usuario.build({
            name: administratorName,
            user: administratorUser,
            password: administratorPass,
            idPrivilegio: administratorPriv,
          });

          await admin.save();

          console.log("Usuario Administrador creado");
        }
      }
    );

    app.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("No se puede conectar a la base de datos => ", error);
  }
}

main();
