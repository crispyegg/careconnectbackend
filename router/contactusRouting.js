

const express = require('express')


const contactusModel = require('../model/contactus');

const contactusRouting = express.Router()



contactusRouting.post('/contactus' ,async (req,res)=>{

  try{
   const contactusData = new contactusModel(req.body);
   const result =  await contactusData.save();
   res.send(result)
  }catch(err){
    console.log(err);   
  }
})

contactusRouting.get(`/contactus`,async(req,res)=>{
  try{
    const result = await contactusModel.find()
    res.send(result)
  }catch(err){
    console.log(err);
    
  }
})

contactusRouting.delete(`/contactus/:cid`, async(req,res)=>{
  try{
    const cid = req.params.cid;
    const result = await contactusModel.deleteOne({_id:cid})
    res.send(result)
  }catch(err){
    console.log('Unable to delete Data');   
  }
})


module.exports = contactusRouting;