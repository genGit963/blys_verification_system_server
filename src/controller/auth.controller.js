import bcrypt from "bcryptjs";
import { connection } from "../db/mysql.js";
import sendEmail from "../utils/sendEmail.js";

// INSERT INTO `blys` (`email`, `password`, `code`) VALUES ('bogatimahesh35@gmail.com', '3453', '123456');

export const registerAndSendCode = (req, res, next) => {
  try {
    console.log(req.body);
    // creating user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("123456", salt);

    // code
    const verifyCode = Math.floor(Math.random() * 1000000 + 1);
    const message = `Your verification code is ${verifyCode}. Please don't share anybody.`;

    sendEmail({
      email: String(req.body.email),
      subject: "Blys Verification code",
      mailContent: message,
    });

    connection.query(
      `INSERT INTO blys (email, password, code) VALUES (?,?,?)`,
      [String(req.body.email), hash, verifyCode],
      async (err, data) => {
        if (err) throw err;

        res.status(200).json({
          message: "Verification Code is sent to your email.",
          status: "success",
        });
      }
    );
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: "fail",
    });
  }
};

// export const verifyCode = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const SQL = "SELECT email, code FROM blys WHERE code=?";
//     connection.query(SQL, [req.body.code], (err, data) => {
//       if (req.body.code === data[0].code) {
//         res.status(200).json({
//           message: data,
//           status: "success",
//         });
//       } else {
//         res.status(401).json({
//           message: "Verification Failed !",
//           status: "fail",
//         });
//       }
//     });
//   } catch (err) {
//     res.status(404).json({
//       message: "verification failed !",
//       status: "fail",
//     });
//   }
// };

export const verifyCode = async (req, res, next) => {
  try {
    console.log(req.body);
    const SQL = "SELECT email, code FROM blys WHERE code=?";
    connection.query(SQL, [req.body.code], (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "Database query failed",
          status: "error",
        });
      }

      // Check if any data was returned
      if (data.length === 0) {
        return res.status(401).json({
          message: "Verification Failed !",
          status: "fail",
        });
      }

      if (req.body.code === data[0].code) {
        res.status(200).json({
          message: data,
          status: "success",
        });
      } else {
        res.status(401).json({
          message: "Verification Failed !",
          status: "fail",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error occurred during verification",
      status: "error",
    });
  }
};
