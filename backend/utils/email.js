const nodemailer = require("nodemailer");

exports.sendEmail = ({ sendTo, sub, msg }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "dhakneashwini6@gmail.com",
      pass: "vyxiicupyekagzjv",
    },
  }); //end
  transporter.sendMail(
    {
      to: sendTo,
      from: "dhakneashwini6@gmail.com",
      subject: sub,
      text: msg,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("EMAIL SEND SUCCESSFULLY");
      }
    }
  );
};
