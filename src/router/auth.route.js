import { Router } from "express";
import {
  registerAndSendCode,
  verifyCode,
} from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerAndSendCode);
authRouter.post("/verify", verifyCode);

export default authRouter;
