

const mongoose = require("mongoose");

 const associateHospital = new mongoose.Schema({
  path:{                 //timage
    type:String,
    required:true,          
  },
  filename:{            
    type:String,
    required:true,
  },
  catname:{                    //tname
    type:String,
    required:true,
  }
 })


module.exports = mongoose.model('associateHospitals' , associateHospital)