const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "hamzaaaziz001@gmail.com", // Change to your recipient
      from: "hamza.aziz8750@gmail.com",
      subject: `New message from ${name}`,
      text: message,
      html: `<p>${email}</p><p>${message}</p>`,
    };
    await sgMail.send(msg);
    return res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

module.exports = sendEmail;
