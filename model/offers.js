
const mongoose = require('mongoose');

const offersSchema = mongoose.Schema({
   
    treatmentName:{
      type:String,
      required:true
    },
    treatmentDetails:{
      type:String,
      required:true
    },
    treatmentpackage1:{
      type:String,
      required:true
    },
    treatmentpackage2:{
      type:String,
      required:true
    },
    treatmentpackage3:{  
      type:String,
      required:false
    },
    price:{
      type:Number,
      required:true,
    },
    date:{
      type:String,
      required:true,
    }
})


module.exports = mongoose.model('offers',offersSchema)