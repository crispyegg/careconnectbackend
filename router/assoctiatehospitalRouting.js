

const express = require("express");
const multer = require("multer");
const associateHospitalModel = require("../model/assosiateHospital");
const associatehospitalRouting = express.Router();


const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, './public/associatehospitaluploads');
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+ "_" + file.originalname);
  },
})

const upload = multer({storage:storage});

associatehospitalRouting.post("/associatehospitaluploads",upload.single('image'), async (req, res) => {
  try{
  const{path, filename} =req.file;
  const {catname} = req.body;
  const  associateHospitalData = new  associateHospitalModel({path,filename,catname});
  const result =await associateHospitalData.save()
  res.send(result)
  }
  catch(err){
    console.log(err);    
  }
});


associatehospitalRouting.get('/associatehospitaluploads',async(req,res)=>{
  try{
    const result = await associateHospitalModel.find();
    res.send(result)
  }
  catch(err){
   res.send(err)
    
  }
})

associatehospitalRouting.delete('/associatehospitaluploads/:aid' , async (req,res)=>{
  try{
   const aid = req.params.aid;
   const result = await associateHospitalModel.deleteOne({_id:aid});
   res.send(result)
  }
  catch(err){
    res.send(err)
  }
})

module.exports = associatehospitalRouting;
