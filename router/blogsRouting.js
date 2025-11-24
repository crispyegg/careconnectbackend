

const express = require('express')

const blogModel = require('../model/blogs')

const blogRouting = express.Router();




blogRouting.post('/blogs',async(req,res)=>{
  try{
    const blogData = new blogModel(req.body)
    const result = await blogData.save()
    res.send(result)
  }catch(err){
    console.log(err);  
  }
})

blogRouting.get('/blogs',async(req,res)=>{
  try{
    const result = await blogModel.find()
    res.send(result)
  }catch(err){
    console.log(err);  
  }
})

blogRouting.delete(`/blogs/:bid`,async(req,res)=>{
  try{
    const bid = req.params.bid;
    const result = await blogModel.deleteOne({_id:bid})
    res.send(result)
  }catch(err){
   res.send('Unable to deleted data')
  }
})

module.exports = blogRouting;