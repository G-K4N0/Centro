import { Router } from "express";
import { handleRefreshToken } from "../controllers/RefreshToken.js";

const refreshRouter = Router()

refreshRouter.get('/' ,handleRefreshToken)

export default refreshRouter