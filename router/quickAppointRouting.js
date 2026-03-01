

const express = require('express')

const quickAppointRouting = express.Router();
const nodemailer = require('nodemailer');
const { status } = require('server/reply');
const { error } = require('server/router');


quickAppointRouting.post('/quickappoint', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ashifsirajkhan@gmail.com',
        pass: 'YOUR_APP_PASSWORD'
      }
    });

    const mailOptions = {
      from: 'ashifsirajkhan@gmail.com',  // must be your Gmail
      to: 'ashifsirajkhan@gmail.com',
      replyTo: email,                   // ✅ dynamic user email
      subject: 'New Quick Appointment Request',
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}`
    };

    await transport.sendMail(mailOptions);

    res.status(200).json({
      status: true,
      message: 'Mail Sent Successfully'
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: 'Mail Failed'
    });
  }
});


module.exports = quickAppointRouting