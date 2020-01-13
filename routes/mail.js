const customer = require("../db/customers");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "johnsonadodo@gmail.com",
    pass: "namenamename"
  }
});
// let mailOptions = {
//   from: "johnsonadodo@gmail.com",
//   to: "adodojo@gmail.com, sano-suke@live.com, adodo.johnson@yahoo.com",
//   subject: "Testing nodemailer mailing system",
//   text:
//     "This is a test application for nodemailer module, if you get this, it means that I successfully sent the mail from my ecommerce application to multiple emails... all that is left is to design the structure!"
// };

// transporter
//   .sendMail(mailOptions)
//   .then(info => console.log("Successfully sent mail to mailing list!"))
//   .catch(err => {
//     console.log("Failed to send mail to mailing list...", err);
//   });

async function sendNews(from, subject, text, html) {
  let audience = await customer.newsList();
  let emails = [];
  audience.forEach(e => {
    emails.push(e.email);
  });
  let options = {
    from: from,
    to: emails,
    subject: subject,
    text: text,
    html: html
  };

  transporter
    .sendMail(options)
    .then(info => console.log(info.response))
    .catch(err => console.err);
}

module.exports = {
  sendNews
};
