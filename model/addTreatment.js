
const mongoose = require("mongoose");



const addTreatmentSchema = mongoose.Schema({
  timage:{
    type :String,
    required:true,
  },
  tname:{
    type :String,
    required:true,
  },
  filename:{
    type:String,
    required:false,
  },
  tdescription:{
    type :String,
    required:false,
  }
});


module.exports = mongoose.model("treatments",addTreatmentSchema);