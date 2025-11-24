


const mongoose = require('mongoose')

const addDoctorsSchema = mongoose.Schema({


   tname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  qualification: {
    type: String,
    required: true,
  },
   skill: {
    type: String,
    required: false,
  }
})


module.exports = mongoose.model('addedDoctor' , addDoctorsSchema)