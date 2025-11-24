


const express = require('express')

const  addDoctorsModel = require('../model/addDoctors')

const addDoctorsRouting = express.Router();



addDoctorsRouting.post('/adddoctors' , async (req,res)=>{
  try{
      const addDoctorsData = new addDoctorsModel(req.body)
      const result = await addDoctorsData.save();
      res.send(result)
  }
  catch(err){
    console.log(err);
    
  }
})

addDoctorsRouting.get('/adddoctors' ,  async(req,res)=>{
  try{
    const  result = await addDoctorsModel.find();
    res.send(result)

  }catch(err){
    console.log(err);    
  }
})

addDoctorsRouting.get("/adddoctors/:tname", async (req, res) => {
  try {
    const { tname } = req.params;
    const doctors = await addDoctorsModel.find({ tname: tname });
    res.send(doctors)
  } catch (err) {
   console.log(err);  
  }
});



addDoctorsRouting.get("/adddoctors/:tname/:location", async (req, res) => {
  try {
    const { tname, location } = req.params;  
    const doctors = await addDoctorsModel.find({ tname: tname, location: location });
    res.send(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    
  }
});




module.exports = addDoctorsRouting