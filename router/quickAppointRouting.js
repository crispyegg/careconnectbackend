

const express = require('express')

const quickAppointRouting = express.Router();
const nodemailer = require('nodemailer');
const { status } = require('server/reply');
const { error } = require('server/router');


quickAppointRouting.post('/quickappoint' , (req,res)=>{
    try{
      const{name,email,phone}= req.body;
      const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'ashifsirajkhan@gmail.com',
          pass:'clhq xdip lerc uavb'
        },
      });
     

    const mailOptions = {
      from: `${email}`,
      to: 'ashifsirajkhan@gmail.com',
      subject: 'New Quick Appointment Request',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`

    }
      transport.sendMail(mailOptions,(error, info)=>{
        if(error) throw error;
        res.send({status:true,message:'Mail Sent Suceessfully'});
        console.log('Mail sent');     
      })
    }  
    
    catch(err){
      res.send({status:false , message:'something went wrong'})
    }
})




module.exports = quickAppointRouting