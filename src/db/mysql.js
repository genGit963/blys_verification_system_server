import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql";
import app from "../app.js";

// const host = process.env.DB_HOST;
// const user = process.env.DB_USER;
// const password = process.env.DB_PSWD;
// const database = process.env.DB_DB;
// const port = process.env.DB_PORT;

// const connection = mysql.createConnection({
//   host: host,
//   user: user,
//   password: password,
//   database: database,
//   port: port,
// });

// console.log({
//   host: host,
//   user: user,
//   password: password,
//   database: database,
//   port: port,
// });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
  database: process.env.DB_DB,
  port: process.env.DB_PORT,
});

function connectionDB() {
  connection.connect((err) => {
    try {
      if (err) throw err;
      app.listen(4004, () =>
        console.log("server and db on: 4004 and ", connection.threadId)
      );
    } catch (err) {
      console.error(" mysql connection error : ", err);
    }
  });
}

export { connection, connectionDB };
