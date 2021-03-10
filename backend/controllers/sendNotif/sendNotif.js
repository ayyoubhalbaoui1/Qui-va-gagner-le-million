require('dotenv').config
const nodemailer = require("nodemailer");
var TeleSignSDK = require('telesignsdk');

exports.sendMail = async (to) =>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL, // TODO: your gmail account
            pass: process.env.ADMIN_PASSWORD // TODO: your gmail password
        }
      });

      let mailOptions = {
        from: process.env.ADMIN_EMAIL, // TODO: email sender
        to: to, // TODO: email receiver
        subject: 'Participation validated',
        html:'<h1>Participation validated</h1>'
      };

      let info = await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
      });
      
}

exports.sendSms = (phone) =>{

  const client = new TeleSignSDK( process.env.TELESIGN_CUST_ID,
    process.env.API_KEY,
    process.env.REST_ENDPOINT
)

  const phoneNumber = "212"+phone
  const message = "Participation validated";
  const messageType = "MKT";

  function messageCallback(error, responseBody) {
    if (error) {
        console.log(error);
    } else {
        console.error("success");
        console.error(responseBody);
    }
}

client.sms.message(messageCallback, phoneNumber, message, messageType);


}

