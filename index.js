import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectionDB } from "./src/db/mysql.js";

app.get("/", (req, res) => {
  res.status(200).json({ server: "working on port: 4004" });
});

connectionDB();
