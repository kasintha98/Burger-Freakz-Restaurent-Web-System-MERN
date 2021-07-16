const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.sendEmail = (req, res) => {
  const { name, email, msg } = req.body;

  var emailobj = {
    to: "burgerfreakz@protonmail.com",
    from: "burgerfreakz@protonmail.com",
    subject: "New Contact - Message",
    html: `<h3>Name: ${name}</h3> </br>
<h3>Email: ${email}</h3> </br>
<h3>Message: ${msg}</h3> </br>
`,
  };

  try {
    transporter.sendMail(emailobj, function (err, res) {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
