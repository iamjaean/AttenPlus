const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GOOGLE_APP_ID,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

module.exports = (to, subject, text) =>
  new Promise((resolve, reject) => {
    const message = {
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
