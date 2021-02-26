const nodemailer = require('nodemailer')
const Group = require('../models/Group')
const winston = require('winston')
require('winston-mongodb');

async function sendMali(validate) {
  const output = `<h2>congratulation</h2>
  
  <div>congratulation dear ${validate.full_name} your account is verified you can play anytime and make money </div>
  `;
  //   const sendTo = validate.email 
  const sendTo = "email";
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "gmail",
        pass: "password",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Who will win the million" <million@Omar.com>',
      to: sendTo,
      subject: "verified ✔",
      text: "verified account ",
      html: output,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getNumber() {
  var code = Math.floor(Math.random() * 9999);

  return code;
}

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/million",
      options: { useUnifiedTopology: true },
    })
  ],
};
const loggger = winston.createLogger(logConfiguration);
function saveLog(message, lavel, link) {
  var lg = loggger.log({
    message: message,
    level: [lavel],
    Date: new Date(),
    http: "127.0.0.1:" + 3000 + "/" + link,
  });
  return lg
}



module.exports = { sendMali, getNumber, saveLog }