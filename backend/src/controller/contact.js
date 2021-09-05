const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

//using nodemailer to send emails
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//sending email
exports.sendEmail = (req, res) => {
  const { name, email, msg } = req.body;

  var emailobj = {
    to: "kasintha@nipunamu.com",
    from: "kasintha@nipunamu.com",
    subject: "New Contact - Message",
    html: `<h3>Name: ${name}</h3> </br>
<h3>Email: ${email}</h3> </br>
<h3>Message: ${msg}</h3> </br>
`,
  };

  try {
    transporter.sendMail(emailobj, function (err, res) {
      if (err) {
        res.status(400).json({ error: err });
      }
      res.status(200).json({ res: "Success!" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
