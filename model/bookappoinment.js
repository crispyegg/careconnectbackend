


const  mongoose = require('mongoose')

const bookAppointmentSchema = mongoose.Schema({
 
  tname:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  doctorName:{
    type:String,
    required:true
  },
  patientName:{
    type:String,
    required:true
  },
  patientEmail:{
    type:String,
    required:true
  }, 
  message:{
    type:String,
    required:true
  },
  status: {
    type: String,
    required:false
  }
});


module.exports = mongoose.model('bookAppointmentData' , bookAppointmentSchema)