

const mongoose = require('mongoose');

const resgistorAdminSchema = mongoose.Schema({
 firstName:{
  type:String,
  required:true
 },
 lastName:{
  type:String,
  required:true,
 },
 email:{
  type:String,
  required:true
 },
 phone:{
  type:Number,
  required:true
 },
 password:{
  type:String,
  required:true
 },
 
 designation:{
  type:String,
  required:true
 },
 message:{
  type:String,
  required:true
 },
 otp:{ 
    type: Number,
 },
 otpExpire:{
    type: Date,
 }
});


module.exports = mongoose.model("registerAdmins" , resgistorAdminSchema)