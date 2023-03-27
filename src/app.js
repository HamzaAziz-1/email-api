const express = require("express");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const serverless = require("serverless-http");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
// Parse JSON bodies for this app
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());



// // Send email endpoint
// app.post("/send-email", async (req, res) => {
//   return await sendEmail(req, res)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });
router.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "gday@boom-agency.com.au", // Change to your recipient
      from: 'Boom <hamza.aziz8750@gmail.com>',
      subject: `New message from ${name}`,
      text: message,
      html: `<p>Email: ${email}</p><p>Name: ${name}</p><p>Message: ${message}</p>`,
    };
    await sgMail.send(msg);
    const successMessage = "Email sent successfully";
    res.json({ message: successMessage });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
});
router.get("/home", (req, res) => {
  return res.json("Home");
});

app.use("/.netlify/functions/app", router); // path must route to lambda

module.exports.handler = serverless(app);
