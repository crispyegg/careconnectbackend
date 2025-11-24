



const express = require('express');
const bookTreatmentModel = require("../model/bookTreatment")
const bookTreatmentRouting = express.Router();


  bookTreatmentRouting.post("/booktreatment",async(req,res)=>{
 try{
    const treatmentData= new bookTreatmentModel(req.body);
    const result = await treatmentData.save();
    res.send(result._id)
   } catch(err){
    res.send(err)
   } 
 });


bookTreatmentRouting.get("/booktreatment" , async (req,res)=>{
 try{
  const result = await bookTreatmentModel.find();
  res.send(result)
 }catch(err){
  res.send(err)
 }
 });

bookTreatmentRouting.delete("/booktreatment/:bid" , async (req,res)=>{
  try{
     const bid = req.params.bid;
     const result = await bookTreatmentModel.deleteOne({_id:bid})
     res.send(result)
  }
  catch(err){
    res.send("unable to delete the data")
  }
 })

bookTreatmentRouting.get("/booktreatment/:bid" , async (req,res)=>{
 try{
  const bid = req.params.bid
  const result = await bookTreatmentModel.findOne({_id:bid});
  res.send(result)
 }catch(err){
  res.send(err)
 }
 }); 




bookTreatmentRouting.put('/booktreatment/:bid', async (req,res)=>{
  try{
    const bid = req.params.bid;
    const result = await bookTreatmentModel.updateOne({_id:bid},{$set:req.body});
    res.send(result)
  }catch(err){
    res.send(err)
  }
 })

 module.exports =bookTreatmentRouting;