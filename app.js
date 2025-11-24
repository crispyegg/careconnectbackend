

const express = require("express");

const treatmentRouting = require("./router/treatmentRouting.js");
const locationRouting = require("./router/locationRouting.js")
const registerAdminRouter = require("./router/registerAdminRouting.js");
const bookAppointmentRouting = require("./router/bookAppointmentRouting.js");
const bookTreatmentRouting = require("./router/booktreatmentRouting.js");


const addDoctorsRouting= require("./router/addDoctorsRouting.js");
const blogRouting = require("./router/blogsRouting.js");




require("./dbconfig/dbconfig.js")
const app = express();
const portNumber = 7000;

const cors = require("cors");
const contactusRouting = require("./router/contactusRouting.js");
const quickAppointRouting = require("./router/quickAppointRouting.js");
const associatehospitalRouting = require("./router/assoctiatehospitalRouting.js");
const offersRouting = require("./router/offersRouting.js");

app.use(express.json());
app.use(cors());

app.use(express.static("public"))


app.use("/",treatmentRouting)
app.use('/',locationRouting)
app.use('/',registerAdminRouter)
app.use('/',bookAppointmentRouting)
app.use('/',bookTreatmentRouting)

app.use('/',addDoctorsRouting)
app.use('/',blogRouting)
app.use('/',contactusRouting)
app.use('/', quickAppointRouting)


app.use('/',associatehospitalRouting)
app.use('/', offersRouting)


app.listen(portNumber,()=>{
  console.log(`server is started on port number ${portNumber} `);
});


