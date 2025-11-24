

const mongoose = require("mongoose");

const connectionUrl ="mongodb+srv://ashifsirajkhan_db_user:o0EGEJaXEstlOluH@careconnect.luz2xsk.mongodb.net/?appName=careconnect"

mongoose.connect(connectionUrl)
.then((res)=>{
  console.log("database connected"); 
})
.catch((err)=>{
  console.log(err);
})