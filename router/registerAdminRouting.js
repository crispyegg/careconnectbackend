const express = require("express");
const registerAdminRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

const registerAdminsModel = require("../model/registerAdmin");
const loginMiddleware = require("../middleware/loginMiddleware");

registerAdminRouter.post("/registeruser", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password, 
      designation,
      message,
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const registerData = new registerAdminsModel({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      designation,
      message,
    });

    const result = await registerData.save();
    if (result) {
      res.send({
        status: "success",
        message: "registered Sucessfully",
      });
    } else {
      res.send({ status: "failed", message: "registeretion failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

registerAdminRouter.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await registerAdminsModel.findOne({ email: email });
    if (!exists) {
      res.send({ status: "failed", message: "user not found" });
    } else if (!bcrypt.compareSync(password,exists.password)) {
      res.send({ status: "failed", message: "incorrect password" });
    } else {
      const payload = {
        user: {
          id: exists._id,
        },
      };
      jwt.sign(payload, "JSONSTRINGWEB", { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.send({
          status: "success",
          message: "Login Succesful",
          token: token,
        });
      });
      // res.send({status:'success' message:exists});
    }
  } catch (err) {
    console.log(err);
  }
});


registerAdminRouter.get("/admindashboard/", loginMiddleware, async (req, res) => {
  try {
    res.send({ status: "success", message: 'Success'});
  } catch (err) {
    console.log(err);
  }
});


registerAdminRouter.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  const user = await registerAdminsModel.findOne({ email });

  if (!user) {
    return res.send({ status: "failed", message: "user not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // <-- NUMBER

  user.otp = otp;  
  user.otpExpire = new Date(Date.now() + 5 * 60 * 1000); // <-- DATE

  await user.save();

  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ashifsirajkhan@gmail.com",
      pass: "clhq xdip lerc uavb"
    }
  });

  await transporter.sendMail({
    from: "ashifsirajkhan@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`
  });

  res.send({
    status: "success",
    message: "OTP Sent Successfully"
  });
});


registerAdminRouter.post("/verifyotp", async (req, res) => {
  const { email, otp } = req.body;

  const user = await registerAdminsModel.findOne({ email });

  if (!user) 
    return res.send({ status: "failed", message: "User not found" });

  if (user.otp !== Number(otp)) {   
    return res.send({ status: "failed", message: "Invalid OTP" });
  }

  if (user.otpExpire < Date.now()) {
    return res.send({ status: "failed", message: "OTP expired" });
  }

  res.send({
    status: "success",
    message: "OTP verified"
  });
});


registerAdminRouter.post("/resetpassword", async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await registerAdminsModel.findOne({ email });
  if (!user) {
    return res.send({ status: "failed", message: "user not found" });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpire = undefined;

  await user.save();

  res.send({
    status: "success",
    message: "Password Reset Successful"
  });
});





module.exports = registerAdminRouter;
