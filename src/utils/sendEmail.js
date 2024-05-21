import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
  // console.log("\n-->R: Email sending Portal !!\n", options)
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    // secure: true,
    auth: {
      user: process.env.SMTP_MAILER,
      pass: process.env.SMTP_PSWD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAILER,
    to: options.email,
    subject: options.subject,
    text: options.mailContent,
  };
  // console.log("------MailOptions: ", mailOptions);
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
