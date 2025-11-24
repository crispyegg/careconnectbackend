
const express = require('express')

const bookAppointmentModel = require('../model/bookappoinment')
const bookAppointmentRouting = express.Router();



bookAppointmentRouting.post('/bookappointment' , async (req, res)=>{
  try{
    const bookappointmentData = new bookAppointmentModel(req.body)
    const result = await bookappointmentData.save();
    res.send(result)

  }catch(err){
      console.log(err);
      
  }
})


bookAppointmentRouting.get('/bookappointment' ,  async(req,res)=>{
  try{
    const  result = await bookAppointmentModel.find();
    res.send(result)

  }catch(err){
    console.log(err);    
  }
})



bookAppointmentRouting.get('/bookappointment/:tname/:location/:doctorName',async(req,res)=>{
  try{
    const {tname,location,doctorName} = req.params
    const result = await bookAppointmentModel.findOne({name:tname, location:location, doctorName:doctorName});
    if(result.length>0){
      res.send(result)

    }else{
      res.send(`no record found`)
    }
  }
  catch(err){
    console.log(err);   
  }
})

bookAppointmentRouting.get('/bookappointment/:bid', async (req, res) => {
  try {
    const bid = req.params.bid;
    const result = await bookAppointmentModel.findOne({_id:bid});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});


bookAppointmentRouting.delete('/bookappointment/:bid' , async(req,res)=>{
 try{
  const bid = req.params.bid;
  const result = await bookAppointmentModel.deleteOne({_id:bid})
  res.send(result)
 }catch(err){
  console.log(err); 
 }
})

bookAppointmentRouting.put(`/bookappointment/:bid`,async (req,res)=>{
    try{
       const bid = req.params.bid;
       const result =  await bookAppointmentModel.updateOne({_id:bid},{$set:req.body})
       res.send(result);
     }catch(err){
      res.send(err)
     }
})



module.exports = bookAppointmentRouting;