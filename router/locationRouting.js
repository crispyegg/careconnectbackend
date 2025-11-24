

const express = require('express')
const addLocationModel=  require('../model/addLocation.js');
const addlocationRouting = express.Router();


addlocationRouting.post('/addlocation', async (req,res)=>{
  try{
      const addLocationData = new addLocationModel(req.body);
      const result = await addLocationData.save();
      res.send(result)
  }
  catch(err){
     res.send(err)
  }
});


addlocationRouting.get('/addlocation',async (req,res)=>{
  try{
    const result = await addLocationModel.find();
    res.send(result)
  }
  catch(err){
    console.log(err);   
  }
})


addlocationRouting.delete('/addlocation/:lid' ,async(req,res)=>{
   try{
    const  lid = req.params.lid
    const result = await addLocationModel.deleteOne({_id:lid})
    res.send(result)
   }
   catch(err){
    console.log("unable to delete Data");  
   }
})


addlocationRouting.get(`/addlocation/:lid` , async (req,res)=>{
  try{
    const {lid} = req.params.lid;
    const result = await addLocationModel.findOne({_id:lid});
    res.send(result);
  }catch(err){
    console.log(err);   
  }
})


addlocationRouting.get(`/addlocation/:tname` , async (req,res)=>{
  try{
    const tname= req.params.tname;
    const result = await addLocationModel.find({tname:tname});
    res.send(result);
  }catch(err){
    console.log(err);   
  }
})





module.exports = addlocationRouting