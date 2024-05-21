import mysql from "mysql";
import app from "../app.js";

const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12707990",
  password: "rmMQV7GujJ",
  database: "sql12707990",
  port: "3306",
});
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PSWD,
//   database: process.env.DB_DB,
//   port: process.env.DB_PORT,
// });
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
