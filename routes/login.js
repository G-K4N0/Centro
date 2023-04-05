import { Router } from "express"
import { login, logout } from "../controllers/authController.js"

const auth = Router()

auth.post("/login", login)
auth.get("/logout", logout)

export default auth
