import express from "express";
import cors from "cors";

const app = express();

//json parsing
app.use(express.json());
app.use(cors());

// routes
import authRouter from "./router/auth.route.js";

app.use("/api", authRouter);

// console.log(process.env)

export default app;
