const nodeMailer = require("nodemailer");

module.exports = async (options) => {
  const transport = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0731334b49b821",
      pass: "23429efdbeb691",
    },
  });

  const mailOptions = {
    from: "cum@cum.cum",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};
