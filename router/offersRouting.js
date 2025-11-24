
const express = require('express');

const offersModel = require('../model/offers');

const offersRouting = express.Router();




offersRouting.post('/offers',async(req,res)=>{
  try{
    const offersData = new offersModel(req.body);
    const result =  await offersData.save();
    res.send(result);
  }
  catch(err){
    console.log(err);  
  }
})


offersRouting.get('/offers' , async(req,res)=>{
  try{
    const result = await offersModel.find();
    res.send(result)
  }
  catch(err){
    console.log(err); 
  }
})

offersRouting.delete(`/offers/:oid`,async(req,res)=>{
  try{
         oid = req.params.oid;
         const result = await offersModel.deleteOne({_id:oid});
         res.send(result);
  }
  catch(err){
   res.send("unable to delete");
    
  }
})


offersRouting.get(`/offers/:oid`, async(req,res)=>{
  try{
    oid = req.params.oid;
    const result = await offersModel.findOne({_id:oid})
    res.send(result)
  }
  catch(err){
   res.send(err)
  }
})

offersRouting.put(`/offers/:oid`, async(req,res)=>{
   try{
     const oid = req.params.oid;
     const result =  await offersModel.updateOne({_id:oid},{$set:req.body})
     res.send(result);
   }catch(err){
    res.send(err)
   }
})

module.exports = offersRouting