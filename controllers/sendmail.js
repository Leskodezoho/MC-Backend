const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.nodeMailerEmail,
    pass: process.env.nodeMailerPassword,
  },
});
function SendMail(toEmail, subject, content) {
  const mailOption = {
    from: process.env.nodeMailerEmail,
    to: toEmail,
    subject: subject,
    html: content,
  };
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("Error:" + error);
    } else {
      console.log("Mail Sent successfully");
    }
  });
}
module.exports = { SendMail };
